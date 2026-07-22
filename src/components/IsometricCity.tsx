"use client";

import { useState, type KeyboardEvent as ReactKeyboardEvent, type WheelEvent as ReactWheelEvent } from "react";
import { cityPlaces, type CityPlace, type CityPlaceKind } from "@/data/city";

const MAP_WIDTH = 1440;
const MAP_HEIGHT = 900;

const MAP_POSITIONS: Record<string, { x: number; y: number }> = {
  construction: { x: 250, y: 205 },
  tripvlog: { x: 505, y: 214 },
  haku: { x: 350, y: 430 },
  stocka: { x: 1080, y: 220 },
  station: { x: 718, y: 405 },
  strategy: { x: 1055, y: 445 },
  cinema: { x: 285, y: 655 },
  library: { x: 820, y: 635 },
  harbor: { x: 1125, y: 690 },
};

const TONES: Record<CityPlaceKind, { accent: string; light: string; dark: string }> = {
  construction: { accent: "#e98935", light: "#f5c675", dark: "#9b5524" },
  tripvlog: { accent: "#236cb1", light: "#6fd0d4", dark: "#173f68" },
  haku: { accent: "#b86d75", light: "#f0d8cc", dark: "#74434d" },
  stocka: { accent: "#237a58", light: "#8dc9a6", dark: "#174e3a" },
  station: { accent: "#087f9b", light: "#8ed8dc", dark: "#185369" },
  strategy: { accent: "#6252b5", light: "#a999e1", dark: "#30286b" },
  library: { accent: "#b84e42", light: "#efad68", dark: "#74352f" },
  cinema: { accent: "#d9473f", light: "#f19b66", dark: "#25202b" },
  harbor: { accent: "#157f9a", light: "#74c8ce", dark: "#174f66" },
};

function ExtrudedBlock({ width = 76, height = 54, tone }: { width?: number; height?: number; tone: typeof TONES[CityPlaceKind] }) {
  const x = -width / 2;
  const y = -height;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={tone.accent} stroke="#153f52" strokeWidth="2" />
      <polygon points={`${x},${y} ${x + 10},${y - 8} ${x + width + 10},${y - 8} ${x + width},${y}`} fill={tone.light} stroke="#153f52" strokeWidth="2" />
      <polygon points={`${x + width},${y} ${x + width + 10},${y - 8} ${x + width + 10},${y + height - 8} ${x + width},${y + height}`} fill={tone.dark} stroke="#153f52" strokeWidth="2" />
    </g>
  );
}

