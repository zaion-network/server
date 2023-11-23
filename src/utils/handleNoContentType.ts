import { logger } from "./logger";

export const handleNoContentType = () => {
  logger("undefined content type");
  throw new Error("This type of file is not yet suppored by the server.");
};
