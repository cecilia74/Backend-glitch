import path from "path";
import { fileURLToPath } from "url";
export const _filename = fileURLToPath(import.meta.url);
export const _dirname = path.dirname(_filename);