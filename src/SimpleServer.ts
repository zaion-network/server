#!/usr/bin/env bun

import { logger } from "./utils/logger";
import { sendFileResponse } from "./utils/sendFileResponse";
import { Conditioner } from "@zaionstate/zaionbase";

const conditioner = new Conditioner();
const handleCss = (path: string) => {
  {
    logger("handling:", path);
    return sendFileResponse(
      SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
      SimpleServer.Header.ContentTypeValues.TEXT_CSS,
      SimpleServer.paths.css
    );
  }
};
const handleJs = (path: string) => {
  logger("handling:", path);
  return sendFileResponse(
    SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
    SimpleServer.Header.ContentTypeValues.TEXT_JAVASCRIPT,
    SimpleServer.paths.js
  );
};
const handleManifest = (path: string) => {
  logger("handling:", path);
  return sendFileResponse(
    SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
    SimpleServer.Header.ContentTypeValues.APPLICATION_JSON,
    SimpleServer.paths.manifest
  );
};
const handleDefault = () => {
  logger("fallback handling");
  return sendFileResponse(
    SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
    SimpleServer.Header.ContentTypeValues.TEXT_HTML,
    SimpleServer.paths.index
  );
};
const handleAssets = (path: string) => {
  logger("handling:", path);
  const extension = path.split(".").pop();
  const map = new Map();
  map.set("js", SimpleServer.Header.ContentTypeValues.TEXT_JAVASCRIPT);
  map.set("css", SimpleServer.Header.ContentTypeValues.TEXT_CSS);
  map.set("svg", SimpleServer.Header.ContentTypeValues.IMAGE_SVGXML);
  map.set("png", SimpleServer.Header.ContentTypeValues.IMAGE_PNG);
  map.set("ico", SimpleServer.Header.ContentTypeValues.IMAGE_XICON);
  map.set("ttf", SimpleServer.Header.ContentTypeValues.FONT_TTF);
  map.set("woff", SimpleServer.Header.ContentTypeValues.FONT_WOFF);
  const contentType = map.get(extension);
  if (!contentType) {
    logger("undefined content type");
    throw new Error("This type of file is not yet suppored by the server.");
  }
  if (
    contentType === SimpleServer.Header.ContentTypeValues.IMAGE_PNG ||
    contentType === SimpleServer.Header.ContentTypeValues.IMAGE_XICON ||
    contentType === SimpleServer.Header.ContentTypeValues.IMAGE_GIF ||
    contentType === SimpleServer.Header.ContentTypeValues.IMAGE_JPEG
  ) {
    logger("handling an image file type");
    const file = Bun.file(`.${path}`);
    return new Response(file);
  }
  return sendFileResponse(
    SimpleServer.Header.HeaderKeys.CONTENT_TYPE,
    contentType,
    `.${path}`
  );
};

/**
 * SimpleServer handles HTML, JS and CSS files located respectively:
 * - root/index.html
 * - root/dist/index.js
 * - root/assets/style.css
 *
 * it handles files requested from assets of this file type:
 * - js
 * - svg
 * - ico
 * - ttf
 * - woff
 */
export class SimpleServer {
  #server;
  constructor(
    port: number,
    cb: (req: Request) => Promise<string | null>,
    handler: (request: Request) => Promise<Response> = SimpleServer.handler(cb)
  ) {
    this.#server = Bun.serve({
      port,
      fetch: handler,
    });
    logger(`Server is listening on port: `, this.#server.port);
  }
  get server() {
    return this.#server;
  }
}
export namespace SimpleServer {
  const headers = {};
  export enum paths {
    css = "./assets/style.css",
    js = "./dist/index.js",
    index = "./index.html",
    manifest = "./manifest.json",
  }
  export enum pathnames {
    css = "/assets/style.css",
    js = "/dist/index.js",
    manifest = "/manifest.json",
  }
  export const handler =
    (cb: (req: Request) => Promise<string | null>) => async (req: Request) => {
      const url = new URL(req.url);
      const path = url.pathname;
      try {
        let cbreturn: any = undefined;
        if (cb) cbreturn = await cb(req);
        type c = Conditioner.condition;
        const paths: Conditioner.condition[] = [
          [cbreturn !== null, () => new Response(`${cbreturn}`), []],
          [path === SimpleServer.pathnames.css, handleCss, [path]],
          [path === SimpleServer.pathnames.js, handleJs, [path]],
          [path === SimpleServer.pathnames.manifest, handleManifest, [path]],
          [path.includes("/assets/"), handleAssets, [path]],
        ];
        return conditioner.elseIf("", paths, [() => handleDefault(), []]);
      } catch (error: any) {
        logger("got an error handling messages", error);
        throw new Error(error.message);
      }
    };
  export namespace Header {
    export enum HeaderKeys {
      ACCEPT = "Accept",
      ACCEPT_CHARSET = "Accept-Charset",
      ACCEPT_ENCODING = "Accept-Encoding",
      AUTHORIZATION = "Authorization",
      CACHE_CONTROL = "Cache-Control",
      CONTENT_LENGTH = "Content-Length",
      CONTENT_TYPE = "Content-Type",
      COOKIE = "Cookie",
      DATE = "Date",
      HOST = "Host",
      IF_MODIFIED_SINCE = "If-Modified-Since",
      IF_NONE_MATCH = "If-None-Match",
      IFRAME_OPTIONS = "Iframe-Options",
      KEEP_ALIVE = "Keep-Alive",
      ORIGIN = "Origin",
      PROXY_AUTHORIZATION = "Proxy-Authorization",
      REFERER = "Referer",
      USER_AGENT = "User-Agent",
    }
    export enum ContentTypeValues {
      TEXT_HTML = "text/html",
      TEXT_PLAIN = "text/plain",
      TEXT_CSS = "text/css",
      TEXT_JAVASCRIPT = "text/javascript",
      APPLICATION_JSON = "application/json",
      APPLICATION_XML = "application/xml",
      APPLICATION_ZIP = "application/zip",
      APPLICATION_PDF = "application/pdf",
      APPLICATION_SQL = "application/sql",
      APPLICATION_GRAPHQL = "application/graphql",
      APPLICATION_LD_JSON = "application/ld+json",
      APPLICATION_MSWORD = "application/msword",
      APPLICATION_VND_MS_EXCEL = "application/vnd.ms-excel",
      APPLICATION_VND_MS_POWERPOINT = "application/vnd.ms-powerpoint",
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      IMAGE_PNG = "image/png",
      IMAGE_JPEG = "image/jpeg",
      IMAGE_GIF = "image/gif",
      IMAGE_SVGXML = "image/svg+xml",
      IMAGE_XICON = "image/x-icon",
      FONT_TTF = "font/ttf",
      FONT_WOFF = "font/woff",
    }
  }
}
