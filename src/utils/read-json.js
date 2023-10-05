import { createRequire } from "node:module";

export const readJSON = createRequire(import.meta.url);
