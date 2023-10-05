import { SimpleMdParserServer } from "./SimpleMdParserServer";

const server = new SimpleMdParserServer(8085);

const file = Bun.file("./sotto.md");
const text = await file.text();
const res = await fetch("localhost:8085", {
  method: "POST", // o 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
  body: text, // converti l'oggetto dati in una stringa JSON
});
const test = await res.text();
console.log(JSON.parse(test));
server.server.stop();
