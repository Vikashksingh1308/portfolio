import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#10b981",
            marginBottom: 16,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Dublin, Ireland
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: "#f5f5f5",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Vikash Kumar Singh
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#10b981",
            marginBottom: 12,
          }}
        >
          Software Engineer · Platform &amp; Full-Stack
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#a3a3a3",
            maxWidth: 640,
          }}
        >
          6+ years · 150+ partner integrations · Java · React · Spring Boot
        </div>
      </div>
    ),
    { ...size }
  );
}
