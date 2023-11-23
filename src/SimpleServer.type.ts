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
export namespace SimpleServer {
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
}

export interface handler {
  (request: Request): Promise<Response>;
}

export interface cb {
  (req: Request): Promise<string | null>;
}
