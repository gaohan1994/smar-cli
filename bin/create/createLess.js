import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';
import { getRootPath } from '../paths.js';
import { CliOutputFileList } from './createQuestions.js';

/**
 * 生成 markdown 文件并返回 string 形式
 */
const createContent = function createLessContent() {
  const _dirname = fileURLToPath(import.meta.url);
  const contentPath = path.resolve(_dirname, '../../template/theme.less');

  const content = fs.readFileSync(contentPath);
  return prettier.format(content.toString(), { parser: 'less' });
};

function createLess() {
  console.log(chalk.blue(`正在生成${CliOutputFileList.less.name}`));
  /**
   * 要生成的 markdown 文件内容
   */
  const content = createContent();
  /**
   * 在当前目录下生成 markdown 文件
   */
  fs.writeFileSync(
    `${getRootPath()}/${CliOutputFileList.less.outputFileName}`,
    content
  );
  console.log(chalk.blue(`${CliOutputFileList.less.name}已生成`));

  return true;
}

export default createLess;
