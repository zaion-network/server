import { SimpleServer, sendFileResponse } from "..";
import { HandlerFactory } from "./HandlerFactory";

export const handleDefault = new HandlerFactory((k, v, p) => ({
  key: k.CONTENT_TYPE,
  value: v.TEXT_HTML,
  path: p.index,
})).handler;

export const handleAssetsDefault = (
  contentType: SimpleServer.Header.ContentTypeValues,
  path: string
) =>
  sendFileResponse(
    SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
    contentType,
    `.${path}`
  );
