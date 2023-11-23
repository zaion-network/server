import { HandlerFactory } from "./HandlerFactory";

export const handleManifest = new HandlerFactory((keys, values, paths) => ({
  key: keys.CONTENT_TYPE,
  value: values.APPLICATION_JSON,
  path: paths.manifest,
})).handler;
