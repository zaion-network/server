import { Conditioner } from "@zaionstate/zaionbase";
import { Header } from "../SimpleServer.type";
import { logger } from "./logger";
import { handleNoContentType } from "./handleNoContentType";
import { handleImage } from "./handleImage";
import { handleAssetsDefault } from "./handleDefault";

const conditioner = new Conditioner();
export const handleAssets = (path: string) => {
  logger("handling:", path);
  const extension = path.split(".").pop();
  const map = new Map();
  map.set("js", Header.ContentTypeValues.TEXT_JAVASCRIPT);
  map.set("css", Header.ContentTypeValues.TEXT_CSS);
  map.set("svg", Header.ContentTypeValues.IMAGE_SVGXML);
  map.set("png", Header.ContentTypeValues.IMAGE_PNG);
  map.set("ico", Header.ContentTypeValues.IMAGE_XICON);
  map.set("ttf", Header.ContentTypeValues.FONT_TTF);
  map.set("woff", Header.ContentTypeValues.FONT_WOFF);
  const contentType = map.get(extension);
  const isImagyFile =
    contentType === Header.ContentTypeValues.IMAGE_PNG ||
    contentType === Header.ContentTypeValues.IMAGE_XICON ||
    contentType === Header.ContentTypeValues.IMAGE_GIF ||
    contentType === Header.ContentTypeValues.IMAGE_JPEG;

  const arr: Conditioner.condition[] = [
    [!contentType, handleNoContentType, []],
    [isImagyFile, handleImage, [path]],
  ];
  return conditioner.elseIf("", arr, [handleAssetsDefault, []]);
};
