import { Conditioner } from "@zaionstate/zaionbase";
import { SimpleServer } from "../SimpleServer.type";
import { handleCss } from "./handleCss";
import { handleJs } from "./handleJs";
import { handleManifest } from "./handleManifest";
import { handleAssets } from "./handleAssets";
import { handleDefault } from "./handleDefault";
import { logger } from "./logger";

const conditioner = new Conditioner();
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
      return conditioner.elseIf("", paths, [handleDefault, []]);
    } catch (error: any) {
      logger("got an error handling messages", error);
      throw new Error(error.message);
    }
  };
