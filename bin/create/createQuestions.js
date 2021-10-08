import inquirer from 'inquirer';

export const CliOutputFileList = {
  performance: {
    name: '前端性能小册',
    outputFileName: 'performance.md',
  },
  less: {
    name: '常用Less封装',
    outputFileName: 'theme.less',
  },
};

/**
 * 返回要生成的文件
 */
export default function createInquire() {
  function createSelectedFiles() {
    return {
      type: 'checkbox',
      message: '请选择要生成的文件',
      name: 'selectedFiles',
      choices: [
        { name: CliOutputFileList.performance.name },
        { name: CliOutputFileList.less.name },
      ],
    };
  }

  return inquirer.prompt([createSelectedFiles()]);
}
