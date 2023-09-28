export const getFileString = async (path: string) => {
  console.log("getting file string");
  return await Bun.file(path).text();
};
