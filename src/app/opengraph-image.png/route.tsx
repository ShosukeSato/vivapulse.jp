import { ImageResponse } from "next/og";

const imageSize = { width: 1200, height: 630 };

export const dynamic = "force-static";

function PlanLabel({ left, top, code, name }: { left: number; top: number; code: string; name: string }) {
  return (
    <div style={{ position: "absolute", left, top, width: 168, height: 46, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 11, border: "2px solid #153f52", background: "#f8f5ec" }}>
      <span style={{ color: "#e85e52", fontSize: 8, fontWeight: 700, letterSpacing: 1.5 }}>{code}</span>
      <span style={{ marginTop: 3, color: "#153f52", fontSize: 11, fontWeight: 700 }}>{name}</span>
      <span style={{ position: "absolute", right: 10, top: 12, color: "#153f52", fontSize: 20 }}>→</span>
    </div>
  );
}

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f4f1e8",
          color: "#153f52",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", left: 48, top: 42, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center", background: "#153f52", color: "#fff", fontSize: 17, fontWeight: 800 }}>01</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: 4 }}>CITY 01</span>
            <span style={{ color: "#62777c", fontSize: 8, fontWeight: 700, letterSpacing: 2.5 }}>A LIVING CITY BY SHOSUKE SATO</span>
          </div>
        </div>

        <div style={{ position: "absolute", left: 52, top: 166, width: 420, display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#e85e52", fontSize: 11, fontWeight: 800, letterSpacing: 3 }}>IDEAS BECOME PLACES</span>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", fontSize: 58, lineHeight: .92, fontWeight: 800, letterSpacing: -4 }}>
            <span>A LIVING</span>
            <span>EDITORIAL</span>
            <span>ATLAS.</span>
          </div>
          <span style={{ marginTop: 28, width: 360, color: "#536c73", fontSize: 17, lineHeight: 1.6, fontWeight: 600 }}>つくったものが、街になっていく。</span>
        </div>

        <div style={{ position: "absolute", right: 30, top: 40, width: 660, height: 550, display: "flex" }}>
        <svg width="660" height="550" viewBox="0 0 660 550" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="og-plan-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="#466d7d" strokeWidth=".65" opacity=".16" />
            </pattern>
            <pattern id="og-water-lines" width="42" height="16" patternUnits="userSpaceOnUse">
              <path d="M0 8h24m6 0h12" stroke="#d7f1ee" strokeWidth="2" opacity=".58" />
            </pattern>
          </defs>
          <rect x="1" y="1" width="658" height="548" fill="#e9ede6" stroke="#153f52" strokeWidth="2" />
          <rect x="1" y="1" width="658" height="548" fill="url(#og-plan-grid)" />
          <rect x="28" y="42" width="295" height="185" fill="#e8dfcb" stroke="#153f52" />
          <rect x="28" y="246" width="295" height="152" fill="#dde9df" stroke="#153f52" />
          <rect x="342" y="42" width="288" height="356" fill="#e1e2d8" stroke="#153f52" />
          <rect x="28" y="417" width="394" height="103" fill="#eee5d6" stroke="#153f52" />
          <path d="M422 382c84-13 146-8 238-47v214H365c36-48 38-105 57-167Z" fill="#6dbcc2" />
          <path d="M422 382c84-13 146-8 238-47v214H365c36-48 38-105 57-167Z" fill="url(#og-water-lines)" />
          <path d="M323 20v500M342 20v500" stroke="#5c7074" strokeWidth="4" />
          {Array.from({ length: 10 }, (_, index) => <path key={index} d={`M314 ${47 + index * 48}h38`} stroke="#5c7074" strokeWidth="2" />)}
          <path d="M20 236h620M20 408h420M470 20v370" stroke="#f8f5ec" strokeWidth="28" />
          <path d="M20 236h620M20 408h420M470 20v370" stroke="#87989a" strokeWidth="2" strokeDasharray="10 11" />

          <g transform="translate(112 170)">
            <rect x="-38" y="-54" width="76" height="54" fill="#236cb1" stroke="#153f52" strokeWidth="2" />
            <polygon points="-38,-54 -28,-62 48,-62 38,-54" fill="#6fd0d4" stroke="#153f52" strokeWidth="2" />
            <rect x="-24" y="-44" width="48" height="30" fill="#16334f" />
            <path d="m-5-39 14 9-14 9Z" fill="#6fd0d4" />
          </g>

          <g transform="translate(414 186)">
            <rect x="-48" y="-40" width="96" height="40" fill="#087f9b" stroke="#153f52" strokeWidth="2" />
            <path d="M-38-40Q0-82 38-40Z" fill="#d9f2ef" stroke="#153f52" strokeWidth="2" />
            <rect x="-20" y="-26" width="40" height="16" fill="#f4f0dd" stroke="#153f52" />
          </g>

          <g transform="translate(174 486)">
            <rect x="-42" y="-58" width="84" height="58" fill="#d9473f" stroke="#153f52" strokeWidth="2" />
            <rect x="-30" y="-48" width="60" height="28" fill="#25202b" />
            <path d="m-5-43 14 9-14 9Z" fill="#f8f5ec" />
          </g>

          <g transform="translate(506 458)">
            <path d="M-34 0v-60h48M-34-60v61M12-58v23" fill="none" stroke="#157f9a" strokeWidth="6" />
            <path d="m-15-5 47-12 18 8-48 14Z" fill="#f8f5ec" stroke="#153f52" strokeWidth="2" />
            <path d="M4-16v-25l25 20Z" fill="#f1cc69" stroke="#153f52" />
          </g>
        </svg>
        <span style={{ position: "absolute", left: 44, top: 47, color: "#153f52", fontSize: 10, fontWeight: 700, letterSpacing: 2 }}><b style={{ color: "#e85e52" }}>01</b> NORTH YARD</span>
        <span style={{ position: "absolute", left: 44, top: 251, color: "#153f52", fontSize: 10, fontWeight: 700, letterSpacing: 2 }}><b style={{ color: "#e85e52" }}>02</b> MAKERS QUAY</span>
        <span style={{ position: "absolute", left: 360, top: 47, color: "#153f52", fontSize: 10, fontWeight: 700, letterSpacing: 2 }}><b style={{ color: "#e85e52" }}>03</b> CENTRAL</span>
        <span style={{ position: "absolute", left: 44, top: 422, color: "#153f52", fontSize: 10, fontWeight: 700, letterSpacing: 2 }}><b style={{ color: "#e85e52" }}>04</b> CULTURE</span>
        <PlanLabel left={50} top={178} code="M-01" name="TRIPVLOG" />
        <PlanLabel left={346} top={194} code="C-01" name="CITY 01 CENTRAL" />
        <PlanLabel left={92} top={492} code="P-01" name="VOYAGE CINEMA" />
        <PlanLabel left={448} top={468} code="W-01" name="ROUTE TERMINAL" />
        </div>

        <div style={{ position: "absolute", left: 52, bottom: 34, display: "flex", alignItems: "center", gap: 12, color: "#536c73", fontSize: 9, fontWeight: 800, letterSpacing: 2 }}>
          <span style={{ width: 34, height: 2, background: "#e85e52" }} />
          CITY PLAN 01 / VIVAPULSE.JP
        </div>
      </div>
    ),
    imageSize,
  );
}
