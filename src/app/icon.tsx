import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#050510",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="14" viewBox="0 0 64 28">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D600FF" />
              <stop offset="100%" stopColor="#00D1FF" />
            </linearGradient>
          </defs>
          <path
            d="M2 18 C8 18 10 6 16 6 C22 6 24 22 30 22 C36 22 38 4 44 4 C50 4 52 16 62 16"
            fill="none"
            stroke="url(#g)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
