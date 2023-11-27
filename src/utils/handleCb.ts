export const handleCb = (
  response: string | { response: string; headers: Headers }
) => {
  if (typeof response === "string") return new Response(`${response}`);
  else return new Response(response.response, { headers: response.headers });
};
