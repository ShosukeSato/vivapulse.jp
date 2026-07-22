"use client";

import { useMemo, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from "react";
import { cityPlaces, type CityPlace, type CityPlaceKind } from "@/data/city";

const MAP_WIDTH = 1440;
const MAP_HEIGHT = 900;
const ORIGIN_X = 720;
const ORIGIN_Y = 92;
const TILE_W = 136;
const TILE_H = 68;

function iso(x: number, y: number, z = 0) {
  return {
    x: ORIGIN_X + (x - y) * (TILE_W / 2),
    y: ORIGIN_Y + (x + y) * (TILE_H / 2) - z,
  };
}

function tilePoints(x: number, y: number) {
  const points = [iso(x, y), iso(x + 1, y), iso(x + 1, y + 1), iso(x, y + 1)];
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function BaseBlock({
  width,
  height,
  depth,
  roof,
  left,
  right,
}: {
  width: number;
  height: number;
  depth: number;
  roof: string;
  left: string;
  right: string;
}) {
  return (
    <g>
      <polygon
        points={`${-width},${-height - depth / 2} 0,${-height - depth} ${width},${-height - depth / 2} 0,${-height}`}
        fill={roof}
      />
      <polygon
        points={`${-width},${-height - depth / 2} 0,${-height} 0,0 ${-width},${-depth / 2}`}
        fill={left}
      />
      <polygon
        points={`0,${-height} ${width},${-height - depth / 2} ${width},${-depth / 2} 0,0`}
        fill={right}
      />
    </g>
  );
}

function TripVlogBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="8" cy="12" rx="83" ry="25" />
      <BaseBlock width={64} height={84} depth={48} roof="#45d7da" left="#3d80b7" right="#24699f" />
      <polygon points="10,-68 54,-79 54,-29 10,-18" fill="#123a66" />
      <polygon className="screen-glow" points="15,-63 49,-72 49,-36 15,-27" fill="#85f1e8" />
      <path d="M25 -45l12-3-6-8z" fill="#174978" />
      <path d="M-42 -79v49M-20 -73v52" stroke="#d5f5f6" strokeWidth="3" opacity=".78" />
      <path d="M0 -108v-30m0 3l16 7" stroke="#24547b" strokeWidth="3" />
      <circle className="signal-pulse" cx="0" cy="-139" r="5" fill="#ff6b5f" />
    </g>
  );
}

function HakuBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="5" cy="12" rx="86" ry="26" />
      <BaseBlock width={68} height={61} depth={48} roof="#ffffff" left="#c4dce6" right="#e6f2f4" />
      <polygon points="8,-52 57,-64 57,-18 8,-6" fill="#64d9e3" opacity=".88" />
      <path d="M24 -55v42M41 -59v42" stroke="#f7f8f4" strokeWidth="3" />
      <polygon points="-55,-70 -2,-84 -2,-72 -55,-59" fill="#ffffff" />
      <BaseBlock width={27} height={35} depth={30} roof="#ffffff" left="#c8d2d3" right="#e6ecea" />
      <circle cx="0" cy="-69" r="10" fill="#34c9c4" />
      <path d="M-50 -42l37 10v22l-37-10z" fill="#25629b" opacity=".92" />
      <text x="-39" y="-24" fill="#f6fbfb" fontSize="10" fontWeight="800" transform="skewY(15)">HAKU</text>
    </g>
  );
}

function StockaBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="5" cy="12" rx="68" ry="22" />
      <BaseBlock width={48} height={130} depth={40} roof="#ffda55" left="#3e80bd" right="#2367ab" />
      {[0, 1, 2, 3].map((floor) => (
        <g key={floor}>
          <polygon
            points={`8,${-114 + floor * 28} 40,${-122 + floor * 28} 40,${-103 + floor * 28} 8,${-95 + floor * 28}`}
            fill="#9ee8ee"
          />
          <polygon
            points={`${-40},${-122 + floor * 28} -8,${-114 + floor * 28} -8,${-95 + floor * 28} -40,${-103 + floor * 28}`}
            fill="#77b8da"
          />
        </g>
      ))}
      <polygon points="-25,-149 0,-162 25,-149 0,-136" fill="#fff0a8" />
      <text x="12" y="-72" fill="#fff3a5" fontSize="11" fontWeight="900" transform="skewY(-14)">A / あ</text>
    </g>
  );
}

function StationBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="2" cy="13" rx="104" ry="30" />
      <path d="M-118 15L-15 41M-102 4L1 30M20 39L120 14M4 29L104 4" stroke="#7794a8" strokeWidth="5" />
      <BaseBlock width={83} height={45} depth={58} roof="#ffffff" left="#a9c9d6" right="#d4e9ee" />
      <polygon points="-67,-55 0,-89 67,-55 0,-21" fill="url(#stationGlass)" />
      <path d="M-55 -52L0 -80 55 -52M-28 -38L28 -66M0 -24v-56" stroke="#d9ffff" strokeWidth="2" opacity=".75" />
      <polygon points="8,-34 70,-49 70,-21 8,-6" fill="#1768ac" />
      <text x="18" y="-19" fill="#ffffff" fontSize="11" fontWeight="800" transform="skewY(-14)">NOW</text>
      <circle className="live-dot" cx="62" cy="-57" r="5" fill="#ff6b5f" />
    </g>
  );
}

function LibraryBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="4" cy="14" rx="112" ry="31" />
      <BaseBlock width={91} height={72} depth={56} roof="#ffcf63" left="#e67667" right="#f0957f" />
      {[-68, -41, -14].map((x) => (
        <polygon key={x} points={`${x},-67 ${x + 18},-62 ${x + 18},-19 ${x},-24`} fill="#a64f69" />
      ))}
      {[12, 39, 66].map((x) => (
        <polygon key={x} points={`${x},-61 ${x + 17},-65 ${x + 17},-24 ${x},-20`} fill="#81d8e3" />
      ))}
      <BaseBlock width={38} height={111} depth={38} roof="#ffe497" left="#d96767" right="#ee8b7d" />
      <polygon points="7,-96 31,-102 31,-25 7,-19" fill="#baf4f1" />
      <path d="M-26 -109L0 -125 26 -109" fill="none" stroke="#fff8d8" strokeWidth="4" />
      <text x="10" y="-50" fill="#18578c" fontSize="9" fontWeight="900" transform="skewY(-14)">220+</text>
      <polygon points="-42,-119 -3,-140 -3,-121 -38,-101" fill="#fffdf4" stroke="#e7c96e" strokeWidth="2" />
      <polygon points="3,-140 43,-119 39,-101 3,-121" fill="#fff9df" stroke="#e7c96e" strokeWidth="2" />
      <path d="M0 -139v19" stroke="#d9a94c" strokeWidth="2" />
      <polygon points="9,-17 58,-29 71,-23 21,-10" fill="#fff5d2" />
      <polygon points="16,-10 58,-21 69,-16 27,-5" fill="#ffffff" />
      <text x="-72" y="-45" fill="#fff8df" fontSize="9" fontWeight="900" letterSpacing="1" transform="skewY(14)">LIBRARY</text>
    </g>
  );
}

function CinemaBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="4" cy="14" rx="112" ry="31" />
      <BaseBlock width={88} height={72} depth={58} roof="#fff8db" left="#315d94" right="#1e4e86" />
      <polygon points="9,-59 76,-76 76,-17 9,0" fill="#f6fbfd" />
      <polygon points="18,-51 68,-64 68,-28 18,-15" fill="#123a69" />
      <path className="screen-glow" d="M26 -45l31-8v18l-31 8z" fill="#6ce3dd" />
      <path d="M37 -39l12-3-6-7z" fill="#ffffff" />
      <polygon points="-75,-67 -8,-50 -8,-13 -75,-30" fill="#f5f8f9" />
      {[-65, -42, -19].map((x, index) => (
        <g key={x}>
          <polygon points={`${x},-59 ${x + 16},-55 ${x + 16},-27 ${x},-31`} fill={index === 1 ? "#ffb84e" : "#ff7467"} />
          <path d={`M${x + 4} -46l8 2`} stroke="#fff" strokeWidth="2" />
        </g>
      ))}
      <polygon points="-8,-22 70,-42 88,-29 9,-9" fill="#ff7064" />
      <polygon points="9,-9 88,-29 88,-18 9,2" fill="#d94650" />
      <text x="23" y="-22" fill="#ffffff" fontSize="10" fontWeight="900" letterSpacing="2" transform="skewY(-14)">NOW SHOWING</text>
      <path d="M-7 -92v-73h42v84" fill="#ff7064" />
      <path d="M0 -151h28v48H0z" fill="#fff8df" />
      <circle cx="14" cy="-127" r="11" fill="#1e4e86" />
      <path d="M10 -134l11 7-11 7z" fill="#ffffff" />
      <text x="-62" y="-73" fill="#fff8df" fontSize="11" fontWeight="900" transform="skewY(14)">TABI</text>
    </g>
  );
}

function StrategyBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="4" cy="11" rx="74" ry="23" />
      <BaseBlock width={66} height={38} depth={48} roof="#356fa8" left="#184f86" right="#0f3d71" />
      <polygon points="-45,-52 0,-75 45,-52 0,-29" fill="#7acbd9" />
      <ellipse cx="0" cy="-52" rx="24" ry="12" fill="#0a1120" />
      <ellipse className="strategy-ring" cx="0" cy="-52" rx="15" ry="7" fill="none" stroke="#ad8cff" strokeWidth="3" />
      <polygon points="10,-27 52,-37 52,-14 10,-4" fill="#fff06d" opacity=".95" />
      <text x="20" y="-15" fill="#123f70" fontSize="8" fontWeight="900" transform="skewY(-14)">B2</text>
    </g>
  );
}

function HarborBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="5" cy="13" rx="105" ry="27" />
      <polygon points="-104,-28 12,-57 107,-11 -9,18" fill="#66b9d1" />
      <path d="M-80 -13L-80 -94M-80 -92L-17 -75M-80 -92L-43 -40" stroke="#ffc84e" strokeWidth="7" fill="none" />
      <path d="M37 -30L37 -107M37 -105L88 -92M37 -105L68 -62" stroke="#ff6f61" strokeWidth="7" fill="none" />
      <polygon className="boat" points="-2,-6 50,-19 73,-7 20,7" fill="#f2f6f5" />
      <path d="M25 -16v-33l30 20z" fill="#ffe25e" />
      <rect x="-74" y="-37" width="28" height="17" fill="#80ddd2" transform="skewY(-14)" />
      <rect x="-42" y="-45" width="28" height="17" fill="#ad8cff" transform="skewY(-14)" />
    </g>
  );
}

function ConstructionBuilding() {
  return (
    <g>
      <ellipse className="building-shadow" cx="3" cy="10" rx="76" ry="22" />
      <polygon points="-67,-27 0,-60 67,-27 0,7" fill="#d8edf0" stroke="#f2b933" strokeWidth="2" strokeDasharray="8 7" />
      <path d="M-45 -22v-104M-45 -124L45 -101M-45 -124L8 -70M30 -105v74M-55 -97h100" stroke="#f2b933" strokeWidth="4" fill="none" />
      <path className="crane-hook" d="M44 -101v42q0 15-12 15" stroke="#f2b933" strokeWidth="3" fill="none" />
      <polygon points="-25,-34 0,-47 25,-34 0,-21" fill="#ff6f61" />
      <rect x="-16" y="-67" width="42" height="20" rx="3" fill="#eef6f3" transform="skewY(-14)" />
      <text x="-8" y="-53" fill="#182338" fontSize="9" fontWeight="900">01</text>
    </g>
  );
}

function BuildingByKind({ kind }: { kind: CityPlaceKind }) {
  switch (kind) {
    case "tripvlog": return <TripVlogBuilding />;
    case "haku": return <HakuBuilding />;
    case "stocka": return <StockaBuilding />;
    case "station": return <StationBuilding />;
    case "library": return <LibraryBuilding />;
    case "cinema": return <CinemaBuilding />;
    case "strategy": return <StrategyBuilding />;
    case "harbor": return <HarborBuilding />;
    case "construction": return <ConstructionBuilding />;
  }
}

