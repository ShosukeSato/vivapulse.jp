"use client";

import { useId } from "react";
import { cityPlaces, type CityPlace } from "@/data/city";
import {
  CITY_SCENE_CAMERA_VIEW_BOX,
  CITY_SCENE_HEIGHT,
  CITY_SCENE_ORDER,
  CITY_SCENE_PALETTE as P,
  CITY_SCENE_PLACEMENTS,
  CITY_SCENE_VIEW_BOX,
  CITY_SCENE_WIDTH,
  type CitySceneBounds,
  type CityScenePlaceId,
} from "./scene";

export type CitySceneProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  preview?: boolean;
};

const PLACE_BY_ID = new Map(cityPlaces.map((place) => [place.id, place]));

type MassProps = {
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  roof: string;
  south: string;
  east: string;
};

/** A single three-quarter orthographic mass: north-west roof, south face, east face. */
function Mass({ x, y, width, depth, height, roof, south, east }: MassProps) {
  const roofSouthY = y + depth - height;
  const baseSouthY = y + depth;

  return (
    <g>
      <polygon
        points={`${x},${y - height} ${x + width},${y - height} ${x + width + depth},${roofSouthY} ${x + depth},${roofSouthY}`}
        fill={roof}
        stroke={P.outline}
      />
      <polygon
        points={`${x + depth},${roofSouthY} ${x + width + depth},${roofSouthY} ${x + width + depth},${baseSouthY} ${x + depth},${baseSouthY}`}
        fill={south}
        stroke={P.outline}
      />
      <polygon
        points={`${x + width},${y - height} ${x + width + depth},${roofSouthY} ${x + width + depth},${baseSouthY} ${x + width},${y}`}
        fill={east}
        stroke={P.outline}
      />
    </g>
  );
}

function CastShadow({ x, y, width, height }: CitySceneBounds) {
  return (
    <rect
      x={x + 12}
      y={y + 12}
      width={width}
      height={height}
      fill={P.blackDepth}
      opacity="0.28"
    />
  );
}

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x + 7} y={y + 8} width="12" height="12" fill={P.blackDepth} opacity="0.24" />
      <rect x={x + 11} y={y + 13} width="4" height="10" fill={P.brick} stroke={P.outline} />
      <polygon
        points={`${x + 4},${y + 5} ${x + 9},${y} ${x + 20},${y} ${x + 24},${y + 6} ${x + 20},${y + 16} ${x + 6},${y + 16} ${x},${y + 10}`}
        fill={P.foliage}
        stroke={P.outline}
      />
      <path d={`M${x + 4} ${y + 6}h12v4H${x + 8}v4`} fill="none" stroke={P.foliageLight} />
    </g>
  );
}

function PromenadeLamp({ x }: { x: number }) {
  return (
    <g>
      <rect x={x + 5} y="650" width="5" height="38" fill={P.blackDepth} />
      <rect x={x} y="646" width="15" height="10" fill={P.warmLight} stroke={P.outline} />
      <rect x={x + 4} y="648" width="7" height="4" fill={P.lightCore} />
    </g>
  );
}

function YardLandmark() {
  const fencePosts = Array.from({ length: 12 }, (_, index) => 72 + index * 24);

  return (
    <g>
      <CastShadow x={72} y={96} width={264} height={144} />
      <rect x="72" y="84" width="264" height="156" fill={P.midStone} stroke={P.outline} />
      <path d="M72 108H336M72 216H336" stroke={P.outline} fill="none" />
      {fencePosts.map((x) => <path key={x} d={`M${x} 84v156`} stroke={P.stoneShadow} fill="none" />)}

      <Mass x={96} y={210} width={96} depth={24} height={24} roof={P.warmLight} south={P.brick} east={P.stoneShadow} />
      <path d="M120 192v40M144 192v40M168 192v40" stroke={P.outline} fill="none" />

      <Mass x={144} y={168} width={96} depth={36} height={48} roof={P.lightStone} south={P.haze} east={P.stoneShadow} />
      <rect x="180" y="160" width="24" height="44" fill={P.blackDepth} stroke={P.outline} />
      <rect x="184" y="164" width="16" height="12" fill={P.lightCore} />
      <path d="M156 134h72M156 146h72" stroke={P.stoneShadow} fill="none" />

      <Mass x={240} y={216} width={60} depth={24} height={20} roof={P.tripVlogBlue} south={P.glassShadow} east={P.outline} />
      <path d="M252 204v32M276 204v32" stroke={P.outline} fill="none" />

      <g>
        <rect x="270" y="88" width="8" height="106" fill={P.warmLight} stroke={P.outline} />
        <path d="M274 92H176V84H286" fill="none" stroke={P.outline} />
        <path d="M184 84v20M200 84v12M216 84v20M232 84v12M248 84v20" fill="none" stroke={P.warmLight} />
        <path d="M184 104v28" stroke={P.outline} />
        <rect x="178" y="132" width="12" height="9" fill={P.selection} stroke={P.outline} />
        <path d="M266 194h16l-4 12h-8Z" fill={P.asphalt} stroke={P.outline} />
      </g>
    </g>
  );
}

