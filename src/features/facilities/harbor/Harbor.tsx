import Link from "next/link";
import DayCounter from "@/components/DayCounter";
import type { CityPlace } from "@/data/city";
import { traveler } from "@/data/city";
import {
  currentJourneyStop,
  DEPARTURE_DATE,
  journey,
  nextJourneyStop,
  portByPlace,
  type Stop,
} from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import SemanticText from "@/features/shared/SemanticText";
import styles from "./harbor.module.css";

/**
 * ROUTE LINE DIAGRAM — Beck-style harbor-sign route diagram.
 * All geometry is computed deterministically from the journey index on a
 * 12-unit grid (half of the 24px base tile). Horizontal, vertical and
 * 45-degree segments only. Adding a stop in content.ts is the only edit
 * ever required; rows and heights derive from journey.length.
 */
const STOPS_PER_ROW = 5;
const WIDE = { colStart: 108, colEnd: 1068, colGap: 240, rowStart: 96, rowGap: 192 } as const;
const TALL = { lineX: 60, rowStart: 72, rowGap: 120 } as const;

type DiagramStop = { stop: Stop; x: number; y: number };

const wideStops: DiagramStop[] = journey.map((stop, index) => {
  const row = Math.floor(index / STOPS_PER_ROW);
  const col = index % STOPS_PER_ROW;

  return {
    stop,
    x: row % 2 === 0 ? WIDE.colStart + col * WIDE.colGap : WIDE.colEnd - col * WIDE.colGap,
    y: WIDE.rowStart + row * WIDE.rowGap,
  };
});

const wideHeight = WIDE.rowStart + (Math.ceil(journey.length / STOPS_PER_ROW) - 1) * WIDE.rowGap + 108;

const tallStops: DiagramStop[] = journey.map((stop, index) => ({
  stop,
  x: TALL.lineX,
  y: TALL.rowStart + index * TALL.rowGap,
}));

const tallHeight = TALL.rowStart * 2 + (journey.length - 1) * TALL.rowGap;

/** A segment takes the style of its destination stop. */
const segmentStyle = { done: "routeDone", now: "routeDone", next: "routeNext", planned: "routePlanned" } as const;

const doneStops = journey.filter((stop) => stop.status === "done");
const upcomingStops = journey.filter((stop) => stop.status === "next" || stop.status === "planned");
const diagramLabel = `${doneStops.map((stop) => stop.place).join("、")}を経て、現在${currentJourneyStop.place}に滞在し、この先${upcomingStops.map((stop) => stop.place).join("、")}へ向かう世界一周航路の系統図`;

function wideSegmentPoints(from: DiagramStop, to: DiagramStop, fromIndex: number) {
  if (from.y === to.y) return `${from.x},${from.y} ${to.x},${to.y}`;

  /* End-of-row turnaround: horizontal → 45° → vertical → 45° → horizontal. */
  const rightward = Math.floor(fromIndex / STOPS_PER_ROW) % 2 === 0;

  return rightward
    ? `${from.x},${from.y} 1104,${from.y} 1140,${from.y + 36} 1140,${from.y + 156} 1104,${to.y} ${to.x},${to.y}`
    : `${from.x},${from.y} 72,${from.y} 36,${from.y + 36} 36,${from.y + 156} 72,${to.y} ${to.x},${to.y}`;
}

/** White/yellow pixel ferry, rects only. Origin: bottom-center of the hull. */
function Ferry({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={styles.ferryHull} x="-18" y="-13" width="36" height="10" />
      <rect className={styles.ferryCabin} x="-10" y="-21" width="20" height="8" />
      <rect className={styles.ferryBand} x="-8" y="-19" width="16" height="4" />
      <rect className={styles.ferryWaterline} x="-18" y="-3" width="36" height="3" />
    </g>
  );
}

function Station({ x, y, status }: { x: number; y: number; status: Stop["status"] }) {
  const size = status === "now" ? 22 : status === "planned" ? 12 : 16;

  return (
    <g className={`${styles.station} ${styles[status]}`}>
      {status === "now" && <rect className={styles.nowHalo} x={x - 17} y={y - 17} width="34" height="34" />}
      <rect x={x - size / 2} y={y - size / 2} width={size} height={size} />
      <circle cx={x} cy={y} r="3" />
    </g>
  );
}

