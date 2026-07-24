import styles from "./port.module.css";

/**
 * One pixel landscape per port, so a page is recognisable in a tenth of a
 * second with every word removed. Rects and straight-sided polygons on
 * integer coordinates only — the same construction rules as the city map,
 * never a photographic pastiche. Masses are kept large because the band is
 * only 168px tall on a phone; fine detail would disappear.
 *
 * A scene may only show a place actually stayed in:
 *   tokyo      the bay-side high-rise city he departed from. The specific
 *              city, not "Japan" — towers, an elevated line and a lattice
 *              tower; no Fuji, no torii, no blossom.
 *   indonesia  Bromo at dawn, which he really climbed (film IgQsSdzRiQc):
 *              a broad truncated cone standing in its caldera, never a
 *              symmetrical Fuji-shaped peak.
 *   sri-lanka  the hill country he is moving through: tea terraces and the
 *              viaduct the mountain line runs on.
 */

const VIEW = { w: 1200, h: 320 } as const;

/** Deterministic lit-window grid — identical on server and client. */
function windows(x: number, y: number, w: number, h: number, seed: number) {
  const cells: { x: number; y: number }[] = [];
  for (let cx = x + 7; cx < x + w - 9; cx += 15) {
    for (let cy = y + 10; cy < y + h - 8; cy += 17) {
      if ((cx * 7 + cy * 13 + seed * 31) % 5 < 3) cells.push({ x: cx, y: cy });
    }
  }
  return cells;
}

/* ─── Tokyo ─── */

const TOKYO_BASE = 260;
/** x, width, height of each waterfront tower. */
const TOKYO_TOWERS: [number, number, number][] = [
  [-10, 96, 108], [86, 64, 168], [150, 104, 84], [254, 72, 196], [326, 110, 126],
  [436, 68, 100], [504, 92, 172], [664, 78, 214], [742, 106, 138], [848, 70, 182],
  [918, 118, 100], [1036, 80, 158], [1116, 104, 122],
];
const TOKYO_FAR: [number, number, number][] = [
  [40, 130, 150], [200, 110, 190], [380, 150, 132], [560, 120, 208],
  [720, 140, 160], [900, 130, 198], [1060, 140, 146],
];

function Tokyo() {
  return (
    <g>
      <rect className={styles.vSky} x="0" y="0" width={VIEW.w} height={TOKYO_BASE} />
      <rect className={styles.vSkyBand} x="0" y={TOKYO_BASE - 96} width={VIEW.w} height="96" />

      {TOKYO_FAR.map(([x, w, h]) => (
        <rect className={styles.vFar} key={`f${x}`} x={x} y={TOKYO_BASE - h} width={w} height={h} />
      ))}

      {/* The lattice tower the skyline is read by. */}
      <g className={styles.vTower}>
        <polygon points="566,26 594,26 630,260 530,260" />
        <rect x="574" y="0" width="12" height="30" />
        <rect className={styles.vTowerDeck} x="546" y="150" width="68" height="18" />
        <rect x="552" y="112" width="56" height="6" />
        <rect x="538" y="200" width="84" height="6" />
      </g>

      {TOKYO_TOWERS.map(([x, w, h], i) => (
        <g key={x}>
          <rect className={styles.vBlock} x={x} y={TOKYO_BASE - h} width={w} height={h} />
          {windows(x, TOKYO_BASE - h, w, h, i).map((c) => (
            <rect className={styles.vLit} key={`${c.x}-${c.y}`} x={c.x} y={c.y} width="5" height="7" />
          ))}
        </g>
      ))}

      {/* Elevated line across the waterfront, one lit train on it. */}
      {[30, 150, 270, 630, 750, 870, 990, 1110].map((x) => (
        <rect className={styles.vRail} key={`p${x}`} x={x} y={248} width="14" height="26" />
      ))}
      <rect className={styles.vRail} x="0" y="240" width={VIEW.w} height="10" />
      <g>
        <rect className={styles.vTrain} x="384" y="212" width="212" height="28" />
        {[396, 424, 452, 480, 508, 536, 564].map((x) => (
          <rect className={styles.vLit} key={x} x={x} y="219" width="16" height="12" />
        ))}
      </g>

      <rect className={styles.vWater} x="0" y="274" width={VIEW.w} height={VIEW.h - 274} />
      {[282, 298, 312].map((y) => (
        <rect className={styles.vWave} key={y} x="0" y={y} width={VIEW.w} height="3" />
      ))}
      {[110, 268, 420, 578, 726, 884, 1042].map((x, i) => (
        <rect className={styles.vLit} key={x} x={x} y={280 + (i % 3) * 14} width="7" height="5" />
      ))}
    </g>
  );
}

