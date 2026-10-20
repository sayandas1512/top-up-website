// MapLibre's web worker does not survive the Next bundler ("Worker failed to load"), so we serve MapLibre's own
// worker file from /public and point MapLibre at it (see MapView.tsx). Runs before dev and build, so the copy
// always matches the installed maplibre-gl version. The copy is git-ignored.
import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("public", { recursive: true });
copyFileSync("node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs", "public/maplibre-gl-worker.mjs");
console.log("Copied maplibre-gl-worker.mjs to public/");