/** The one 16×16 enter glyph from the city icon family, placed inside the diagram. */
function EnterGlyph({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <svg className={styles.enterGlyph} x={x} y={y} width={size} height={size} viewBox="0 0 16 16">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M2 8h10M8 4l4 4-4 4" />
        <path d="M14 2v12" />
      </g>
    </svg>
  );
}

/** Accessible name for one diagram port link. */
function stopLinkLabel(stop: Stop) {
  return `${stop.place}の寄港地記録(${stop.period} ${stop.status === "now" ? "滞在中" : "滞在"})をひらく`;
}

function RouteDiagram() {
  return (
    <div className={styles.maps}>
      <svg className={styles.diagramWide} viewBox={`0 0 1176 ${wideHeight}`} role="group" aria-label={diagramLabel}>
        <title>世界一周航路の系統図</title>
        <g aria-hidden="true">
          {wideStops.slice(0, -1).map((from, index) => {
            const to = wideStops[index + 1];

            return (
              <polyline
                className={styles[segmentStyle[to.stop.status]]}
                key={`${from.stop.place}-${to.stop.place}`}
                points={wideSegmentPoints(from, to, index)}
              />
            );
          })}
          {wideStops.map(({ stop, x, y }) => (
            <Station key={stop.place} status={stop.status} x={x} y={y} />
          ))}
          {wideStops.map(({ stop, x, y }) => {
            const isNow = stop.status === "now";
            const isPort = portByPlace.has(stop.place);

            return (
              <g key={stop.place}>
                <text className={styles.periodLabel} textAnchor="middle" x={x} y={isNow ? y - 72 : y - 24}>{stop.period}</text>
                <text
                  className={`${styles.nameLabel}${isPort ? ` ${styles.nameLinked}` : ""}`}
                  textAnchor="middle"
                  x={x}
                  y={y + 44}
                >
                  {stop.place}
                </text>
                {isPort && <EnterGlyph size={18} x={x + (stop.place.length * 20) / 2 + 8} y={y + 29} />}
                {isNow && (
                  <g className={styles.nowChip}>
                    <rect x={x - 44} y={y + 58} width="88" height="30" />
                    <text textAnchor="middle" x={x} y={y + 79}>現在地</text>
                  </g>
                )}
                {isNow && <Ferry x={x} y={y - 40} />}
              </g>
            );
          })}
        </g>
        <g>
          {wideStops.map(({ stop, x, y }) => {
            const port = portByPlace.get(stop.place);
            if (!port) return null;

            return (
              <a
                className={styles.stopLink}
                key={stop.place}
                href={`/ports/${port.slug}`}
                aria-label={stopLinkLabel(stop)}
              >
                <rect className={styles.stopHit} x={x - 44} y={y - 48} width="88" height="120" />
                <rect className={styles.stopFocus} x={x - 30} y={y - 30} width="60" height="60" />
              </a>
            );
          })}
        </g>
      </svg>
      <svg className={styles.diagramTall} viewBox={`0 0 360 ${tallHeight}`} role="group" aria-label={diagramLabel}>
        <title>世界一周航路の系統図</title>
        <g aria-hidden="true">
          {tallStops.slice(0, -1).map((from, index) => {
            const to = tallStops[index + 1];

            return (
              <polyline
                className={styles[segmentStyle[to.stop.status]]}
                key={`${from.stop.place}-${to.stop.place}`}
                points={`${TALL.lineX},${from.y} ${TALL.lineX},${to.y}`}
              />
            );
          })}
          {tallStops.map(({ stop, x, y }) => (
            <Station key={stop.place} status={stop.status} x={x} y={y} />
          ))}
          {tallStops.map(({ stop, y }) => {
            const isNow = stop.status === "now";
            const isPort = portByPlace.has(stop.place);

            return (
              <g key={stop.place}>
                <text className={styles.periodLabel} textAnchor="start" x="96" y={y - 14}>{stop.period}</text>
                <text
                  className={`${styles.nameLabel}${isPort ? ` ${styles.nameLinked}` : ""}`}
                  textAnchor="start"
                  x="96"
                  y={y + 8}
                >
                  {stop.place}
                </text>
                {isPort && <EnterGlyph size={16} x={96 + stop.place.length * 17 + 8} y={y - 5} />}
                {isNow && (
                  <g className={styles.nowChip}>
                    <rect x="96" y={y + 20} width="72" height="26" />
                    <text textAnchor="middle" x="132" y={y + 38}>現在地</text>
                  </g>
                )}
                {isNow && <Ferry x={22} y={y + 11} />}
              </g>
            );
          })}
        </g>
        <g>
          {tallStops.map(({ stop, x, y }) => {
            const port = portByPlace.get(stop.place);
            if (!port) return null;

            return (
              <a
                className={styles.stopLink}
                key={stop.place}
                href={`/ports/${port.slug}`}
                aria-label={stopLinkLabel(stop)}
              >
                <rect className={styles.stopHit} x="8" y={y - 30} width="312" height="76" />
                <rect className={styles.stopFocus} x={x - 26} y={y - 26} width="52" height="52" />
              </a>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

/** 寄港索引の状態語。最初の停泊地だけは出発地として読む。 */
function indexState(stop: Stop, index: number) {
  if (index === 0) return "出発地";
  if (stop.status === "now") return "現在停泊中";
  if (stop.status === "done") return "滞在済み";
  if (stop.status === "next") return "次の目的地";
  return "旅程";
}

export default function Harbor({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#route-map">現在の航路へ移動</a>
      <FacilityBar place={place} />

      <main>
        <header className={styles.harborHead}>
          <div className={styles.departureIntro}>
            <p>DEPARTURE QUAY · TOKYO</p>
            <h1>
              <span className={styles.titleLine}>
                <span>東京を</span><wbr /><span>発ち、</span><wbr /><span>世界へ。</span>
              </span>
              <span className={styles.titleLine}>
                <span>旅の</span><wbr /><span>航路を</span><wbr /><span>ひらく港。</span>
              </span>
            </h1>
            <p className={styles.departureNote}>
              <SemanticText phrases={["二〇二六年", "五月二三日、", "東京から", "世界一周へ。"]} />
            </p>
          </div>
          <div className={styles.routeBoard}>
            <p>ROUTE SIGNAL · LIVE · JOURNEY DAY <DayCounter /></p>
            <ol aria-label="旅の出発地、現在地、次の目的地">
              <li>
                <span>DEPARTURE</span>
                <strong>東京</strong>
                <small>{DEPARTURE_DATE.replaceAll("-", ".")}</small>
              </li>
              <li className={styles.currentSignal}>
                <span>CURRENT</span>
                <strong>{currentJourneyStop.place}</strong>
                <small>世界一周の旅の途中</small>
              </li>
              <li>
                <span>NEXT</span>
                <strong>{nextJourneyStop.place}</strong>
                <small>次の目的地</small>
              </li>
            </ol>
          </div>
          <div className={styles.quayEdge} aria-hidden="true">
            <span /><span /><span />
            <b>TOKYO / DEPARTURE LINE</b>
          </div>
        </header>

        <section className={styles.chartRoom} id="route-map" aria-labelledby="chart-title">
          <header>
            <div>
              <p>ROUTE CHART · 2026.05—</p>
              <h2 id="chart-title">
                <SemanticText phrases={["世界一周、", "現在の航路。"]} />
              </h2>
            </div>
            <ul className={styles.legend} aria-label="航路の凡例">
              <li><i className={styles.portMark} />寄港済み(開ける)</li>
              <li><i className={styles.doneMark} />移動済み</li>
              <li><i className={styles.nowMark} />現在地</li>
              <li><i className={styles.nextMark} />次の目的地</li>
              <li><i className={styles.planMark} />この先の予定</li>
            </ul>
          </header>
          <RouteDiagram />
        </section>

        <section className={styles.portIndex} aria-labelledby="port-index-title">
          <header>
            <p>PORTS OF CALL</p>
            <h2 id="port-index-title">寄港索引</h2>
          </header>
          <ol>
            {journey.map((stop, index) => {
              const port = portByPlace.get(stop.place);

              return (
                <li className={styles[stop.status]} key={`${stop.place}-${stop.period}`}>
                  <span className={styles.stopNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <time>{stop.period}</time>
                  <strong>{stop.place}</strong>
                  <span className={styles.state}>{indexState(stop, index)}</span>
                  {port ? (
                    <Link className={styles.indexEnter} href={`/ports/${port.slug}`}>
                      寄港記録 <PixelIcon name="enter" />
                    </Link>
                  ) : (
                    <span className={styles.notYet}>未寄港</span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>ROUTE TERMINAL / CITY 01</span>
        <p>東京から始まった、旅の航路と記録。</p>
        <Link href={traveler.path}>この旅をしている人 — 旅人SHOSUKEのプロフィール <PixelIcon name="enter" /></Link>
        <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
      </footer>
    </div>
  );
}