function LandmarkGlyph({ kind }: { kind: CityPlaceKind }) {
  const tone = TONES[kind];

  if (kind === "construction") {
    return (
      <g>
        <path d="M-36 0H40M-27 0v-72M-27-72h72M-27-72 7-39M34-70V0M45-72v31h-13" fill="none" stroke={tone.accent} strokeWidth="6" />
        <rect x="-8" y="-29" width="40" height="29" fill="#f6efe1" stroke="#153f52" strokeWidth="2" />
        <text x="12" y="-10" textAnchor="middle" className="landmark-symbol-text">01</text>
      </g>
    );
  }

  if (kind === "harbor") {
    return (
      <g>
        <path d="M-38 0v-64h58M-38-64-1 65M18-62v24" fill="none" stroke={tone.accent} strokeWidth="6" />
        <path d="m-17-4 53-13 20 8-54 15Z" fill="#f8f4e8" stroke="#153f52" strokeWidth="2" />
        <path d="M4-16v-29l28 23Z" fill="#e9bd4a" stroke="#153f52" strokeWidth="2" />
      </g>
    );
  }

  if (kind === "strategy") {
    return (
      <g>
        <ExtrudedBlock width={86} height={42} tone={tone} />
        <ellipse cx="0" cy="-43" rx="25" ry="11" fill="#151429" stroke="#a999e1" strokeWidth="4" />
        <path d="M-9-43c7-10 18-10 25 0-7 10-18 10-25 0Z" fill="none" stroke="#e65c78" strokeWidth="3" />
        <text x="0" y="-12" textAnchor="middle" className="landmark-symbol-text light">B2 / ON AIR</text>
      </g>
    );
  }

  if (kind === "station") {
    return (
      <g>
        <ExtrudedBlock width={104} height={40} tone={tone} />
        <path d="M-40-40Q0-88 40-40Z" fill="#d9f2ef" stroke="#153f52" strokeWidth="2" />
        <path d="M-28-42Q0-72 28-42M0-76v36" fill="none" stroke="#438ba0" strokeWidth="2" />
        <rect x="-21" y="-27" width="42" height="18" fill="#f4f0dd" stroke="#153f52" strokeWidth="2" />
        <text x="0" y="-14" textAnchor="middle" className="landmark-symbol-text">NOW</text>
      </g>
    );
  }

  if (kind === "cinema") {
    return (
      <g>
        <ExtrudedBlock width={92} height={62} tone={tone} />
        <rect x="-34" y="-51" width="68" height="31" fill="#24212a" stroke="#f7eee3" strokeWidth="2" />
        <path d="m-5-44 14 8-14 8Z" fill="#f7eee3" />
        <rect x="-42" y="-14" width="84" height="20" fill="#f1d27b" stroke="#153f52" strokeWidth="2" />
        <text x="0" y="0" textAnchor="middle" className="landmark-symbol-text">NOW SHOWING</text>
      </g>
    );
  }

  if (kind === "library") {
    return (
      <g>
        <ExtrudedBlock width={90} height={70} tone={tone} />
        {[-28, -9, 10, 29].map((x, index) => <rect key={x} x={x} y="-57" width="11" height="43" fill={index % 2 ? "#f5c477" : "#f3e5c4"} />)}
        <path d="M-22-76 0-91l22 15-22 9Z" fill="#f7f0dc" stroke="#153f52" strokeWidth="2" />
        <text x="0" y="-4" textAnchor="middle" className="landmark-symbol-text light">229</text>
      </g>
    );
  }

  if (kind === "tripvlog") {
    return (
      <g>
        <ExtrudedBlock width={76} height={72} tone={tone} />
        <rect x="-25" y="-61" width="50" height="39" fill="#16334f" stroke="#d9efeb" strokeWidth="2" />
        <rect x="-19" y="-55" width="38" height="27" fill="#6fd0d4" />
        <path d="m-5-50 14 9-14 9Z" fill="#173f68" />
        <circle cx="30" cy="-65" r="4" fill="#ef685f" />
        <text x="0" y="-7" textAnchor="middle" className="landmark-symbol-text light">CUT / 042</text>
      </g>
    );
  }

  if (kind === "haku") {
    return (
      <g>
        <ExtrudedBlock width={82} height={58} tone={tone} />
        <rect x="-27" y="-49" width="54" height="38" fill="#f7f2e8" stroke="#153f52" strokeWidth="2" />
        <rect x="-18" y="-41" width="36" height="22" fill="#aec8c4" />
        <path d="M-18-19 0-38l18 19" fill="#728f89" />
        <text x="0" y="-4" textAnchor="middle" className="landmark-symbol-text light">HAKU</text>
      </g>
    );
  }

  return (
    <g>
      <ExtrudedBlock width={72} height={88} tone={tone} />
      {[0, 1, 2].map((floor) => <rect key={floor} x="-25" y={-76 + floor * 23} width="50" height="13" fill="#c7ead5" />)}
      <text x="0" y="-3" textAnchor="middle" className="landmark-symbol-text light">A / あ</text>
    </g>
  );
}

function Place({ place, active, entering, onEnter, onPreview }: {
  place: CityPlace;
  active: boolean;
  entering: boolean;
  onEnter: (id: string) => void;
  onPreview: (id: string | null) => void;
}) {
  const position = MAP_POSITIONS[place.id];
  const onKeyDown = (event: ReactKeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onEnter(place.id);
    }
  };

  return (
    <g
      className={`plan-place${active ? " is-active" : ""}${entering ? " is-entering" : ""}`}
      transform={`translate(${position.x} ${position.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${place.code} ${place.name}に入る`}
      onClick={() => onEnter(place.id)}
      onKeyDown={onKeyDown}
      onMouseEnter={() => onPreview(place.id)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(place.id)}
      onBlur={() => onPreview(null)}
    >
      <rect className="plan-parcel" x="-70" y="-104" width="140" height="132" rx="4" />
      <path className="parcel-axis" d="M-70 28h140M-70-104v132" />
      <g className="plan-landmark"><LandmarkGlyph kind={place.kind} /></g>
      <g className="plan-label" transform="translate(-69 39)">
        <rect width="138" height="43" rx="2" />
        <text x="10" y="17" className="plan-code">{place.code}</text>
        <text x="10" y="32" className="plan-name">{place.shortName}</text>
        <path d="M117 21h11m-5-5 5 5-5 5" />
      </g>
      {place.status === "live" && <circle className="plan-live" cx="61" cy="-95" r="5" />}
      {entering && <circle className="plan-entry-ring" r="92" cy="-38" />}
    </g>
  );
}