/* ─── Indonesia ─── */

const BROMO_BASE = 250;

function Indonesia() {
  return (
    <g>
      <rect className={styles.vSky} x="0" y="0" width={VIEW.w} height="104" />
      <rect className={styles.vSkyBand} x="0" y="104" width={VIEW.w} height="58" />
      <rect className={styles.vSkyLow} x="0" y="162" width={VIEW.w} height={BROMO_BASE - 162} />

      {/* Caldera rim standing behind the cone. */}
      <polygon
        className={styles.vFar}
        points={`0,214 120,168 250,206 372,160 520,200 660,166 812,204 940,162 1080,202 1200,170 1200,${BROMO_BASE} 0,${BROMO_BASE}`}
      />

      {/* Bromo: broad, low, flat-topped — a caldera cone, not a peak. */}
      <polygon className={styles.vBlock} points={`286,${BROMO_BASE} 528,138 668,138 914,${BROMO_BASE}`} />
      <rect className={styles.vCrater} x="528" y="138" width="140" height="16" />
      {/* The plume stays clear of the top edge so a wide crop never beheads it. */}
      <g className={styles.vPlume}>
        <rect x="540" y="112" width="116" height="26" />
        <rect x="520" y="88" width="146" height="24" />
        <rect x="546" y="64" width="168" height="24" />
        <rect x="596" y="42" width="184" height="22" />
        <rect x="668" y="24" width="176" height="18" />
      </g>

      {/* Sea of sand, then the terraced slopes below the rim. */}
      <rect className={styles.vGround} x="0" y={BROMO_BASE} width={VIEW.w} height={VIEW.h - BROMO_BASE} />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect className={styles.vFurrow} x="0" y={BROMO_BASE + 14 + row * 18} width={VIEW.w} height="4" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              className={styles.vCrop}
              key={i}
              x={40 + i * 150 + row * 36}
              y={BROMO_BASE + 5 + row * 18}
              width="52"
              height="8"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

/* ─── Sri Lanka ─── */

const DECK = 206;

function SriLanka() {
  return (
    <g>
      <rect className={styles.vSky} x="0" y="0" width={VIEW.w} height="128" />
      <rect className={styles.vSkyBand} x="0" y="128" width={VIEW.w} height="44" />

      {/* Two ranges of hills, the near one terraced with contour lines. */}
      <polygon className={styles.vFar} points="0,172 160,106 330,158 500,98 690,156 850,112 1030,160 1200,110 1200,250 0,250" />
      <polygon className={styles.vMid} points="0,214 150,166 320,206 480,154 650,202 820,160 990,206 1140,168 1200,186 1200,286 0,286" />
      {[224, 242, 260].map((y) => (
        <rect className={styles.vTerrace} key={y} x="0" y={y} width={VIEW.w} height="4" />
      ))}

      {/* The mountain line on its viaduct, with a train crossing. */}
      <g className={styles.vRail}>
        {[168, 268, 368, 468, 568, 668, 768, 868].map((x) => (
          <rect key={x} x={x} y={DECK + 12} width="24" height="62" />
        ))}
        <rect x="120" y={DECK} width="812" height="12" />
      </g>
      <g>
        <rect className={styles.vTrain} x="300" y={DECK - 30} width="232" height="30" />
        {[312, 342, 372, 402, 432, 462, 492].map((x) => (
          <rect className={styles.vLit} key={x} x={x} y={DECK - 23} width="18" height="14" />
        ))}
      </g>

      {/* Tea in the foreground: clipped bushes in staggered rows. */}
      <rect className={styles.vGround} x="0" y="278" width={VIEW.w} height={VIEW.h - 278} />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {Array.from({ length: 13 }, (_, i) => (
            <rect
              className={styles.vCrop}
              key={i}
              x={-30 + i * 98 + row * 32}
              y={282 + row * 14}
              width="58"
              height="10"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

const SCENES = { tokyo: Tokyo, indonesia: Indonesia, "sri-lanka": SriLanka } as const;

const SCENE_LABELS: Record<string, string> = {
  tokyo: "夜の東京湾岸。高層ビル群と高架を走る電車、鉄塔の稜線。",
  indonesia: "夜明けのブローモ山。噴煙と、カルデラの砂の海。",
  "sri-lanka": "スリランカの丘陵地帯。茶畑の段々と、高架を渡る山岳鉄道。",
};

export default function PortVignette({ slug }: { slug: string }) {
  const Scene = SCENES[slug as keyof typeof SCENES];
  if (!Scene) return null;

  return (
    <div className={styles.vignette}>
      <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-label={SCENE_LABELS[slug]} preserveAspectRatio="xMidYMid slice">
        <Scene />
      </svg>
    </div>
  );
}
