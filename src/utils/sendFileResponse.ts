import { SimpleServer, getFileString } from "..";

const defaultHtml = `
<h1>SimpleServer</h1>
<div id="pis"><p>this is a</p> <p class="red">default</p> <p>html</p></div>
<div id="pis"><p>to get started simply add an</p> <pre>index.html</pre> <p>and an</p> <pre>assets/style.css</pre> <p>file in your repo</p></div>
<script type='module' src='./dist/index.js' ></script>
<link rel='stylesheet' href='/assets/style.css' />
`;
const defaultHtmlSafe = `
<h1>SimpleServer</h1>
<div id="pis"><p>this is a</p> <p class="red">default</p> <p>html</p></div>
<div id="pis"><p>to get started simply add an</p> <pre>index.html</pre> <p>and an</p> <pre>assets/style.css</pre> <p>file in your repo</p></div>
`;

const defaultJs = `console.log("Hello world, this is a default js files loaded with SimpleServer")`;

const defaultCss = `
.red { color: red;}
#pis { display:flex; }
#pis p, #pis pre { 
  margin: 0; 
  margin-right: 4px; 
}
#pis pre { 
  position:relative; 
  top: 2px; 
  background-color: grey; 
  color:white; 
}`;

export const sendFileResponse = async (
  key: SimpleServer.Header.HeaderKeys,
  type: SimpleServer.Header.ContentTypeValues,
  path: string,
  fallback: (headers: Headers) => Promise<Response> = async headers => {
    const { TEXT_JAVASCRIPT, TEXT_HTML, TEXT_CSS } =
      SimpleServer.Header.ContentTypeValues;
    if (type === TEXT_HTML) {
      console.log("sending and html");
      return new Response(defaultHtmlSafe);
    } else if (type === TEXT_JAVASCRIPT) {
      console.log("sending an js");
      return new Response(defaultJs, { headers });
    } else if (type === TEXT_CSS) {
      console.log("sending a css");
      return new Response(defaultCss, { headers });
    }
    return new Response("oh mamma");
  }
) => {
  const headers = new Headers();
  headers.append(key, type);
  console.log("sending file response", path);

  // try {
  //   console.log("getting file string", path);
  //   const string = await getFileString(path);
  //   console.log("sending response", path);
  //   return new Response(string, { headers });
  // } catch (error) {
  //   console.log("handling ");
  //   return fallback(headers);
  // }
  return new Response("mamma mia,from sendFileResponse");
};
