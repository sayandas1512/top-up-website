import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const DROP = "M50 4C50 4 10 52 10 82a40 40 0 0 0 80 0C90 52 50 4 50 4Z";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F6F0E4" }}>
        <svg width="104" height="129" viewBox="0 0 100 124">
          <path d={DROP} fill="#3FBFEF" stroke="#0B2545" strokeWidth="6" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
