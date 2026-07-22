import { ImageResponse } from "next/og";

const imageSize = { width: 1200, height: 630 };

export const dynamic = "force-static";

const P = {
  depth: "#081923",
  outline: "#102B3B",
  waterDeep: "#14536A",
  water: "#1F748A",
  waterLight: "#5CB3BF",
  sky: "#7FAEC3",
  haze: "#C5D9D8",
  stone: "#E5E1D4",
  stoneMid: "#B8BCB2",
  stoneShadow: "#7B8887",
  glassLight: "#ABD1D2",
  glass: "#6FA1AD",
  glassShadow: "#366B78",
  foliage: "#3F705A",
  light: "#F3C85E",
  lightCore: "#FFE5A3",
  coral: "#ED6A55",
  brick: "#A75543",
  asphalt: "#334A52",
} as const;

const waterfrontSvg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="630" viewBox="0 0 720 630" shape-rendering="crispEdges">
  <rect width="720" height="630" fill="#102B3B"/>

  <path d="M0 118h38V80h48v22h38V60h58v42h44V82h64v36h42V70h52v48h54V92h44v26h48V78h48v40h44V88h40v30h98V0H0Z" fill="#183846"/>
  <rect x="45" y="91" width="7" height="7" fill="#F3C85E"/><rect x="143" y="73" width="7" height="7" fill="#FFE5A3"/>
  <rect x="346" y="83" width="7" height="7" fill="#F3C85E"/><rect x="535" y="95" width="7" height="7" fill="#FFE5A3"/>

  <rect y="410" width="720" height="220" fill="#14536A"/>
  <rect y="472" width="720" height="158" fill="#1F748A"/>
  <path d="M0 122H720V370H670v45h-48v45h-48v45h-48v45H0Z" fill="#334A52"/>
  <path d="M0 370H622v65h-48v47H0Z" fill="#E5E1D4" stroke="#102B3B" stroke-width="3"/>
  <path d="M0 401h604M36 370v65m52-65v65m52-65v65m52-65v65m52-65v65m52-65v65m52-65v65m52-65v65m52-65v65m52-65v65m52-65v65" fill="none" stroke="#B8BCB2" stroke-width="2"/>
  <path d="M622 415h48v-45h50M574 460h48M526 505h48" fill="none" stroke="#FFE5A3" stroke-width="4"/>
  <path d="M615 491h60m16 0h22M583 530h68m18 0h35M28 550h76m22 0h47m68 0h88m24 0h40M450 574h72m24 0h98M104 603h66m20 0h116m94 0h58m24 0h96" fill="none" stroke="#5CB3BF" stroke-width="4"/>

  <rect x="20" y="142" width="150" height="124" fill="#294047" stroke="#7B8887" stroke-width="2"/>
  <rect x="194" y="142" width="158" height="124" fill="#294047" stroke="#7B8887" stroke-width="2"/>
  <rect x="378" y="142" width="154" height="124" fill="#294047" stroke="#7B8887" stroke-width="2"/>
  <rect x="558" y="142" width="140" height="124" fill="#294047" stroke="#7B8887" stroke-width="2"/>
  <rect x="20" y="294" width="188" height="60" fill="#294047" stroke="#7B8887" stroke-width="2"/>
  <rect x="232" y="294" width="282" height="60" fill="#294047" stroke="#7B8887" stroke-width="2"/>
  <rect x="538" y="294" width="160" height="60" fill="#294047" stroke="#7B8887" stroke-width="2"/>
  <path d="M182 122v244M0 280h720M526 122v244" fill="none" stroke="#53666A" stroke-width="5"/>
  <path d="M180 269h-18v22h18M528 269h18v22h-18" fill="none" stroke="#E5E1D4" stroke-width="4"/>

  <g>
    <rect x="37" y="181" width="120" height="62" fill="#081923" opacity=".35"/>
    <polygon points="34,177 140,177 158,195 52,195" fill="#F6F2EA" stroke="#102B3B" stroke-width="3"/>
    <polygon points="52,195 158,195 158,239 52,239" fill="#B8BCB2" stroke="#102B3B" stroke-width="3"/>
    <polygon points="140,177 158,195 158,239 140,221" fill="#7B8887" stroke="#102B3B" stroke-width="3"/>
    <rect x="63" y="203" width="24" height="25" fill="#366B78"/><rect x="98" y="203" width="24" height="25" fill="#ABD1D2"/>
    <rect x="132" y="203" width="14" height="36" fill="#FFE5A3"/>
  </g>

  <g>
    <rect x="216" y="179" width="123" height="63" fill="#081923" opacity=".35"/>
    <polygon points="209,172 326,172 345,191 228,191" fill="#7B8887" stroke="#102B3B" stroke-width="3"/>
    <polygon points="228,191 345,191 345,239 228,239" fill="#334A52" stroke="#102B3B" stroke-width="3"/>
    <polygon points="326,172 345,191 345,239 326,220" fill="#081923" stroke="#102B3B" stroke-width="3"/>
    <rect x="244" y="201" width="84" height="30" fill="#366B78"/><rect x="249" y="206" width="18" height="18" fill="#FFE5A3"/>
    <path d="m282 207 18 9-18 9Z" fill="#5CB3BF"/>
    <rect x="218" y="166" width="108" height="9" fill="#267FA3" stroke="#102B3B" stroke-width="2"/>
  </g>

  <g>
    <rect x="399" y="178" width="118" height="64" fill="#081923" opacity=".35"/>
    <polygon points="393,169 501,169 520,188 412,188" fill="#ABD1D2" stroke="#102B3B" stroke-width="3"/>
    <polygon points="412,188 520,188 520,239 412,239" fill="#4F8B70" stroke="#102B3B" stroke-width="3"/>
    <polygon points="501,169 520,188 520,239 501,220" fill="#366B78" stroke="#102B3B" stroke-width="3"/>
    <path d="M435 188v51M463 188v51M491 188v51M412 211h108" stroke="#102B3B" stroke-width="2"/>
    <rect x="451" y="214" width="28" height="25" fill="#FFE5A3"/>
  </g>

  <g>
    <rect x="574" y="181" width="110" height="62" fill="#081923" opacity=".35"/>
    <polygon points="566,171 665,171 684,190 585,190" fill="#E5E1D4" stroke="#102B3B" stroke-width="3"/>
    <polygon points="585,190 684,190 684,242 585,242" fill="#A75543" stroke="#102B3B" stroke-width="3"/>
    <polygon points="665,171 684,190 684,242 665,223" fill="#704438" stroke="#102B3B" stroke-width="3"/>
    <path d="M601 198v36M623 198v36M645 198v36M667 198v36" stroke="#FFE5A3" stroke-width="9"/>
    <path d="M601 198v36M623 198v36M645 198v36M667 198v36" stroke="#102B3B" stroke-width="2"/>
    <rect x="597" y="158" width="51" height="11" fill="#3F705A" stroke="#102B3B" stroke-width="2"/>
  </g>

  <g>
    <path d="M332 80v211M359 80v211" stroke="#E5E1D4" stroke-width="4"/>
    <path d="M329 92h34M329 116h34M329 140h34M329 164h34M329 188h34" stroke="#7B8887" stroke-width="4"/>
    <rect x="328" y="94" width="36" height="104" rx="7" fill="#E5E1D4" stroke="#102B3B" stroke-width="3"/>
    <rect x="335" y="105" width="22" height="23" fill="#366B78"/><rect x="335" y="136" width="22" height="23" fill="#366B78"/>
    <path d="M328 104l7-10h22l7 10Z" fill="#F3C85E"/><rect x="335" y="100" width="7" height="5" fill="#FFE5A3"/><rect x="350" y="100" width="7" height="5" fill="#FFE5A3"/>
  </g>

  <g>
    <rect x="263" y="294" width="252" height="58" fill="#081923" opacity=".35"/>
    <polygon points="247,274 471,274 492,295 268,295" fill="#6FA1AD" stroke="#102B3B" stroke-width="3"/>
    <polygon points="268,295 492,295 492,345 268,345" fill="#366B78" stroke="#102B3B" stroke-width="3"/>
    <polygon points="471,274 492,295 492,345 471,324" fill="#102B3B" stroke="#102B3B" stroke-width="3"/>
    <path d="M260 274l24-28h164l23 28Z" fill="#ABD1D2" stroke="#102B3B" stroke-width="3"/>
    <path d="M284 246v28M317 246v28M350 246v28M383 246v28M416 246v28M448 246v28" stroke="#366B78" stroke-width="3"/>
    <rect x="286" y="307" width="180" height="28" fill="#081923"/>
    <rect x="294" y="313" width="23" height="15" fill="#FFE5A3"/><rect x="325" y="313" width="31" height="15" fill="#6FA1AD"/>
    <rect x="364" y="313" width="31" height="15" fill="#6FA1AD"/><rect x="403" y="313" width="31" height="15" fill="#6FA1AD"/>
    <rect x="442" y="313" width="16" height="15" fill="#ED6A55"/>
    <rect x="340" y="279" width="9" height="7" fill="#F3C85E"/><rect x="354" y="279" width="9" height="7" fill="#F3C85E"/>
    <rect x="368" y="279" width="9" height="7" fill="#F3C85E"/><rect x="382" y="279" width="9" height="7" fill="#ED6A55"/>
  </g>

  <g>
    <polygon points="32,328 177,328 194,345 49,345" fill="#081923" stroke="#102B3B" stroke-width="3"/>
    <rect x="49" y="345" width="145" height="44" fill="#17141A" stroke="#102B3B" stroke-width="3"/>
    <rect x="62" y="332" width="102" height="24" fill="#ED6A55"/><rect x="72" y="338" width="82" height="6" fill="#FFE5A3"/>
    <rect x="139" y="354" width="25" height="35" fill="#FFE5A3" stroke="#102B3B" stroke-width="2"/>
  </g>

  <g>
    <path d="M555 325h82v8h-69v8h57v8h-45" fill="none" stroke="#7B8887" stroke-width="6"/>
    <rect x="643" y="304" width="22" height="50" fill="#081923" stroke="#102B3B" stroke-width="2"/>
    <path d="M648 313h12M648 323h12M648 333h12" stroke="#C5D9D8" stroke-width="3"/>
  </g>

  <g transform="translate(355 373)">
    <rect x="6" width="12" height="8" fill="#3B2924"/><rect x="4" y="8" width="16" height="12" fill="#FFE5A3"/>
    <rect x="3" y="20" width="18" height="17" fill="#ED6A55"/><rect y="22" width="5" height="14" fill="#E5E1D4"/><rect x="19" y="22" width="5" height="14" fill="#E5E1D4"/>
    <rect x="4" y="37" width="7" height="13" fill="#081923"/><rect x="14" y="37" width="7" height="13" fill="#081923"/>
  </g>
  <g fill="#F3C85E" stroke="#102B3B" stroke-width="2"><rect x="210" y="376" width="14" height="11"/><rect x="467" y="376" width="14" height="11"/></g>
  <path d="M216 386v31M473 386v31" stroke="#102B3B" stroke-width="5"/>

  <g>
    <path d="M536 492h104l25 18-18 23h-91l-29-20Z" fill="#E5E1D4" stroke="#102B3B" stroke-width="3"/>
    <path d="M555 478h65l18 14h-99Z" fill="#FFE5A3" stroke="#102B3B" stroke-width="3"/>
    <rect x="568" y="483" width="15" height="9" fill="#366B78"/><rect x="590" y="483" width="15" height="9" fill="#366B78"/><rect x="612" y="483" width="15" height="9" fill="#366B78"/>
    <path d="M556 514h92" stroke="#ED6A55" stroke-width="5"/>
  </g>