function Tree({ x, y, tone = "mint" }: { x: number; y: number; tone?: "mint" | "lime" }) {
  const point = iso(x, y);
  return (
    <g transform={`translate(${point.x} ${point.y})`}>
      <ellipse className="building-shadow" cx="4" cy="6" rx="25" ry="9" />
      <path d="M0 -8v-31" stroke="#8e694c" strokeWidth="5" />
      <path d="M-26 -35L0 -63 27 -35 0 -15z" fill={tone === "mint" ? "#3cad83" : "#85c753"} />
      <path d="M-17 -49L0 -69 18 -49 0 -31z" fill={tone === "mint" ? "#62d5a5" : "#b9e36c"} />
    </g>
  );
}

function GlassTower({
  x,
  y,
  height,
  width = 34,
  tone = "blue",
}: {
  x: number;
  y: number;
  height: number;
  width?: number;
  tone?: "blue" | "aqua" | "white";
}) {
  const point = iso(x, y);
  const colors = {
    blue: { roof: "#d9f5fa", left: "#77b8d6", right: "#4b9bc5", glass: "#d2f4fa" },
    aqua: { roof: "#e4fffb", left: "#75c9ca", right: "#45afb8", glass: "#e5ffff" },
    white: { roof: "#ffffff", left: "#c4d9e1", right: "#e5f0f2", glass: "#78c8df" },
  }[tone];
  const floors = Math.max(3, Math.floor(height / 28));

  return (
    <g className="ambient-building" transform={`translate(${point.x} ${point.y})`}>
      <ellipse className="building-shadow" cx="4" cy="9" rx={width + 16} ry="14" />
      <BaseBlock width={width} height={height} depth={32} roof={colors.roof} left={colors.left} right={colors.right} />
      {Array.from({ length: floors }, (_, floor) => {
        const yPos = -height + 14 + floor * 24;
        return (
          <g key={floor}>
            <polygon points={`7,${yPos} ${width - 6},${yPos - 7} ${width - 6},${yPos + 8} 7,${yPos + 15}`} fill={colors.glass} opacity=".78" />
            <polygon points={`${-width + 6},${yPos - 7} -7,${yPos} -7,${yPos + 15} ${-width + 6},${yPos + 8}`} fill="#eaf8fa" opacity=".48" />
          </g>
        );
      })}
      <path d={`M0 ${-height - 32}v-18`} stroke="#3f799b" strokeWidth="2" />
    </g>
  );
}

function WaterfrontHall({ x, y }: { x: number; y: number }) {
  const point = iso(x, y);
  return (
    <g className="ambient-building" transform={`translate(${point.x} ${point.y})`}>
      <ellipse className="building-shadow" cx="4" cy="10" rx="76" ry="21" />
      <BaseBlock width={63} height={38} depth={48} roof="#ffffff" left="#99c7d8" right="#cce6eb" />
      <path d="M-55 -48Q0 -104 55 -48L0 -20Z" fill="#6ed5df" opacity=".86" />
      <path d="M-40 -48Q0 -83 40 -48" fill="none" stroke="#f7ffff" strokeWidth="5" />
    </g>
  );
}

