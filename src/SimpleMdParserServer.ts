import { frontMatterInMdToJSObject } from "./utils/frontMatterInMdToJSObject";

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
        console.log(json);
        const response = {
          data: json.data.frontmatter,
          html: json.value,
        };
        return new Response(JSON.stringify(response));
      },

      port: process.env.PORT || 8085,
    });
    console.log(`listening on port: ${this.#server.port}`);
  }
}