function TripVlogLandmark() {
  return (
    <g>
      <CastShadow x={444} y={96} width={192} height={144} />
      <Mass x={444} y={210} width={168} depth={36} height={72} roof={P.stoneShadow} south={P.asphalt} east={P.blackDepth} />

      <polygon points="444,138 492,138 516,162 468,162" fill={P.lightStone} stroke={P.outline} />
      <polygon points="492,138 540,138 564,162 516,162" fill={P.midStone} stroke={P.outline} />
      <polygon points="540,138 588,138 612,162 564,162" fill={P.lightStone} stroke={P.outline} />
      <path d="M468 162v22M516 162v22M564 162v22M612 162v22" stroke={P.outline} />

      <rect x="480" y="196" width="132" height="12" fill={P.tripVlogBlue} stroke={P.outline} />
      <rect x="492" y="213" width="72" height="33" fill={P.blackDepth} stroke={P.outline} />
      <path d="M504 216v30M516 216v30M528 216v30M540 216v30M552 216v30" stroke={P.glassShadow} />
      <rect x="576" y="214" width="24" height="32" fill={P.lightCore} stroke={P.outline} />
      <rect x="580" y="218" width="16" height="7" fill={P.warmLight} />

      <rect x="456" y="112" width="24" height="24" fill={P.glass} stroke={P.outline} />
      <rect x="462" y="118" width="12" height="12" fill={P.lightGlass} />
      <path d="M468 112V96M462 96h12" stroke={P.outline} />
    </g>
  );
}

function StockaLandmark() {
  return (
    <g>
      <CastShadow x={1056} y={84} width={288} height={168} />
      <rect x="1068" y="108" width="264" height="132" fill={P.lightStone} stroke={P.outline} />
      <rect x="1176" y="132" width="108" height="84" fill={P.haze} stroke={P.outline} />
      <path d="M1188 144h84v60h-84Z" fill={P.midStone} stroke={P.stoneShadow} />

      <Mass x={1068} y={216} width={96} depth={36} height={96} roof={P.lightGlass} south={P.stockaGreen} east={P.glassShadow} />
      <Mass x={1224} y={192} width={72} depth={36} height={72} roof={P.lightGlass} south={P.stockaGreen} east={P.glassShadow} />
      <Mass x={1140} y={126} width={144} depth={24} height={24} roof={P.haze} south={P.glass} east={P.glassShadow} />

      <path d="M1080 144h108M1080 168h108M1080 192h108" stroke={P.lightGlass} />
      <path d="M1104 120v120M1128 120v120M1152 120v120" stroke={P.glassShadow} />
      <path d="M1236 144h96M1236 168h96" stroke={P.lightGlass} />
      <path d="M1260 120v96M1284 120v96M1308 120v96" stroke={P.glassShadow} />

      <Tree x={1200} y={160} />
      <rect x="1192" y="196" width="72" height="8" fill={P.stoneShadow} stroke={P.outline} />
      <rect x="1216" y="200" width="24" height="16" fill={P.warmLight} stroke={P.outline} />
    </g>
  );
}