function CityLife() {
  return (
    <g aria-hidden="true">
      <g className="city-car">
        <polygon points="526,372 552,385 538,392 512,379" fill="#ffffff" />
        <polygon points="521,370 539,379 532,383 514,374" fill="#ff6b5f" />
        <circle cx="520" cy="381" r="3" fill="#335f77" />
        <circle cx="540" cy="391" r="3" fill="#335f77" />
      </g>
      <g className="city-bus">
        <polygon points="883,508 929,531 912,540 866,517" fill="#f8fcfd" />
        <polygon points="875,505 916,525 916,534 875,514" fill="#19a9c2" />
        <path d="M883 510l8 4m5 2l8 4" stroke="#d8ffff" strokeWidth="3" />
      </g>
      {([
        [625, 425, "#ff6b5f"], [641, 433, "#1269b0"], [925, 593, "#f3b632"], [948, 605, "#16a98e"],
      ] as const).map(([x, y, color], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <ellipse cx="2" cy="4" rx="6" ry="3" fill="#44758c" opacity=".2" />
          <circle cx="0" cy="-10" r="3" fill="#f2bda7" />
          <path d="M0 -7v12m0-7l-5 5m5-5l5 5" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <path className="water-wave wave-a" d="M760 697q28-14 56 0t56 0" fill="none" stroke="#e9feff" strokeWidth="3" opacity=".8" />
      <path className="water-wave wave-b" d="M1010 664q24-12 48 0t48 0" fill="none" stroke="#e9feff" strokeWidth="3" opacity=".75" />
    </g>
  );
}

function Place({
  place,
  selected,
  onSelect,
  onPreview,
}: {
  place: CityPlace;
  selected: boolean;
  onSelect: (id: string) => void;
  onPreview: (id: string | null) => void;
}) {
  const point = iso(place.x, place.y);
  const activate = () => onSelect(place.id);
  const onKeyDown = (event: ReactKeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  };

  const contents = (
    <>
      <g className="building-art">
        <BuildingByKind kind={place.kind} />
      </g>
      <g className="map-label" transform="translate(0 45)">
        <rect x="-68" y="-20" width="136" height="42" rx="13" />
        <text className="place-name" textAnchor="middle" y="-3">{place.shortName}</text>
        <text className="place-action" textAnchor="middle" y="12">{place.action} {place.href ? "↗" : "→"}</text>
      </g>
      {selected && <circle className="selection-ring" cx="0" cy="2" r="78" />}
    </>
  );

  if (place.href) {
    return (
      <a
        className="city-place is-link"
        href={place.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${place.name}を開く`}
        onMouseEnter={() => onPreview(place.id)}
        onMouseLeave={() => onPreview(null)}
        onFocus={() => onPreview(place.id)}
        onBlur={() => onPreview(null)}
      >
        <g transform={`translate(${point.x} ${point.y})`}>{contents}</g>
      </a>
    );
  }

  return (
    <g
      className={`city-place${selected ? " is-selected" : ""}`}
      transform={`translate(${point.x} ${point.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${place.name}を開く`}
      onClick={activate}
      onKeyDown={onKeyDown}
      onMouseEnter={() => onPreview(place.id)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(place.id)}
      onBlur={() => onPreview(null)}
    >
      {contents}
    </g>
  );
}

type Camera = { x: number; y: number; zoom: number };

export default function IsometricCity({
  selectedId,
  onSelect,
  onPreview,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onPreview: (id: string | null) => void;
}) {
  const [camera, setCamera] = useState<Camera>({ x: 720, y: 445, zoom: 1 });
  const drag = useRef<{ x: number; y: number; cameraX: number; cameraY: number } | null>(null);
  const places = useMemo(() => [...cityPlaces].sort((a, b) => a.x + a.y - (b.x + b.y)), []);
  const viewWidth = MAP_WIDTH / camera.zoom;
  const viewHeight = MAP_HEIGHT / camera.zoom;

  const zoomBy = (factor: number) => {
    setCamera((current) => ({ ...current, zoom: Math.min(1.75, Math.max(0.82, current.zoom * factor)) }));
  };

  const onWheel = (event: ReactWheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    zoomBy(event.deltaY > 0 ? 0.92 : 1.08);
  };

  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    if ((event.target as Element).closest?.(".city-place")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
  };

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = ((event.clientX - drag.current.x) / rect.width) * viewWidth;
    const dy = ((event.clientY - drag.current.y) / rect.height) * viewHeight;
    setCamera((current) => ({ ...current, x: drag.current!.cameraX - dx, y: drag.current!.cameraY - dy }));
  };

  const endDrag = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current = null;
  };

  const reset = () => setCamera({ x: 720, y: 445, zoom: 1 });

  return (
    <div className="city-map-wrap">
      <svg
        className="city-map"
        viewBox={`${camera.x - viewWidth / 2} ${camera.y - viewHeight / 2} ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid slice"
        aria-label="途中市のアイソメトリック地図。アプリ店舗、映画館、図書館は押すと外部サイトへ移動し、街の施設は案内が開きます。"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <defs>
          <linearGradient id="cityGround" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#e9f2f3" />
            <stop offset="1" stopColor="#cbdde2" />
          </linearGradient>
          <linearGradient id="stationGlass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d9ffff" />
            <stop offset="1" stopColor="#55bcd6" />
          </linearGradient>
          <pattern id="cityGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#568db3" strokeWidth="0.7" opacity=".12" />
          </pattern>
        </defs>

        <rect x="-500" y="-500" width="2500" height="1900" fill="url(#cityGrid)" />
        <ellipse cx="720" cy="505" rx="655" ry="340" fill="#347da1" opacity=".14" />
        <polygon points="720,74 1400,414 720,754 40,414" fill="url(#cityGround)" stroke="#8eabb8" strokeWidth="2" />

        {Array.from({ length: 10 }, (_, x) =>
          Array.from({ length: 10 }, (_, y) => {
            const isRoad = x === 4 || y === 4;
            const isWater = (x >= 8 && y >= 5) || (y >= 8 && x >= 5);
            const isPark = (x === 1 && y >= 7) || (x >= 6 && x <= 7 && y === 7) || (y === 6 && x === 8);
            const fill = isWater
              ? (x + y) % 2 ? "#58b9d4" : "#67c5dc"
              : isRoad
                ? "#a9bac4"
                : isPark
                  ? "#86c9a7"
                  : (x + y) % 2
                    ? "#dbe8ea"
                    : "#e5eff0";
            return <polygon key={`${x}-${y}`} points={tilePoints(x, y)} fill={fill} stroke="#bfd0d5" strokeWidth="1" />;
          })
        )}

        <path d="M448 296L992 568M414 449L686 585M754 619L958 721" stroke="#f8fbfb" strokeWidth="4" strokeDasharray="22 19" opacity=".92" />
        <path d="M992 568L1196 670" stroke="#176dac" strokeWidth="3" strokeDasharray="8 13" opacity=".7" />
        <path d="M214 405L690 643L1124 426" fill="none" stroke="#f7ffff" strokeWidth="12" opacity=".72" />
        <path d="M214 405L690 643L1124 426" fill="none" stroke="#20a3c2" strokeWidth="2" strokeDasharray="5 12" opacity=".72" />

        <CityLife />

        <GlassTower x={3.7} y={0.45} height={148} width={38} tone="blue" />
        <GlassTower x={5.15} y={0.45} height={194} width={42} tone="aqua" />
        <GlassTower x={6.55} y={0.55} height={128} width={34} tone="white" />
        <GlassTower x={7.7} y={1.0} height={176} width={40} tone="blue" />
        <GlassTower x={0.45} y={3.65} height={116} width={32} tone="white" />
        <GlassTower x={0.5} y={4.9} height={154} width={37} tone="aqua" />
        <GlassTower x={0.75} y={6.35} height={102} width={31} tone="blue" />
        <WaterfrontHall x={7.55} y={6.9} />

        <Tree x={0.7} y={7.5} />
        <Tree x={1.45} y={8.25} tone="lime" />
        <Tree x={6.2} y={7.25} />
        <Tree x={7.15} y={7.4} tone="lime" />
        <Tree x={8.75} y={2.1} />

        {places.map((place) => (
          <Place key={place.id} place={place} selected={selectedId === place.id} onSelect={onSelect} onPreview={onPreview} />
        ))}

        <g className="district-label" transform="translate(535 238)"><text>MAKERS DISTRICT</text></g>
        <g className="district-label" transform="translate(330 532)"><text>CINEMA PROMENADE</text></g>
        <g className="district-label" transform="translate(940 605)"><text>ARCHIVE QUARTER</text></g>
        <g className="district-label" transform="translate(1125 723)"><text>WORLD ROUTE →</text></g>
      </svg>

      <div className="map-controls" aria-label="地図の操作">
        <button type="button" onClick={() => zoomBy(1.16)} aria-label="拡大">＋</button>
        <button type="button" onClick={() => zoomBy(0.86)} aria-label="縮小">−</button>
        <button type="button" onClick={reset} aria-label="地図を中央に戻す">◎</button>
      </div>
      <p className="map-hint"><span /> DRAG TO EXPLORE · CLICK A BUILDING TO ENTER</p>
    </div>
  );
}
