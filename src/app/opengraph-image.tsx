import { ImageResponse } from "next/og";
import { copy } from "@/content/copy";

export const alt = "Top Up: every litre you refill is a bottle that never exists.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DROP = "M50 4C50 4 10 52 10 82a40 40 0 0 0 80 0C90 52 50 4 50 4Z";

// Fetched when the image is built. If it fails, the image still builds with the default font.
async function displayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700")).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const font = await displayFont();
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
          fontFamily: font ? "Bricolage" : "sans-serif",
        }}
      >
        <div style={{ position: "relative", display: "flex", width: 300, height: 372, flexShrink: 0 }}>
          <svg width="300" height="372" viewBox="0 0 100 124">
            <path d={DROP} fill="#3FBFEF" stroke="#0B2545" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <div style={{ position: "absolute", left: 0, right: 0, top: 238, display: "flex", justifyContent: "center", fontSize: 56, fontWeight: 700 }}>top up</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 70 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{copy.hero.h1}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, opacity: 0.8 }}>Refill drinking water across India</div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Bricolage", data: font, weight: 700, style: "normal" }] : undefined },
  );
}
