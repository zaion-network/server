export const getFileString = async (path: string) => {
  console.log("getting file string");
  try {
    const file = Bun.file(path);
    const text = await file.text();
    return text;
  } catch (error) {
    return `there was an error in getFileString`;
  }
};
