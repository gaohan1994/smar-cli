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
const createContent = function createMarkdownContent() {
  const _dirname = fileURLToPath(import.meta.url);
  const markdownPath = path.resolve(_dirname, '../../template/performance.md');

  const templeteMarkdown = fs.readFileSync(markdownPath);
  return prettier.format(templeteMarkdown.toString(), { parser: 'markdown' });
};

function createMarkdown() {
  console.log(chalk.blue(`正在生成${CliOutputFileList.performance.name}`));
  /**
   * 要生成的 markdown 文件内容
   */
  const markdownContent = createContent();
  /**
   * 在当前目录下生成 markdown 文件
   */
  fs.writeFileSync(
    `${getRootPath()}/${CliOutputFileList.performance.outputFileName}`,
    markdownContent
  );
  console.log(chalk.blue(`${CliOutputFileList.performance.name}已生成`));
  return true;
}

export default createMarkdown;
