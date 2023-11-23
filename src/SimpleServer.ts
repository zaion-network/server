#!/usr/bin/env bun
import { logger } from "./utils/logger";
import { Header as H } from "./SimpleServer.type";
import { handler as h } from "./utils/handler";

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
  export const handler = h;
  export import Header = H;
}