function HakuLandmark() {
  return (
    <g>
      <CastShadow x={72} y={360} width={288} height={168} />
      <rect x="84" y="372" width="264" height="144" fill={P.haze} stroke={P.outline} />
      <rect x="156" y="420" width="120" height="72" fill={P.midStone} stroke={P.stoneShadow} />

      <Mass x={96} y={432} width={216} depth={36} height={36} roof={P.hakuWhite} south={P.lightStone} east={P.stoneShadow} />
      <Mass x={96} y={492} width={48} depth={24} height={28} roof={P.hakuWhite} south={P.lightStone} east={P.stoneShadow} />
      <Mass x={264} y={492} width={48} depth={24} height={28} roof={P.hakuWhite} south={P.lightStone} east={P.stoneShadow} />

      {[132, 192, 252].map((x) => (
        <g key={x}>
          <polygon points={`${x},393 ${x + 30},393 ${x + 42},405 ${x + 12},405`} fill={P.lightGlass} stroke={P.outline} />
          <path d={`M${x + 10} 396h18`} stroke={P.hakuWhite} />
        </g>
      ))}

      <path d="M168 444h96v36h-96Z" fill={P.lightStone} stroke={P.outline} />
      <Tree x={204} y={446} />
      <path d="M108 480h36M288 480h36" stroke={P.glass} />
      <rect x="192" y="506" width="24" height="22" fill={P.lightCore} stroke={P.outline} />
    </g>
  );
}

function TerminalRail() {
  const sleepers = Array.from({ length: 14 }, (_, index) => 12 + index * 24);

  return (
    <g>
      <rect x="684" y="0" width="72" height="384" fill={P.stoneShadow} stroke={P.outline} />
      <path d="M690 0v384M750 0v384" stroke={P.midStone} />
      {sleepers.map((y) => <rect key={y} x="696" y={y} width="48" height="5" fill={P.midStone} stroke={P.outline} />)}
      <path d="M706 0v384M734 0v384" stroke={P.lightStone} strokeWidth="2" />

      <rect x="636" y="204" width="48" height="180" fill={P.midStone} stroke={P.outline} />
      <rect x="756" y="204" width="48" height="180" fill={P.midStone} stroke={P.outline} />
      <path d="M648 216v156M672 216v156M768 216v156M792 216v156" stroke={P.stoneShadow} />
      <rect x="648" y="222" width="24" height="7" fill={P.warmLight} />
      <rect x="768" y="222" width="24" height="7" fill={P.warmLight} />

      <g className="city-scene__train">
        <rect x="702" y="90" width="36" height="150" rx="7" fill={P.lightStone} stroke={P.outline} />
        <path d="M702 108h36M702 150h36M702 192h36M702 222h36" stroke={P.outline} />
        <rect x="708" y="114" width="24" height="27" fill={P.glassShadow} />
        <rect x="708" y="156" width="24" height="27" fill={P.glassShadow} />
        <rect x="708" y="198" width="24" height="16" fill={P.glassShadow} />
        <polygon points="702,96 708,90 732,90 738,96 738,108 702,108" fill={P.warmLight} stroke={P.outline} />
        <rect x="708" y="96" width="6" height="5" fill={P.lightCore} />
        <rect x="726" y="96" width="6" height="5" fill={P.lightCore} />
      </g>

      <path d="M696 366h48M700 374h40" stroke={P.blackDepth} strokeWidth="4" />
    </g>
  );
}

function CentralLandmark() {
  return (
    <g>
      <TerminalRail />
      <CastShadow x={528} y={336} width={336} height={192} />
      <Mass x={540} y={480} width={276} depth={48} height={72} roof={P.lightStone} south={P.stoneShadow} east={P.outline} />

      <polygon
        points="576,408 576,354 588,342 612,330 756,330 780,342 792,354 792,408"
        fill={P.lightGlass}
        stroke={P.outline}
      />
      <path d="M600 336v72M624 330v78M648 330v78M672 330v78M696 330v78M720 330v78M744 330v78M768 336v72" stroke={P.glassShadow} />
      <path d="M576 360h216M576 384h216" stroke={P.haze} />

      <rect x="588" y="456" width="216" height="24" fill={P.glassShadow} stroke={P.outline} />
      {[600, 648, 696, 744].map((x) => <rect key={x} x={x} y="458" width="24" height="22" fill={P.lightCore} stroke={P.outline} />)}
      <rect x="660" y="486" width="24" height="42" fill={P.blackDepth} stroke={P.outline} />
      <path d="M672 488v38" stroke={P.warmLight} />

      <circle cx="684" cy="435" r="15" fill={P.lightStone} stroke={P.outline} />
      <path d="M684 435v-9M684 435l-8 6" stroke={P.outline} strokeWidth="2" />

      <rect x="552" y="510" width="264" height="8" fill={P.warmLight} stroke={P.outline} />
      <rect x="828" y="438" width="24" height="72" fill={P.glassShadow} stroke={P.outline} />
      <rect x="832" y="442" width="16" height="16" fill={P.lightCore} />
    </g>
  );
}