</svg>`;

const waterfrontUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(waterfrontSvg)}`;

function BrandMark() {
  return (
    <div style={{ position: "relative", display: "flex", width: 48, height: 48, border: `3px solid ${P.stone}` }}>
      <span style={{ position: "absolute", left: 7, top: 7, width: 11, height: 11, background: P.light }} />
      <span style={{ position: "absolute", right: 7, top: 7, width: 11, height: 11, background: P.light }} />
      <span style={{ position: "absolute", left: 7, bottom: 7, width: 11, height: 11, background: P.light }} />
      <span style={{ position: "absolute", right: 7, bottom: 7, width: 11, height: 11, background: P.coral }} />
    </div>
  );
}

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", overflow: "hidden", background: P.depth, color: P.stone, fontFamily: "Arial, sans-serif" }}>
        <img src={waterfrontUri} alt="" width="720" height="630" style={{ position: "absolute", left: 480, top: 0, width: 720, height: 630 }} />

        <div style={{ position: "absolute", inset: "0 auto 0 0", width: 518, display: "flex", flexDirection: "column", padding: "44px 50px 40px 54px", background: P.depth, borderRight: `3px solid ${P.outline}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <BrandMark />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ color: P.stone, fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>CITY 01</span>
              <span style={{ color: P.haze, fontSize: 12, fontWeight: 700, letterSpacing: 1.25 }}>SHOSUKE SATO / PORTFOLIO CITY</span>
            </div>
          </div>

          <div style={{ marginTop: 104, display: "flex", flexDirection: "column" }}>
            <span style={{ color: P.light, fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>制作と旅の、海辺の街。</span>
            <span style={{ marginTop: 18, color: P.stone, fontSize: 52, lineHeight: 1.12, fontWeight: 800, letterSpacing: -3 }}>つくったものが、</span>
            <span style={{ color: P.stone, fontSize: 74, lineHeight: 1.08, fontWeight: 800, letterSpacing: -4 }}>街になる。</span>
            <span style={{ marginTop: 24, width: 382, color: P.haze, fontSize: 18, lineHeight: 1.6, fontWeight: 600 }}>
              さとうしょうすけの制作と旅を、歩いて巡るポートフォリオ。
            </span>
          </div>

          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={{ width: 28, height: 4, background: P.coral }} />
              <span style={{ color: P.stone, fontSize: 13, fontWeight: 800, letterSpacing: 1.6 }}>VIVAPULSE.JP</span>
            </div>
            <span style={{ color: P.sky, fontSize: 12, fontWeight: 700, letterSpacing: 1.4 }}>18:42</span>
          </div>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: P.light }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: P.coral }} />
      </div>
    ),
    imageSize,
  );
}
