import type { CSSProperties } from "react";
import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { cityPlaces, traveler } from "@/data/city";
import { currentJourneyStop } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import CurrentLocationName from "@/features/shared/CurrentLocationName";
import SemanticText from "@/features/shared/SemanticText";
import styles from "./central.module.css";

const departureOrder = ["tripvlog", "haku", "stocka", "cinema", "library", "harbor", "construction", "strategy", "diary"];
const departures = departureOrder.map((id) => cityPlaces.find((place) => place.id === id)!);
const harbor = cityPlaces.find((place) => place.id === "harbor")!;
const facilityType: Record<CityPlace["kind"], string> = {
  station: "中央駅",
  tripvlog: "iOSアプリ",
  haku: "iOSアプリ",
  stocka: "iOSアプリ",
  library: "文章",
  cinema: "映像",
  strategy: "ビデオポッドキャスト",
  diary: "ビデオポッドキャスト",
  harbor: "旅程",
  construction: "制作一覧",
};

/**
 * Wayfinding line colors, one per real district of the city, all drawn
 * from the global palette. They band each row of the departure board the
 * way transfer-guide signs band lines by color.
 */
const districtColor: Record<string, string> = {
  "NORTH YARD": "#a75543",
  "MAKERS QUAY": "#6fa1ad",
  CENTRAL: "#f3c85e",
  "CULTURE PROMENADE": "#ed6a55",
  "HARBOR EDGE": "#5cb3bf",
};

/*
 * Platform-edge crowd: the "everyone uses this hub" layer. Deterministic
 * rect-built pixel figures only — no invented names, times or announcements.
 * One environmental motion on the whole page: a single pedestrian crossing
 * (two leg frames at the canonical 8fps walk, linear traverse), stopped
 * under prefers-reduced-motion. Feet stand on the y=56 line of the scene.
 */
type FigureProps = { x: number; coat: string };

function Adult({ x, coat }: FigureProps) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="3" y="16" width="8" height="8" fill="#102b3b" />
      <rect x="0" y="24" width="14" height="16" fill={coat} />
      <rect x="1" y="40" width="5" height="16" fill="#334a52" />
      <rect x="8" y="40" width="5" height="16" fill="#334a52" />
    </g>
  );
}

function Kid({ x, coat }: FigureProps) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="2" y="28" width="6" height="6" fill="#102b3b" />
      <rect x="0" y="34" width="10" height="10" fill={coat} />
      <rect x="1" y="44" width="3" height="12" fill="#334a52" />
      <rect x="6" y="44" width="3" height="12" fill="#334a52" />
    </g>
  );
}

function Suitcase({ x, tone }: { x: number; tone: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="3" y="37" width="6" height="3" fill="#102b3b" />
      <rect x="0" y="40" width="12" height="16" fill={tone} />
    </g>
  );
}

function Bench({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="42" width="40" height="5" fill="#334a52" />
      <rect x="3" y="47" width="4" height="9" fill="#334a52" />
      <rect x="33" y="47" width="4" height="9" fill="#334a52" />
    </g>
  );
}

function Walker() {
  return (
    <g className={styles.walker}>
      <rect x="3" y="16" width="8" height="8" fill="#102b3b" />
      <rect x="0" y="24" width="14" height="16" fill="#6fa1ad" />
      <g className={styles.strideA}>
        <rect x="0" y="40" width="5" height="16" fill="#334a52" />
        <rect x="9" y="40" width="5" height="16" fill="#334a52" />
      </g>
      <g className={styles.strideB}>
        <rect x="3" y="40" width="5" height="16" fill="#334a52" />
        <rect x="6" y="40" width="5" height="16" fill="#334a52" />
      </g>
    </g>
  );
}

function PlatformScene() {
  return (
    <svg className={styles.crowd} viewBox="0 0 1176 76" preserveAspectRatio="xMidYMax slice">
      <g fill="#f3c85e">
        {Array.from({ length: 28 }, (_, i) => (
          <rect key={i} x={i * 42} y="64" width="34" height="8" />
        ))}
      </g>
      <rect x="0" y="73" width="1176" height="3" fill="#b8bcb2" />
      <Adult x={96} coat="#6fa1ad" />
      <Adult x={118} coat="#a75543" />
      <Bench x={276} />
      <Adult x={336} coat="#3f705a" />
      <Suitcase x={356} tone="#a75543" />
      <Adult x={560} coat="#366b78" />
      <Suitcase x={580} tone="#102b3b" />
      <Adult x={744} coat="#f3c85e" />
      <Kid x={764} coat="#6fa1ad" />
      <Adult x={1010} coat="#a75543" />
      <Suitcase x={1030} tone="#3f705a" />
      <Walker />
    </svg>
  );
}

