// export const getFileString = async (path: string) => {
//   console.log("getting file string");
//   return await Bun.file(path).text();
// };

import { readFileSync } from "fs";

export const getFileString = (path: string) => {
  console.log(`scope: ${getFileString.name}, getting: ${path}`);
  return readFileSync(path, { encoding: "utf8" });
};
