#!/usr/bin/env bun
import { logger } from "./utils/logger";
import { Header as H, cb, handler } from "./SimpleServer.type";
import { handler as h } from "./utils/handler";
import { getFileString as gfs } from ".";

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
    cb: cb,
    handler: handler = SimpleServer.handler(cb)
  ) {
    const options = { port, fetch: handler };
    this.#server = Bun.serve(options);
    logger(`Server is listening on port: `, this.#server.port);
  }
  get server() {
    return this.#server;
  }
}
export namespace SimpleServer {
  export const handler = h;
  export import getFileString = gfs;
  export import Header = H;
}
