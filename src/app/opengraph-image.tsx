import { ImageResponse } from "next/og";

export const alt = "TOCHU CITY — A living portfolio by Shosuke Sato";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(160deg, #d6f2fb 0%, #f4fbfc 52%, #b8e5ef 100%)",
          color: "#123653",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="og-water" x1="0" x2="1">
              <stop offset="0" stopColor="#42b7d5" />
              <stop offset="1" stopColor="#7bd8e8" />
            </linearGradient>
          </defs>
          <path d="M450 54L1120 390 675 614 5 278Z" fill="#e8f0f1" stroke="#9ebbc6" strokeWidth="2" />
          <path d="M690 455L1120 390 675 614 430 492Z" fill="url(#og-water)" />
          <path d="M284 220L796 476M426 149L938 405" stroke="#a7bac4" strokeWidth="58" />
          <path d="M284 220L796 476M426 149L938 405" stroke="#ffffff" strokeWidth="3" strokeDasharray="22 18" />

          <g transform="translate(708 337)">
            <ellipse cx="8" cy="70" rx="112" ry="29" fill="#37728e" opacity=".2" />
            <path d="M-76-10L0-48 76-10 0 29Z" fill="#ffffff" />
            <path d="M-76-10L0 29V118L-76 79Z" fill="#f17869" />
            <path d="M76-10L0 29V118L76 79Z" fill="#ff9b82" />
            <path d="M-32-54L0-70 32-54 0-38Z" fill="#ffdc67" />
            <path d="M-32-54L0-38V81L-32 65Z" fill="#df685f" />
            <path d="M32-54L0-38V81L32 65Z" fill="#f08070" />
            <path d="M10-15L27-24V50L10 58Z" fill="#bdf7f4" />
          </g>

          <g transform="translate(900 205)">
            <ellipse cx="5" cy="55" rx="70" ry="20" fill="#37728e" opacity=".18" />
            <path d="M-42-112L0-133 42-112 0-91Z" fill="#e4fffb" />
            <path d="M-42-112L0-91V65L-42 44Z" fill="#70c3d0" />
            <path d="M42-112L0-91V65L42 44Z" fill="#42a9bd" />
            <path d="M8-73L34-86V-61L8-48ZM8-28L34-41V-16L8-3ZM8 17L34 4V29L8 42Z" fill="#e8ffff" opacity=".85" />
          </g>

          <g transform="translate(520 270)">
            <ellipse cx="5" cy="38" rx="80" ry="22" fill="#37728e" opacity=".18" />
            <path d="M-58-33L0-62 58-33 0-4Z" fill="#41d4d5" />
            <path d="M-58-33L0-4V70L-58 41Z" fill="#377cb7" />
            <path d="M58-33L0-4V70L58 41Z" fill="#22689f" />
            <path d="M11 2L48-16V24L11 42Z" fill="#9cf2ec" />
            <path d="M0-63V-108" stroke="#236397" strokeWidth="4" />
            <circle cx="0" cy="-112" r="7" fill="#ff6b5f" />
          </g>
        </svg>

        <div style={{ position: "absolute", left: 70, top: 66, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 6, color: "#0d84aa" }}>A LIVING PORTFOLIO</div>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 0.92, fontWeight: 800, letterSpacing: -5 }}>
            <span>TOCHU</span>
            <span>CITY</span>
          </div>
          <div style={{ marginTop: 25, fontSize: 22, fontWeight: 600, letterSpacing: 1.5, color: "#4e7388" }}>THE CITY GROWS WHEN I CREATE.</div>
        </div>
        <div style={{ position: "absolute", left: 72, bottom: 48, display: "flex", gap: 14, alignItems: "center", fontSize: 14, fontWeight: 700, letterSpacing: 3, color: "#55798d" }}>
          <span style={{ width: 30, height: 3, background: "#ff6b5f" }} />
          SHOSUKE SATO · 2026
        </div>
      </div>
    ),
    size,
  );
}
