import { frontMatterInMdToJSObject } from "./utils/frontMatterInMdToJSObject";
import { logger } from "./utils/logger";

export class SimpleMdParserServer {
  #server;
  get server() {
    return this.#server;
  }
  constructor(port?: number) {
    this.#server = Bun.serve({
      async fetch(req) {
        const text = await req.text();
        const res = await frontMatterInMdToJSObject(text);
        const json = JSON.parse(res);
        logger(json);
        const response = {
          data: json.data.frontmatter,
          html: json.value,
        };
        return new Response(JSON.stringify(response));
      },

      port: process.env.PORT || 8085,
    });
    logger(`listening on port: ${this.#server.port}`);
  }
}
