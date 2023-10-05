#!/usr/bin/env bun

import { frontMatterInMdToJSObject } from "./frontMatterInMdToJSObject";

const response = await frontMatterInMdToJSObject(
  `---\nmy: yaml\n---\n# Ciao\nmondo`
);
console.log(JSON.parse(response));