export default function IsometricCity({ selectedId, enteringId, onEnter, onPreview }: {
  selectedId: string | null;
  enteringId: string | null;
  onSelect?: (id: string) => void;
  onEnter: (id: string) => void;
  onPreview: (id: string | null) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const enteringPlace = enteringId ? cityPlaces.find((place) => place.id === enteringId) : null;
  const entryPosition = enteringPlace ? MAP_POSITIONS[enteringPlace.id] : null;
  const viewWidth = MAP_WIDTH / zoom;
  const viewHeight = MAP_HEIGHT / zoom;
  const zoomBy = (factor: number) => setZoom((current) => Math.min(1.35, Math.max(.86, current * factor)));

  const onWheel = (event: ReactWheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    zoomBy(event.deltaY > 0 ? .94 : 1.06);
  };

  return (
    <div className="city-map-wrap plan-map-wrap">
      <svg
        className={`city-map plan-map${entryPosition ? " is-entering" : ""}`}
        style={entryPosition ? { transformOrigin: `${(entryPosition.x / MAP_WIDTH) * 100}% ${(entryPosition.y / MAP_HEIGHT) * 100}%` } : undefined}
        viewBox={`${(MAP_WIDTH - viewWidth) / 2} ${(MAP_HEIGHT - viewHeight) / 2} ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid slice"
        aria-label="CITY 01都市計画図。施設コードを選ぶと、それぞれの館内へ入ります。"
        onWheel={onWheel}
      >
        <defs>
          <pattern id="planGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#466d7d" strokeWidth=".65" opacity=".13" />
          </pattern>
          <pattern id="waterLines" width="42" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8h24M30 8h12" stroke="#d7f1ee" strokeWidth="2" opacity=".52" />
          </pattern>
        </defs>

        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#e9ede6" />
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#planGrid)" />

        <path className="district-fill district-north" d="M82 116h560v210H82Z" />
        <path className="district-fill district-makers" d="M82 347h470v216H82Z" />
        <path className="district-fill district-central" d="M780 116h580v443H780Z" />
        <path className="district-fill district-culture" d="M82 585h855v218H82Z" />

        <path className="plan-water" d="M912 550C1040 530 1187 544 1440 470V900H735c92-91 115-213 177-350Z" />
        <path d="M912 550C1040 530 1187 544 1440 470V900H735c92-91 115-213 177-350Z" fill="url(#waterLines)" />
        <path className="quay-line" d="M734 900c92-91 115-213 178-350 128-20 275-6 528-80" />

        <g className="plan-roads" aria-hidden="true">
          <path d="M76 334H1364" />
          <path d="M76 574H962" />
          <path d="M664 94V806" />
          <path d="M955 94V532" />
          <path d="M552 334 738 574" />
        </g>
        <g className="road-centres" aria-hidden="true">
          <path d="M76 334H1364" />
          <path d="M76 574H962" />
          <path d="M664 94V806" />
          <path d="M955 94V532" />
        </g>

        <g className="plan-rail" aria-hidden="true">
          <path d="M610 94v712M718 94v712" />
          {Array.from({ length: 12 }, (_, index) => <path key={index} d={`M604 ${112 + index * 58}h120`} />)}
        </g>

        <g className="district-titles" aria-hidden="true">
          <text x="105" y="145"><tspan>01</tspan> NORTH YARD</text>
          <text x="105" y="377"><tspan>02</tspan> MAKERS QUAY</text>
          <text x="808" y="145"><tspan>03</tspan> CENTRAL</text>
          <text x="105" y="615"><tspan>04</tspan> CULTURE PROMENADE</text>
          <text x="1180" y="523"><tspan>05</tspan> HARBOR EDGE</text>
        </g>

        <g className="map-notation" aria-hidden="true">
          <text x="675" y="122" transform="rotate(90 675 122)">CENTRAL LINE / CITY 01</text>
          <text x="1030" y="856">WATERFRONT  /  ROUTE CONTINUES EAST</text>
          <path d="M1305 828h66m-12-12 12 12-12 12" />
          <circle cx="1320" cy="104" r="22" />
          <path d="M1320 88v32m0 0-7-12m7 12 7-12" />
          <text x="1320" y="139" textAnchor="middle">NORTH</text>
        </g>

        {cityPlaces.map((place) => (
          <Place
            key={place.id}
            place={place}
            active={selectedId === place.id || enteringId === place.id}
            entering={enteringId === place.id}
            onEnter={onEnter}
            onPreview={onPreview}
          />
        ))}
      </svg>

      <div className="map-controls" aria-label="地図の操作">
        <button type="button" onClick={() => zoomBy(1.12)} aria-label="拡大">＋</button>
        <button type="button" onClick={() => zoomBy(.89)} aria-label="縮小">−</button>
        <button type="button" onClick={() => setZoom(1)} aria-label="地図を全体表示">◎</button>
      </div>
      <p className="map-hint"><span /> CITY PLAN 01 / SELECT A FACILITY CODE</p>
    </div>
  );
}