function StrategyLandmark() {
  const stairRows = Array.from({ length: 7 }, (_, index) => index);

  return (
    <g>
      <CastShadow x={864} y={396} width={108} height={132} />
      <rect x="864" y="408" width="108" height="108" fill={P.blackDepth} stroke={P.outline} />
      <rect x="876" y="420" width="72" height="84" fill={P.blackDepth} stroke={P.outline} />
      {stairRows.map((row) => (
        <rect
          key={row}
          x={882 + row * 3}
          y={426 + row * 10}
          width={60 - row * 6}
          height="7"
          fill={row < 5 ? "#4F456B" : P.blackDepth}
          stroke={P.outline}
        />
      ))}
      <rect x="900" y="494" width="24" height="18" fill={P.warmLight} stroke={P.outline} />

      <Mass x={936} y={456} width={24} depth={24} height={52} roof={P.midStone} south={P.stoneShadow} east={P.blackDepth} />
      <path d="M944 416v44M952 416v44" stroke={P.outline} />
      <rect x="948" y="470" width="12" height="8" fill={P.selection} stroke={P.outline} />
    </g>
  );
}

function ArchiveLandmark({ brickPatternId }: { brickPatternId: string }) {
  return (
    <g>
      <CastShadow x={1068} y={360} width={276} height={168} />
      <Mass x={1092} y={480} width={216} depth={48} height={96} roof={P.lightStone} south={`url(#${brickPatternId})`} east={P.outline} />

      <rect x="1116" y="450" width="168" height="78" fill={P.brick} stroke={P.outline} />
      {[1128, 1164, 1200, 1236].map((x) => (
        <g key={x}>
          <rect x={x} y="456" width="18" height="54" fill={P.glassShadow} stroke={P.outline} />
          <rect x={x + 4} y="460" width="10" height="19" fill={P.lightCore} />
          <path d={`M${x + 9} 456v54`} stroke={P.outline} />
        </g>
      ))}
      <rect x="1284" y="474" width="24" height="54" fill={P.blackDepth} stroke={P.outline} />

      <path d="M1104 384h204v-12M1104 384v-12" stroke={P.outline} />
      <rect x="1128" y="366" width="48" height="18" fill={P.foliage} stroke={P.outline} />
      <rect x="1136" y="362" width="32" height="8" fill={P.foliageLight} />
      <rect x="1212" y="370" width="48" height="8" fill={P.stoneShadow} stroke={P.outline} />
      <path d="M1224 378v12M1248 378v12" stroke={P.outline} />

      <rect x="1068" y="492" width="36" height="36" fill={P.midStone} stroke={P.outline} />
      <Tree x={1074} y={482} />
    </g>
  );
}

