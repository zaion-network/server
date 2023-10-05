#!/usr/bin/env bun

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSanitize from "rehype-sanitize";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import { visit } from "unist-util-visit";

export const frontMatterInMdToJSObject = async (md: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkParseFrontmatter)
    .use(remarkGfm)
    // @ts-expect-error
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify);
  const file = processor.processSync(md);
  return JSON.stringify(file);
};
