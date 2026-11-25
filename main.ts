import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "A toaster is a tiny sunbed for bread, browning both sides at once and popping the slice up when its tan is done.\n" +
  "The sunbed covers the heat that browns bread and the pop-up timer, but it leaves out that the heat comes from wires, not the sun, and that a real tan takes hours, not two minutes.";

const lines = TEXT.split("\n");
if (lines.length !== 2 || lines.some((line) => line.trim() === "")) {
  throw new Error("entry must be exactly two non-empty lines");
}
if ([...TEXT].length < 1 || [...TEXT].length > 400) {
  throw new Error("entry must be 1-400 Unicode code points");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");
if (readFileSync(outPath, "utf8") !== TEXT) {
  throw new Error("entry.txt does not match the entry text");
}