function CinemaLandmark({ posterClipId }: { posterClipId: string }) {
  return (
    <g>
      <CastShadow x={84} y={600} width={288} height={108} />
      <Mass x={96} y={672} width={240} depth={36} height={52} roof={P.asphalt} south={P.blackDepth} east={P.outline} />
      <rect x="132" y="646" width="192" height="10" fill={P.selection} stroke={P.outline} />

      <rect x="144" y="654" width="36" height="46" fill={P.lightCore} stroke={P.outline} />
      <image
        href="/media/cinema/Vkf4wQSLD04-map.webp"
        x="146"
        y="656"
        width="32"
        height="42"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${posterClipId})`}
        style={{ imageRendering: "auto" }}
      />
      <rect x="216" y="660" width="24" height="48" fill={P.glassShadow} stroke={P.outline} />
      <rect x="264" y="660" width="24" height="48" fill={P.glassShadow} stroke={P.outline} />
      <rect x="222" y="665" width="12" height="8" fill={P.lightCore} />
      <rect x="270" y="665" width="12" height="8" fill={P.lightCore} />
      <path d="M204 694h96" stroke={P.warmLight} strokeWidth="2" />

      <g>
        <rect x="108" y="628" width="24" height="8" fill={P.midStone} stroke={P.outline} />
        <rect x="300" y="628" width="24" height="8" fill={P.midStone} stroke={P.outline} />
        <path d="M120 628v-16M312 628v-16" stroke={P.outline} />
      </g>
    </g>
  );
}

function HarborLandmark() {
  const pierPosts = [1140, 1176, 1212, 1248];

  return (
    <g>
      <CastShadow x={1056} y={600} width={264} height={108} />
      <Mass x={1080} y={672} width={180} depth={36} height={48} roof={P.lightGlass} south={P.glass} east={P.glassShadow} />
      <path d="M1092 630h168M1116 624v48M1164 624v48M1212 624v48" stroke={P.haze} />
      <rect x="1104" y="666" width="24" height="42" fill={P.lightCore} stroke={P.outline} />
      <rect x="1200" y="666" width="24" height="42" fill={P.lightCore} stroke={P.outline} />

      <rect x="1128" y="690" width="144" height="150" fill={P.stoneShadow} stroke={P.outline} />
      <rect x="1140" y="690" width="120" height="150" fill={P.lightStone} stroke={P.outline} />
      <path d="M1152 690v150M1188 690v150M1224 690v150" stroke={P.midStone} />
      {pierPosts.map((x) => (
        <g key={x}>
          <rect x={x} y="828" width="7" height="28" fill={P.outline} />
          <rect x={x - 2} y="822" width="11" height="8" fill={P.warmLight} stroke={P.outline} />
        </g>
      ))}

      <g>
        <polygon points="1296,720 1344,720 1368,744 1368,816 1356,840 1284,840 1272,816 1272,744" fill={P.hakuWhite} stroke={P.outline} />
        <polygon points="1284,744 1356,744 1344,720 1296,720" fill={P.warmLight} stroke={P.outline} />
        <rect x="1284" y="756" width="72" height="30" fill={P.glassShadow} stroke={P.outline} />
        <rect x="1290" y="762" width="14" height="18" fill={P.lightGlass} />
        <rect x="1312" y="762" width="14" height="18" fill={P.lightGlass} />
        <rect x="1334" y="762" width="14" height="18" fill={P.lightGlass} />
        <path d="M1320 720v-24M1320 696h20" stroke={P.outline} />
        <rect x="1284" y="804" width="72" height="12" fill={P.warmLight} stroke={P.outline} />
        <rect x="1282" y="822" width="9" height="6" fill={P.lightCore} />
        <rect x="1349" y="822" width="9" height="6" fill={P.lightCore} />
      </g>
    </g>
  );
}

function SceneLabel({ place, id }: { place: CityPlace; id: CityScenePlaceId }) {
  const { x, y, width } = CITY_SCENE_PLACEMENTS[id].label;
  const selectedName = place.shortName === "CITY 01 CENTRAL" ? "CITY 01 CENTRAL" : place.shortName;

  return (
    <g className={`city-scene__label city-scene__label--${id}`} transform={`translate(${x} ${y})`}>
      <rect width={width} height="40" fill={P.blackDepth} stroke={P.outline} />
      <rect width="4" height="40" fill={P.selection} />
      <text x="12" y="13" fill={P.warmLight} className="city-scene__code">{place.code}</text>
      <text x="12" y="31" fill={P.lightStone} className="city-scene__name">{selectedName}</text>
      <path d={`M${width - 22} 14h9v11h-9`} fill="none" stroke={P.lightStone} />
    </g>
  );
}

function LandmarkArtwork({ id, brickPatternId, posterClipId }: {
  id: CityScenePlaceId;
  brickPatternId: string;
  posterClipId: string;
}) {
  switch (id) {
    case "construction": return <YardLandmark />;
    case "tripvlog": return <TripVlogLandmark />;
    case "stocka": return <StockaLandmark />;
    case "haku": return <HakuLandmark />;
    case "station": return <CentralLandmark />;
    case "strategy": return <StrategyLandmark />;
    case "library": return <g transform="translate(-96 0)"><ArchiveLandmark brickPatternId={brickPatternId} /></g>;
    case "cinema": return <g transform="translate(120 0)"><CinemaLandmark posterClipId={posterClipId} /></g>;
    case "harbor": return <g transform="translate(-96 0)"><HarborLandmark /></g>;
  }
}

function SceneLandmark({
  id,
  place,
  selected,
  onSelect,
  brickPatternId,
  posterClipId,
  preview,
}: {
  id: CityScenePlaceId;
  place: CityPlace;
  selected: boolean;
  onSelect: (id: string) => void;
  brickPatternId: string;
  posterClipId: string;
  preview: boolean;
}) {
  const bounds = CITY_SCENE_PLACEMENTS[id].bounds;

  const artwork = (
    <g aria-hidden="true">
      <LandmarkArtwork id={id} brickPatternId={brickPatternId} posterClipId={posterClipId} />
      {!preview && <SceneLabel place={place} id={id} />}
      {!preview && (
        <path
          className={`city-scene__focus${selected ? " city-scene__focus--selected" : ""}`}
          d={`M${bounds.x} ${bounds.y + 14}V${bounds.y}H${bounds.x + 14} M${bounds.x + bounds.width - 14} ${bounds.y}H${bounds.x + bounds.width}V${bounds.y + 14} M${bounds.x} ${bounds.y + bounds.height - 14}V${bounds.y + bounds.height}H${bounds.x + 14} M${bounds.x + bounds.width - 14} ${bounds.y + bounds.height}H${bounds.x + bounds.width}V${bounds.y + bounds.height - 14}`}
          fill="none"
          stroke={P.selection}
          strokeWidth="3"
          pointerEvents="none"
        />
      )}
    </g>
  );

  if (preview) return artwork;

  return (
    <a
      className="city-scene__landmark"
      href={place.path}
      aria-label={`${place.code} ${place.name}へ入る`}
      data-selected={selected ? "true" : undefined}
      onClick={() => onSelect(id)}
      onFocus={() => onSelect(id)}
      onPointerEnter={() => onSelect(id)}
    >
      <rect
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
        fill={P.lightStone}
        fillOpacity="0"
        stroke="none"
        pointerEvents="all"
      />
      {artwork}
    </a>
  );
}

function Water() {
  const frameOne = [
    [48, 744, 96], [192, 792, 72], [312, 732, 120], [456, 816, 96], [624, 756, 72],
    [744, 828, 120], [888, 744, 96], [1032, 804, 72], [1176, 756, 72], [1320, 816, 72],
  ];
  const frameTwo = frameOne.map(([x, y, width], index) => [x + (index % 2 ? 12 : 24), y + 12, width] as const);
  const frameThree = frameOne.map(([x, y, width], index) => [x - (index % 2 ? 24 : 12), y + 24, width] as const);

  return (
    <g aria-hidden="true">
      <rect x="0" y="696" width={CITY_SCENE_WIDTH} height={CITY_SCENE_HEIGHT - 696} fill={P.deepWater} />
      <rect x="0" y="720" width={CITY_SCENE_WIDTH} height={CITY_SCENE_HEIGHT - 720} fill={P.water} />
      <path d="M0 696H1440M0 704H1440" stroke={P.waterHighlight} />
      <g className="city-scene__water-frame city-scene__water-frame--one">
        {frameOne.map(([x, y, width]) => <path key={`${x}-${y}`} d={`M${x} ${y}h${width}`} stroke={P.waterHighlight} strokeWidth="3" />)}
      </g>
      <g className="city-scene__water-frame city-scene__water-frame--two">
        {frameTwo.map(([x, y, width]) => <path key={`${x}-${y}`} d={`M${x} ${y}h${width}`} stroke={P.lightGlass} strokeWidth="3" />)}
      </g>
      <g className="city-scene__water-frame city-scene__water-frame--three">
        {frameThree.map(([x, y, width]) => <path key={`${x}-${y}`} d={`M${x} ${y}h${width}`} stroke={P.waterHighlight} strokeWidth="3" />)}
      </g>
    </g>
  );
}

function Player({ preview = false }: { preview?: boolean }) {
  return (
    <g
      className="city-scene__player"
      role="img"
      aria-label="駅前に立つSHOSUKE"
      transform={`translate(${preview ? 660 : 684} ${preview ? 574 : 604}) scale(${preview ? 4 : 2})`}
    >
      <title>駅前に立つSHOSUKE</title>
      <rect x="1" y="21" width="14" height="3" fill={P.blackDepth} opacity="0.4" />
      <rect x="4" width="8" height="4" fill={P.outline} />
      <rect x="2" y="4" width="12" height="7" fill={P.brick} stroke={P.outline} />
      <rect x="4" y="5" width="2" height="2" fill={P.outline} />
      <rect x="10" y="5" width="2" height="2" fill={P.outline} />
      <rect x="3" y="11" width="10" height="8" fill={P.selection} stroke={P.outline} />
      <g className="city-scene__player-frame city-scene__player-frame--one">
        <rect y="12" width="4" height="7" fill={P.warmLight} stroke={P.outline} />
        <rect x="12" y="12" width="4" height="7" fill={P.warmLight} stroke={P.outline} />
        <rect x="4" y="19" width="3" height="5" fill={P.outline} />
        <rect x="10" y="19" width="3" height="5" fill={P.outline} />
      </g>
      <g className="city-scene__player-frame city-scene__player-frame--two">
        <rect x="1" y="13" width="4" height="7" fill={P.warmLight} stroke={P.outline} />
        <rect x="11" y="11" width="4" height="7" fill={P.warmLight} stroke={P.outline} />
        <rect x="3" y="19" width="3" height="5" fill={P.outline} />
        <rect x="11" y="19" width="3" height="5" fill={P.outline} />
      </g>
    </g>
  );
}

function CityGround({ pavingPatternId }: { pavingPatternId: string }) {
  const promenadeLamps = [432, 528, 624, 816, 912, 1008];

  return (
    <g aria-hidden="true">
      <rect width={CITY_SCENE_WIDTH} height={CITY_SCENE_HEIGHT} fill={P.sky} />
      <rect width={CITY_SCENE_WIDTH} height="696" fill={`url(#${pavingPatternId})`} />

      <rect x="0" y="288" width="1440" height="48" fill={P.asphalt} stroke={P.outline} />
      <rect x="0" y="552" width="1440" height="48" fill={P.asphalt} stroke={P.outline} />
      <rect x="384" y="0" width="48" height="648" fill={P.asphalt} stroke={P.outline} />
      <rect x="984" y="0" width="48" height="648" fill={P.asphalt} stroke={P.outline} />

      <path d="M0 312H1440M0 576H1440M408 0V648M1008 0V648" stroke={P.midStone} strokeDasharray="18 18" />
      <path d="M0 282H1440M0 342H1440M378 0V648M438 0V648M0 546H1440M0 606H1440M978 0V648M1038 0V648" stroke={P.lightStone} strokeWidth="6" />

      {[390, 402, 414, 990, 1002, 1014].map((x) => <rect key={`north-${x}`} x={x} y="276" width="6" height="72" fill={P.lightStone} />)}
      {[390, 402, 414, 990, 1002, 1014].map((x) => <rect key={`south-${x}`} x={x} y="540" width="6" height="72" fill={P.lightStone} />)}

      <rect x="0" y="624" width="1440" height="72" fill={P.lightStone} stroke={P.outline} />
      <path d="M0 648H1440M0 672H1440" stroke={P.midStone} />
      <path d="M24 636h336M444 636h516M1044 636h372" stroke={P.stoneShadow} strokeDasharray="24 12" />
      {promenadeLamps.map((x) => <PromenadeLamp key={x} x={x} />)}

      <rect x="0" y="348" width="48" height="180" fill={P.foliage} stroke={P.outline} />
      <rect x="1392" y="60" width="48" height="456" fill={P.foliage} stroke={P.outline} />
      {[12, 84, 156, 228, 300, 372, 444].map((y) => <Tree key={`east-${y}`} x={1404} y={y} />)}
      {[360, 432, 504].map((y) => <Tree key={`west-${y}`} x={12} y={y} />)}
    </g>
  );
}

