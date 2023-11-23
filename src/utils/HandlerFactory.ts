import { sendFileResponse } from "../utils/sendFileResponse";
import { Header, SimpleServer } from "../SimpleServer.type";
import { logger } from "./logger";

export class HandlerFactory {
  handler: (path: string) => Promise<Response>;
  constructor(
    cb: (
      keys: typeof Header.HeaderKeys,
      values: typeof Header.ContentTypeValues,
      paths: typeof SimpleServer.paths
    ) => {
      key: Header.HeaderKeys;
      value: Header.ContentTypeValues;
      path: SimpleServer.paths;
    }
  ) {
    const {
      key,
      value,
      path: p,
    } = cb(Header.HeaderKeys, Header.ContentTypeValues, SimpleServer.paths);
    this.handler = (path: string) => {
      {
        logger("handling:", path);
        return sendFileResponse(key, value, p);
      }
    };
  }
}
