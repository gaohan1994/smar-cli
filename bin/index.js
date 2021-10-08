import createMarkdown from './create/createMarkdown.js';
import createInquire, { CliOutputFileList } from './create/createQuestions.js';
import createLess from './create/createLess.js';

function checkSelected(selectedFiles, targetFileName) {
  return selectedFiles.some((sf) => sf === targetFileName);
}

(async function () {
  const { selectedFiles } = await createInquire();

  /**
   * 如果需要生成前端性能手册 则生成前端性能手册
   */
  const hasPerformanceMarkdown = checkSelected(
    selectedFiles,
    CliOutputFileList.performance.name
  );

  if (hasPerformanceMarkdown) {
    createMarkdown();
  }

  /**
   * 如果需要生成less文件则生成less文件
   */
  const hasLess = checkSelected(selectedFiles, CliOutputFileList.less.name);

  if (hasLess) {
    createLess();
  }
})();