export default function Central({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#departures">施設への出発案内へ移動</a>
      <FacilityBar place={place} />

      <main>
        <section className={styles.concourse} aria-labelledby="central-title">
          <div className={styles.canopy} aria-hidden="true" />
          <div className={styles.platformMark} aria-hidden="true">
            <span>C</span><strong>01</strong><i />
          </div>

          <div className={styles.identity}>
            <p className={styles.kicker}>CITY 01 CENTRAL&nbsp;· STATION</p>
            <h1 id="central-title">
              <span>この街の、</span><wbr /><span>中央駅。</span>
            </h1>
            <p className={styles.bio}>
              <SemanticText phrases={[
                "さとう",
                "しょうすけの",
                "ポートフォリオ都市、",
                "CITY 01。",
                "作品と活動の",
                "すべての施設へ、",
                "この駅から",
                "発てます。",
              ]} />
            </p>
            <div className={styles.primaryRoutes}>
              <a href="#departures">出発案内を見る</a>
              <a href="#station-note">旅人の伝言板</a>
            </div>
          </div>

          <aside className={styles.noteBoard} id="station-note" aria-labelledby="note-title">
            <div className={styles.boardTop}>
              <span>旅人の伝言板</span><span>STATION NOTE</span>
            </div>
            <h2 id="note-title">
              <span className={styles.noteSentence}>
                <SemanticText phrases={["「世界の", "どこかに", "います。"]} />
              </span>
              <span className={styles.noteSentence}>
                <SemanticText phrases={["連絡は", "いつでも。」"]} />
              </span>
            </h2>
            <p className={styles.noteSign}>— SHOSUKE</p>
            <dl>
              <div>
                <dt>いまの現在地</dt>
                <dd><CurrentLocationName place={currentJourneyStop.place} /></dd>
              </div>
            </dl>
            <div className={styles.noteLinks}>
              <Link href={traveler.path}>
                <span>旅人SHOSUKEのプロフィール</span><PixelIcon name="enter" />
              </Link>
              <Link href={harbor.path}>
                <span>旅の航路 / ROUTE TERMINAL</span><PixelIcon name="enter" />
              </Link>
            </div>
          </aside>
          <div className={styles.platformEdge} aria-hidden="true">
            <PlatformScene />
          </div>
        </section>

        <section className={styles.departures} id="departures" aria-labelledby="departures-title">
          <header>
            <div>
              <p className={styles.departuresKicker}>DEPARTURES&nbsp;· PORTFOLIO DIRECTORY</p>
              <h2 id="departures-title">
                <SemanticText phrases={["作品と", "活動の", "出発", "案内。"]} />
              </h2>
            </div>
            <p className={styles.departuresLead}>
              <span>代表作や映像、文章、旅程を施設ごとに案内します。</span>
              <span>地図を使わず、ここから直接移動できます。</span>
            </p>
          </header>

          <nav className={styles.departureBoard} aria-label="CITY 01施設への出発案内">
            <div className={styles.boardHead} aria-hidden="true">
              <span>コード</span><span>行き先</span><span>地区</span><span>種類</span><span>入口</span>
            </div>
            <ol>
              {departures.map((destination) => (
                <li key={destination.id}>
                  <Link
                    href={destination.path}
                    style={{ "--line-color": districtColor[destination.district] } as CSSProperties}
                  >
                    <span className={styles.facilityCode}>{destination.code}</span>
                    <span className={styles.facilityName}>
                      <b>{destination.shortName}</b>
                      <span className={styles.facilitySummary}>{destination.summary}</span>
                    </span>
                    <span className={styles.facilityDistrict}><i aria-hidden="true" />{destination.district}</span>
                    <span className={styles.facilityType}>{facilityType[destination.kind]}</span>
                    <span className={styles.enter}><span>入る</span><PixelIcon name="enter" /></span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>CITY 01 CENTRAL / CITY 01</span>
        <p>すべての施設へ、この駅から。</p>
        <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
      </footer>
    </div>
  );
}
