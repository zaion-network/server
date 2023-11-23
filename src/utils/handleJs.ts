import { HandlerFactory } from "./HandlerFactory";

export const handleJs = new HandlerFactory((k, v, p) => ({
  key: k.CONTENT_TYPE,
  value: v.TEXT_JAVASCRIPT,
  path: p.js,
})).handler;
