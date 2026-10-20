import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { copy } from "@/content/copy";

export const alt = "Top Up: every litre you refill is a bottle that never exists.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DROP = "M50 4C50 4 10 52 10 82a40 40 0 0 0 80 0C90 52 50 4 50 4Z";

// Bundled in the repo (SIL Open Font License, see src/assets/fonts/OFL.txt), so the image builds offline.
// "use cache" lets the route stay static even though it reads a file; base64 is used because it serialises.
async function displayFont(): Promise<string> {
  "use cache";
  return (await readFile(join(process.cwd(), "src/assets/fonts/BricolageGrotesque-Bold.ttf"))).toString("base64");
}

export default async function OpenGraphImage() {
  const font = Buffer.from(await displayFont(), "base64");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 90px",
          background: "#F6F0E4",
          color: "#0B2545",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ position: "relative", display: "flex", width: 300, height: 372, flexShrink: 0 }}>
          <svg width="300" height="372" viewBox="0 0 100 124">
            <path d={DROP} fill="#3FBFEF" stroke="#0B2545" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <div style={{ position: "absolute", left: 0, right: 0, top: 238, display: "flex", justifyContent: "center", fontSize: 56, fontWeight: 700 }}>top up</div>
        </div>
        {/* 1200 wide, minus 90 padding each side, the 300 drop and a 70 gap, leaves 650 for the text. */}
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 70, width: 650 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.08 }}>{copy.hero.h1}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, opacity: 0.8 }}>Refill drinking water across India</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: font, weight: 700, style: "normal" }] },
  );
}
