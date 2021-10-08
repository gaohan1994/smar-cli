import path from 'path';

export const getRootPath = () => path.resolve(process.cwd());

export const getResolvePath = (fileName) =>
  path.resolve(process.cwd(), fileName);
