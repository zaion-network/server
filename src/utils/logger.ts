#!/usr/bin/env bun

export const logger = (...messages: (number | string | object)[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...messages);
  } else {
  }
};
