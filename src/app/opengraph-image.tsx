import { ImageResponse } from "next/og";

export const alt = "Audiova — Convertisseur MP3";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050510",
          color: "#FFFFFF",
          padding: "72px",
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 10% 0%, rgba(214,0,255,0.35), transparent 60%), radial-gradient(ellipse 45% 35% at 95% 10%, rgba(0,209,255,0.25), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="28" viewBox="0 0 64 28">
            <defs>
              <linearGradient id="wave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D600FF" />
                <stop offset="100%" stopColor="#00D1FF" />
              </linearGradient>
            </defs>
            <path
              d="M2 18 C8 18 10 6 16 6 C22 6 24 22 30 22 C36 22 38 4 44 4 C50 4 52 16 62 16"
              fill="none"
              stroke="url(#wave)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
            <span>Audio</span>
            <span style={{ color: "#00D1FF" }}>va</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1, fontWeight: 600 }}>
          <div>Votre audio.</div>
          <div style={{ display: "flex", marginTop: 8 }}>
            En <span style={{ color: "#C84BFF", marginLeft: 16 }}>MP3</span>.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#9AA0B8" }}>Your audio. Your format. Your freedom.</div>
      </div>
    ),
    size,
  );
}
