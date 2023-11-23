import { logger } from "./logger";

export const handleImage = (path: string) => {
  logger("handling an image file type");
  const file = Bun.file(`.${path}`);
  return new Response(file);
};
