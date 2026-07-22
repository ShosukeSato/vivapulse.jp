"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

function insetTilePoints(x: number, y: number, inset = 0.12) {
  const points = [
    iso(x + inset, y + inset),
    iso(x + 1 - inset, y + inset),
    iso(x + 1 - inset, y + 1 - inset),
    iso(x + inset, y + 1 - inset),
  ];
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

function StreetLamp({ x, y }: { x: number; y: number }) {
  const point = iso(x, y);
  return (
    <g className="street-lamp" transform={`translate(${point.x} ${point.y})`} aria-hidden="true">
      <ellipse cx="3" cy="3" rx="8" ry="3" fill="#315e78" opacity=".16" />
      <path d="M0 0v-28l10-5" fill="none" stroke="#335f77" strokeWidth="2.5" />
      <circle cx="11" cy="-33" r="4" fill="#fff2a8" />
    </g>
  );
}

function Bench({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  const point = iso(x, y);
  return (
    <g transform={`translate(${point.x} ${point.y}) scale(${flip ? -1 : 1} 1)`} aria-hidden="true">
      <path d="M-18 -8L15 -16 20 -12 -13 -4Z" fill="#c57b52" />
      <path d="M-13 -4v11M15 -11v11" stroke="#41677c" strokeWidth="3" />
    </g>
  );
}

function Person({ x, y, color = "#ff6b5f", pose = 0 }: { x: number; y: number; color?: string; pose?: number }) {
  const point = iso(x, y);
  return (
    <g className={`city-person pose-${pose % 3}`} transform={`translate(${point.x} ${point.y})`} aria-hidden="true">
      <ellipse cx="3" cy="4" rx="8" ry="3.5" fill="#315e78" opacity=".18" />
      <circle cx="0" cy="-16" r="4" fill="#efb89f" />
      <path d="M0 -11v13M0 -7l-6 7M0 -7l6 5M0 2l-5 8M0 2l6 7" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function MovingPerson({ path, color, duration, delay }: { path: string; color: string; duration: number; delay: number }) {
  return (
    <g className="moving-person" aria-hidden="true">
      <animateMotion path={path} dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
      <ellipse cx="3" cy="4" rx="7" ry="3" fill="#315e78" opacity=".16" />
      <circle cx="0" cy="-15" r="3.8" fill="#efb89f" />
      <path d="M0 -10v12M0 -6l-5 6M0 -6l5 5M0 2l-5 7M0 2l6 6" fill="none" stroke={color} strokeWidth="3.6" strokeLinecap="round" />
    </g>
  );
}

function Bridge({ t, label, width = 52 }: { t: number; label: string; width?: number }) {
  const center = iso(t, t);
  return (
    <g className="canal-bridge" aria-hidden="true">
      <path d={`M${center.x - width} ${center.y - 15}H${center.x + width}V${center.y + 15}H${center.x - width}Z`} fill="#f8f4e8" stroke="#7898a8" strokeWidth="2" />
      <path d={`M${center.x - width + 7} ${center.y}H${center.x + width - 7}`} stroke="#d2b879" strokeWidth="3" strokeDasharray="5 8" />
      <path d={`M${center.x - width} ${center.y - 18}H${center.x + width}M${center.x - width} ${center.y + 18}H${center.x + width}`} stroke="#ffffff" strokeWidth="4" />
      <g transform={`translate(${center.x} ${center.y - 27})`}>
        <rect x="-22" y="-8" width="44" height="15" rx="7" fill="#174f75" />
        <text y="3" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="900" letterSpacing="1.2">{label}</text>
      </g>
    </g>
  );
}

function TheLoop({ x, y }: { x: number; y: number }) {
  const point = iso(x, y);
  const pods = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2;
    return { x: Math.cos(angle) * 72, y: -102 + Math.sin(angle) * 72 };
  });

  return (
    <g className="the-loop" transform={`translate(${point.x} ${point.y})`} aria-label="THE LOOP 展望リング">
      <ellipse className="building-shadow" cx="7" cy="13" rx="100" ry="27" />
      <path d="M-58 3L0 -102L58 3M-72 4H72" fill="none" stroke="#f5f8f7" strokeWidth="10" strokeLinejoin="round" />
      <path d="M-58 3L0 -102L58 3" fill="none" stroke="#2375a7" strokeWidth="3" />
      <g className="loop-wheel">
        <circle cx="0" cy="-102" r="75" fill="none" stroke="#f8fbfb" strokeWidth="9" />
        <circle cx="0" cy="-102" r="75" fill="none" stroke="#32bed1" strokeWidth="3" />
        {pods.map((pod, index) => (
          <g key={index} transform={`translate(${pod.x} ${pod.y})`}>
            <circle r="8" fill={index % 3 === 0 ? "#ff6b5f" : index % 3 === 1 ? "#ffd35a" : "#ffffff"} stroke="#1b648f" strokeWidth="2" />
          </g>
        ))}
        {Array.from({ length: 8 }, (_, index) => {
          const angle = (index / 8) * Math.PI * 2;
          return <path key={index} d={`M0 -102L${Math.cos(angle) * 69} ${-102 + Math.sin(angle) * 69}`} stroke="#85d8e4" strokeWidth="2" />;
        })}
        <circle cx="0" cy="-102" r="10" fill="#ffca52" stroke="#fff" strokeWidth="4" />
      </g>
      <BaseBlock width={70} height={21} depth={38} roof="#ffffff" left="#9cc7d5" right="#cce3e8" />
      <polygon points="8,-16 60,-29 60,-8 8,5" fill="#135c89" />
      <text x="19" y="-8" fill="#fff" fontSize="9" fontWeight="900" letterSpacing="1.4" transform="skewY(-14)">THE LOOP</text>
    </g>
  );
}

function PublicArt({ x, y }: { x: number; y: number }) {
  const point = iso(x, y);
  return (
    <g className="public-art" transform={`translate(${point.x} ${point.y})`} aria-hidden="true">
      <ellipse cx="3" cy="6" rx="31" ry="10" fill="#315e78" opacity=".16" />
      <path d="M-21 0L-8 -51L3 -47L-9 2ZM4 -6L20 -52L30 -47L15 0Z" fill="#ff6b5f" />
      <circle cx="9" cy="-28" r="23" fill="none" stroke="#ffd35a" strokeWidth="8" />
    </g>
  );
}

function CanalBoat() {
  return (
    <g className="canal-boat" aria-hidden="true">
      <path d="M-26 2L19 -9L31 -1L-15 11Z" fill="#ffffff" />
      <path d="M-13 -2L10 -8L20 -3L-4 3Z" fill="#ffcf55" />
      <path d="M-4 -4v-18l18 13z" fill="#15a2bf" />
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
      <MovingPerson path="M432 427L591 507L747 429" color="#ff6b5f" duration={16} delay={-3} />
      <MovingPerson path="M760 575L901 646L1040 578" color="#1269b0" duration={19} delay={-9} />
      <MovingPerson path="M554 336L704 411L844 341" color="#16a98e" duration={21} delay={-13} />
      <MovingPerson path="M354 518L494 588L619 525" color="#8b68d8" duration={18} delay={-6} />
      <g className="city-cyclist">
        <circle cx="0" cy="0" r="7" fill="none" stroke="#245777" strokeWidth="2" />
        <circle cx="24" cy="12" r="7" fill="none" stroke="#245777" strokeWidth="2" />
        <path d="M0 0l12 1 12 11-9-18zM12 1l-5 9M15-6l4-2" fill="none" stroke="#ff6b5f" strokeWidth="2.4" />
        <circle cx="15" cy="-13" r="3.5" fill="#efb89f" />
      </g>
      <CanalBoat />
      <path className="water-wave wave-a" d="M760 697q28-14 56 0t56 0" fill="none" stroke="#e9feff" strokeWidth="3" opacity=".8" />
      <path className="water-wave wave-b" d="M1010 664q24-12 48 0t48 0" fill="none" stroke="#e9feff" strokeWidth="3" opacity=".75" />
    </g>
  );
}

function Place({
  place,
  selected,
  entering,
  onEnter,
  onPreview,
}: {
  place: CityPlace;
  selected: boolean;
  entering: boolean;
  onEnter: (id: string) => void;
  onPreview: (id: string | null) => void;
}) {
  const point = iso(place.x, place.y);
  const activate = () => onEnter(place.id);
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
      {(selected || entering) && <circle className="selection-ring" cx="0" cy="2" r="78" />}
      {entering && <circle className="entry-pulse" cx="0" cy="-35" r="42" />}
    </>
  );

  return (
    <g
      className={`city-place${selected ? " is-selected" : ""}${entering ? " is-entering" : ""}`}
      transform={`translate(${point.x} ${point.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${place.name}に入る`}
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

function PlaceMarker({
  place,
  active,
  onEnter,
  onPreview,
}: {
  place: CityPlace;
  active: boolean;
  onEnter: (id: string) => void;
  onPreview: (id: string | null) => void;
}) {
  const point = iso(place.x, place.y);
  return (
    <g
      className={`landmark-marker${active ? " is-active" : ""}`}
      transform={`translate(${point.x + place.labelDx} ${point.y + place.labelDy})`}
      role="button"
      tabIndex={0}
      aria-label={`${place.code} ${place.name}に入る`}
      onClick={() => onEnter(place.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEnter(place.id);
        }
      }}
      onMouseEnter={() => onPreview(place.id)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(place.id)}
      onBlur={() => onPreview(null)}
    >
      <circle className="marker-halo" r="25" />
      <path className="marker-stem" d="M0 12V31" />
      <circle className="marker-dot" cy="33" r="4" />
      <rect x="-26" y="-13" width="52" height="26" rx="13" />
      <text textAnchor="middle" y="4">{place.code}</text>
    </g>
  );
}

type Camera = { x: number; y: number; zoom: number };

export default function IsometricCity({
  selectedId,
  enteringId,
  onEnter,
  onPreview,
}: {
  selectedId: string | null;
  enteringId: string | null;
  onSelect?: (id: string) => void;
  onEnter: (id: string) => void;
  onPreview: (id: string | null) => void;
}) {
  const [camera, setCamera] = useState<Camera>({ x: 720, y: 445, zoom: 1 });
  const cameraRef = useRef(camera);
  const drag = useRef<{ x: number; y: number; cameraX: number; cameraY: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);
  const didDrag = useRef(false);
  const places = useMemo(() => [...cityPlaces].sort((a, b) => a.x + a.y - (b.x + b.y)), []);
  const enteringPlace = enteringId ? cityPlaces.find((place) => place.id === enteringId) : null;
  const entryPoint = enteringPlace ? iso(enteringPlace.x, enteringPlace.y) : null;
  const viewWidth = MAP_WIDTH / camera.zoom;
  const viewHeight = MAP_HEIGHT / camera.zoom;

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useEffect(() => {
    if (!enteringPlace) return;
    const point = iso(enteringPlace.x, enteringPlace.y);
    const startCamera = cameraRef.current;
    const compact = window.matchMedia("(max-width: 720px)").matches;
    const target = {
      x: point.x,
      y: point.y - (compact ? 42 : 65),
      zoom: compact ? 1.32 : 1.58,
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 620;
    let frame = 0;
    const startedAt = performance.now();

    const move = (now: number) => {
      const raw = duration === 0 ? 1 : Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      setCamera({
        x: startCamera.x + (target.x - startCamera.x) * eased,
        y: startCamera.y + (target.y - startCamera.y) * eased,
        zoom: startCamera.zoom + (target.zoom - startCamera.zoom) * eased,
      });
      if (raw < 1) frame = window.requestAnimationFrame(move);
    };

    frame = window.requestAnimationFrame(move);
    return () => window.cancelAnimationFrame(frame);
  }, [enteringPlace]);

  const zoomBy = (factor: number) => {
    setCamera((current) => ({ ...current, zoom: Math.min(1.75, Math.max(0.82, current.zoom * factor)) }));
  };

  const onWheel = (event: ReactWheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    zoomBy(event.deltaY > 0 ? 0.92 : 1.08);
  };

  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    didDrag.current = false;
    if (pointers.current.size === 2) {
      const [first, second] = [...pointers.current.values()];
      pinch.current = { distance: Math.hypot(second.x - first.x, second.y - first.y), zoom: camera.zoom };
      drag.current = null;
      didDrag.current = true;
    } else {
      drag.current = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
    }
  };

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (pointers.current.has(event.pointerId)) {
      pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (pinch.current && pointers.current.size >= 2) {
      const [first, second] = [...pointers.current.values()];
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      const nextZoom = pinch.current.zoom * (distance / Math.max(1, pinch.current.distance));
      setCamera((current) => ({ ...current, zoom: Math.min(1.75, Math.max(.82, nextZoom)) }));
      didDrag.current = true;
      return;
    }
    if (!drag.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (Math.hypot(event.clientX - drag.current.x, event.clientY - drag.current.y) > 7) didDrag.current = true;
    const dx = ((event.clientX - drag.current.x) / rect.width) * viewWidth;
    const dy = ((event.clientY - drag.current.y) / rect.height) * viewHeight;
    setCamera((current) => ({
      ...current,
      x: Math.min(1240, Math.max(200, drag.current!.cameraX - dx)),
      y: Math.min(760, Math.max(150, drag.current!.cameraY - dy)),
    }));
  };

  const endDrag = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointers.current.delete(event.pointerId);
    pinch.current = null;
    drag.current = null;
    if (pointers.current.size === 1) {
      const remaining = [...pointers.current.values()][0];
      const current = cameraRef.current;
      drag.current = { x: remaining.x, y: remaining.y, cameraX: current.x, cameraY: current.y };
    } else {
      window.setTimeout(() => { didDrag.current = false; }, 0);
    }
  };

  const enterPlace = (id: string) => {
    if (!didDrag.current) onEnter(id);
  };

  const reset = () => setCamera({ x: 720, y: 445, zoom: 1 });
  const canalStops = [
    { t: .55, half: .28 },
    { t: 2.8, half: .38 },
    { t: 5.15, half: .5 },
    { t: 7.35, half: .72 },
    { t: 9.55, half: 1.28 },
  ];
  const canalLeft = canalStops.map(({ t, half }) => iso(t - half / 2, t + half / 2));
  const canalRight = [...canalStops].reverse().map(({ t, half }) => iso(t + half / 2, t - half / 2));
  const canalPoints = [...canalLeft, ...canalRight].map((point) => `${point.x},${point.y}`).join(" ");
  const loopDepth = 13.6;
  const rearPlaces = places.filter((place) => place.x + place.y < loopDepth);
  const frontPlaces = places.filter((place) => place.x + place.y >= loopDepth);

  return (
    <div className="city-map-wrap">
      <svg
        className={`city-map${entryPoint ? " is-entering" : ""}`}
        style={entryPoint ? { transformOrigin: `${(entryPoint.x / MAP_WIDTH) * 100}% ${(entryPoint.y / MAP_HEIGHT) * 100}%` } : undefined}
        viewBox={`${camera.x - viewWidth / 2} ${camera.y - viewHeight / 2} ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid slice"
        aria-label="CITY 01のアイソメトリック地図。建物を選ぶとカメラが近づき、それぞれの施設に入ります。"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <defs>
          <linearGradient id="cityGround" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f4f1e9" />
            <stop offset="1" stopColor="#d7e4e7" />
          </linearGradient>
          <linearGradient id="canalWater" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#48c7da" />
            <stop offset=".55" stopColor="#159fbe" />
            <stop offset="1" stopColor="#087fa8" />
          </linearGradient>
          <linearGradient id="bayWater" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#35bdd3" />
            <stop offset="1" stopColor="#087da6" />
          </linearGradient>
          <linearGradient id="parkLawn" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#9ed788" />
            <stop offset="1" stopColor="#58b987" />
          </linearGradient>
          <linearGradient id="stationGlass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d9ffff" />
            <stop offset="1" stopColor="#55bcd6" />
          </linearGradient>
          <pattern id="cityGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#568db3" strokeWidth="0.7" opacity=".12" />
          </pattern>
          <filter id="softShadow" x="-50%" y="-80%" width="200%" height="240%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#174f70" floodOpacity=".16" />
          </filter>
        </defs>

        <rect x="-500" y="-500" width="2500" height="1900" fill="url(#cityGrid)" />
        <ellipse cx="720" cy="510" rx="665" ry="350" fill="#1b688d" opacity=".16" />
        <polygon points="720,74 1400,414 720,754 40,414" fill="url(#cityGround)" stroke="#7895a4" strokeWidth="2" />

        {Array.from({ length: 10 }, (_, x) =>
          Array.from({ length: 10 }, (_, y) => {
            const sum = x + y;
            const isBay = sum >= 18;
            const isPromenade = sum === 9 || sum === 10;
            const isRoad = x === 3 || y === 3;
            const isPark = x >= 4 && x <= 6 && y >= 6 && y <= 8;
            const fill = isBay
              ? "url(#bayWater)"
              : isPromenade
                ? "#d5d8d4"
                : isRoad
                  ? "#879aa6"
                  : isPark
                    ? "url(#parkLawn)"
                    : (x + y) % 2
                      ? "#e7eceb"
                      : "#f1f2ed";
            return <polygon key={`${x}-${y}`} points={tilePoints(x, y)} fill={fill} stroke={isBay ? "#69d4df" : "#c4d2d4"} strokeWidth="1" />;
          })
        )}

        <path d="M112 442H1328" stroke="#748996" strokeWidth="58" opacity=".95" />
        <path d="M112 442H1328" stroke="#f8fbfb" strokeWidth="3" strokeDasharray="22 18" opacity=".9" />
        <path d="M278 246L1118 666M1118 246L278 666" stroke="#f9f7ef" strokeWidth="22" opacity=".75" />
        <path d="M278 246L1118 666M1118 246L278 666" stroke="#45a9bd" strokeWidth="2" strokeDasharray="5 13" opacity=".7" />

        <polygon points={canalPoints} fill="url(#canalWater)" stroke="#d7fbff" strokeWidth="3" />
        <path d={`M${canalLeft.map((point) => `${point.x} ${point.y}`).join("L")}`} fill="none" stroke="#f7f2e7" strokeWidth="13" />
        <path d={`M${canalRight.slice().reverse().map((point) => `${point.x} ${point.y}`).join("L")}`} fill="none" stroke="#f7f2e7" strokeWidth="13" />
        <path d="M697 190Q717 330 684 470T650 704M743 190Q723 330 756 470T790 704" fill="none" stroke="#c9fbff" strokeWidth="2.5" strokeDasharray="10 17" opacity=".8" />
        <path d="M370 671Q555 735 720 754Q885 735 1070 671" fill="none" stroke="#f7f2e7" strokeWidth="16" opacity=".92" />
        <path d="M370 671Q555 735 720 754Q885 735 1070 671" fill="none" stroke="#45a9bd" strokeWidth="2" strokeDasharray="6 14" />

        <Bridge t={3.35} label="NORTH" width={43} />
        <Bridge t={5.15} label="CENTRAL" width={55} />
        <Bridge t={7.25} label="HARBOR" width={66} />

        <polygon points={insetTilePoints(5, 7, .04)} fill="#80cb87" stroke="#f4f0df" strokeWidth="5" />
        <polygon points={insetTilePoints(4, 7, .07)} fill="#a7dc83" stroke="#f4f0df" strokeWidth="4" />
        <path d="M432 552Q555 494 667 553T865 579" fill="none" stroke="#f7efd9" strokeWidth="15" />
        <ellipse cx="610" cy="568" rx="94" ry="31" fill="#8fd28d" opacity=".45" />

        <g className="ground-wayfinding" aria-hidden="true">
          <text x="404" y="215">NORTH YARD</text>
          <text x="337" y="364">MAKERS QUAY</text>
          <text x="1112" y="367">CENTRAL</text>
          <text x="174" y="462">CULTURE PROMENADE</text>
          <text x="1015" y="616">HARBOR EDGE</text>
          <text className="canal-word" x="735" y="313" transform="rotate(90 735 313)">CENTRAL CANAL</text>
        </g>

        <CityLife />

        <GlassTower x={.4} y={1.45} height={168} width={38} tone="blue" />
        <GlassTower x={1.45} y={.4} height={206} width={43} tone="aqua" />
        <GlassTower x={.4} y={3.25} height={130} width={34} tone="white" />
        <GlassTower x={3.05} y={.4} height={182} width={40} tone="blue" />
        <GlassTower x={4.25} y={.35} height={220} width={45} tone="white" />
        <GlassTower x={5.25} y={.45} height={152} width={37} tone="aqua" />
        <GlassTower x={6.95} y={.65} height={190} width={42} tone="blue" />
        <GlassTower x={8.45} y={.95} height={142} width={36} tone="white" />
        <GlassTower x={.35} y={4.55} height={92} width={30} tone="aqua" />
        <GlassTower x={9.1} y={2.1} height={106} width={32} tone="white" />
        <GlassTower x={9.2} y={3.45} height={78} width={29} tone="aqua" />
        <WaterfrontHall x={8.1} y={6.0} />

        <StreetLamp x={3.1} y={6.55} />
        <StreetLamp x={4.25} y={6.1} />
        <StreetLamp x={6.85} y={5.8} />
        <StreetLamp x={7.8} y={6.15} />
        <Bench x={4.4} y={7.65} />
        <Bench x={5.15} y={8.2} flip />
        <Bench x={6.6} y={7.55} />
        <Tree x={3.75} y={7.25} />
        <Tree x={4.2} y={8.1} tone="lime" />
        <Tree x={4.9} y={6.9} />
        <Tree x={5.25} y={8.65} tone="lime" />
        <Tree x={6.35} y={6.75} />
        <Tree x={6.95} y={7.45} tone="lime" />
        <Tree x={7.55} y={7.7} />
        <Tree x={8.9} y={4.7} />

        <Person x={3.1} y={6.35} color="#ff6b5f" />
        <Person x={3.45} y={6.55} color="#1269b0" pose={1} />
        <Person x={4.45} y={7.35} color="#8b68d8" pose={2} />
        <Person x={4.85} y={7.65} color="#f0ae2d" />
        <Person x={6.35} y={6.75} color="#15a886" pose={1} />
        <Person x={7.6} y={6.65} color="#ff6b5f" />
        <Person x={8.15} y={7.75} color="#1269b0" pose={2} />
        <Person x={8.45} y={7.55} color="#f0ae2d" />

        {rearPlaces.map((place) => (
          <Place key={place.id} place={place} selected={selectedId === place.id} entering={enteringId === place.id} onEnter={enterPlace} onPreview={onPreview} />
        ))}

        <PublicArt x={4.65} y={5.55} />
        <TheLoop x={5.9} y={7.7} />

        {frontPlaces.map((place) => (
          <Place key={place.id} place={place} selected={selectedId === place.id} entering={enteringId === place.id} onEnter={enterPlace} onPreview={onPreview} />
        ))}

        <g className="landmark-layer">
          {places.map((place) => (
            <PlaceMarker key={place.id} place={place} active={selectedId === place.id || enteringId === place.id} onEnter={enterPlace} onPreview={onPreview} />
          ))}
        </g>
      </svg>

      <div className="map-controls" aria-label="地図の操作">
        <button type="button" onClick={() => zoomBy(1.16)} aria-label="拡大">＋</button>
        <button type="button" onClick={() => zoomBy(0.86)} aria-label="縮小">−</button>
        <button type="button" onClick={reset} aria-label="地図を中央に戻す">◎</button>
      </div>
      <p className="map-hint"><span /> DRAG / PINCH TO EXPLORE · SELECT A CODE TO ENTER</p>
    </div>
  );
}
