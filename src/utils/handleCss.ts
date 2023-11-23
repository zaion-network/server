import { HandlerFactory } from "./HandlerFactory";

export const handleCss = new HandlerFactory((keys, values, paths) => ({
  key: keys.CONTENT_TYPE,
  value: values.TEXT_CSS,
  path: paths.css,
})).handler;