export default function CityScene({ selectedId, onSelect, preview = false }: CitySceneProps) {
  const instanceId = useId().replaceAll(":", "");
  const pavingPatternId = `${instanceId}-city-paving`;
  const brickPatternId = `${instanceId}-archive-brick`;
  const posterClipId = `${instanceId}-cinema-poster`;

  return (
    <svg
      className="city-scene"
      viewBox={preview ? CITY_SCENE_VIEW_BOX : CITY_SCENE_CAMERA_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
      role={preview ? "img" : "navigation"}
      aria-labelledby={`${instanceId}-title ${instanceId}-description`}
      shapeRendering="crispEdges"
    >
      <title id={`${instanceId}-title`}>CITY 01 都市探索マップ</title>
      <desc id={`${instanceId}-description`}>
        {preview
          ? "18時42分の海辺の街を見渡す全景。各施設へのリンクは、この画像の下に一覧で並んでいます。"
          : "18時42分の海辺の街。9つの施設はそれぞれリンクになっており、キーボードでも選択できます。"}
      </desc>

      <defs>
        <pattern id={pavingPatternId} width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill={P.haze} />
          <path d="M24 0H0V24" fill="none" stroke={P.midStone} opacity="0.36" />
          <path d="M4 7h3M17 18h2" stroke={P.lightStone} />
        </pattern>
        <pattern id={brickPatternId} width="16" height="8" patternUnits="userSpaceOnUse">
          <rect width="16" height="8" fill={P.brick} />
          <path d="M0 4h16M8 0v4M4 4v4" stroke={P.outline} />
        </pattern>
        <clipPath id={posterClipId}>
          <rect x="146" y="656" width="32" height="42" />
        </clipPath>
      </defs>

      <style>{`
        .city-scene__landmark { cursor: pointer; outline: none; }
        .city-scene__focus { opacity: 0; }
        .city-scene__focus--selected { opacity: 1; }
        .city-scene__landmark:hover .city-scene__focus,
        .city-scene__landmark:focus-visible .city-scene__focus { opacity: 1; }
        .city-scene__code {
          font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: .06em;
        }
        .city-scene__name {
          font-family: "Hiragino Sans", "Yu Gothic", sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: .02em;
        }
        .city-scene__label--construction,
        .city-scene__label--haku,
        .city-scene__label--stocka { display: none; }
        .city-scene__water-frame { animation-duration: 1800ms; animation-iteration-count: infinite; animation-timing-function: steps(1, end); }
        .city-scene__water-frame--one { animation-name: city-water-one; }
        .city-scene__water-frame--two { animation-name: city-water-two; }
        .city-scene__water-frame--three { animation-name: city-water-three; }
        .city-scene__train { animation: city-train-arrival 16s steps(24, end) infinite; }
        .city-scene__player-frame--two { display: none; }
        @keyframes city-water-one { 0%, 32% { opacity: 1; } 33%, 100% { opacity: 0; } }
        @keyframes city-water-two { 0%, 32% { opacity: 0; } 33%, 65% { opacity: 1; } 66%, 100% { opacity: 0; } }
        @keyframes city-water-three { 0%, 65% { opacity: 0; } 66%, 100% { opacity: 1; } }
        @keyframes city-train-arrival {
          0%, 62% { transform: translateY(0); }
          70%, 79% { transform: translateY(-168px); }
          87%, 100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .city-scene__water-frame,
          .city-scene__train { animation: none; }
          .city-scene__water-frame--two,
          .city-scene__water-frame--three { display: none; }
        }
      `}</style>

      <CityGround pavingPatternId={pavingPatternId} />
      <Water />

      {CITY_SCENE_ORDER.map((id) => {
        const place = PLACE_BY_ID.get(id);
        if (!place) return null;

        return (
          <SceneLandmark
            key={id}
            id={id}
            place={place}
            selected={selectedId === id}
            onSelect={onSelect}
            brickPatternId={brickPatternId}
            posterClipId={posterClipId}
            preview={preview}
          />
        );
      })}

      <Player preview={preview} />
    </svg>
  );
}
