// export const getFileString = async (path: string) => {
//   console.log("getting file string");
//   return await Bun.file(path).text();
// };

import { readFileSync } from "fs";
import { logger } from "./logger";

export const getFileString: getFileString.getFileString = path => {
  logger(`scope: ${getFileString.name}, getting: ${path}`);
  return readFileSync(path, { encoding: "utf8" });
};
export namespace getFileString {
  export interface getFileString {
    (path: string): string;
  }
}
