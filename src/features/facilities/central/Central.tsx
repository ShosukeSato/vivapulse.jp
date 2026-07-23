import Image from "next/image";
import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { cityPlaces } from "@/data/city";
import {
  currentJourneyStop,
  DEPARTURE_DATE,
  featuredFilm,
  journey,
  nextJourneyStop,
  profile,
  socials,
} from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import CurrentLocationName from "@/features/shared/CurrentLocationName";
import SemanticText from "@/features/shared/SemanticText";
import styles from "./central.module.css";

const departureOrder = ["tripvlog", "haku", "stocka", "cinema", "library", "harbor", "construction", "strategy"];
const departures = departureOrder.map((id) => cityPlaces.find((place) => place.id === id)!);
const facilityType: Record<CityPlace["kind"], string> = {
  station: "案内所",
  tripvlog: "iOSアプリ",
  haku: "iOSアプリ",
  stocka: "iOSアプリ",
  library: "文章",
  cinema: "映像",
  strategy: "ビデオポッドキャスト",
  harbor: "旅程",
  construction: "制作一覧",
};

export default function Central({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#departures">施設への出発案内へ移動</a>
      <FacilityBar place={place} />

      <main>
        <section className={styles.concourse} aria-labelledby="central-title">
          <div className={styles.platformMark} aria-hidden="true">
            <span>C</span><strong>01</strong><i />
          </div>

          <div className={styles.identity}>
            <p className={styles.kicker}>CITY 01 CENTRAL&nbsp;· PROFILE</p>
            <h1 id="central-title">
              <span>さとう</span><wbr /><span>しょう</span><wbr /><span>すけ</span>
            </h1>
            <p className={styles.nameEn}>{profile.nameEn}</p>
            <p className={styles.bio}>
              <SemanticText phrases={profile.bioPhrases} />
            </p>
            <div className={styles.primaryRoutes}>
              <a href="#departures">作品と活動を見る</a>
              <a href="#current-location">現在地を見る</a>
            </div>
          </div>

          <aside className={styles.currentBoard} id="current-location" aria-labelledby="current-title">
            <div className={styles.boardTop}>
              <span>現在地</span><span>WORLD JOURNEY</span>
            </div>
            <div className={styles.locationPin}><PixelIcon name="location" /></div>
            <h2 id="current-title"><CurrentLocationName place={currentJourneyStop.place} /></h2>
            <p>世界一周の旅の途中</p>
            <dl>
              <div><dt>旅の出発</dt><dd>東京&nbsp;· {DEPARTURE_DATE.replaceAll("-", ".")}</dd></div>
              <div><dt>次の目的地</dt><dd>{nextJourneyStop.place}</dd></div>
            </dl>
          </aside>
        </section>

        <section className={styles.departures} id="departures" aria-labelledby="departures-title">
          <header>
            <div>
              <p>DEPARTURES&nbsp;· PORTFOLIO DIRECTORY</p>
              <h2 id="departures-title">
                <SemanticText phrases={["作品と", "活動の", "出発", "案内。"]} />
              </h2>
            </div>
            <p>代表作や映像、文章、旅程を施設ごとに案内します。地図を使わず、ここから直接移動できます。</p>
          </header>

          <nav className={styles.departureBoard} aria-label="CITY 01施設への出発案内">
            <div className={styles.boardHead} aria-hidden="true">
              <span>施設</span><span>見られるもの</span><span>種類</span><span>状態</span><span>入口</span>
            </div>
            <ol>
              {departures.map((destination) => (
                <li key={destination.id}>
                  <Link href={destination.path}>
                    <span className={styles.facilityName}><b>{destination.shortName}</b><small>{destination.code}</small></span>
                    <span className={styles.facilitySummary}>{destination.summary}</span>
                    <span className={styles.facilityType}>{facilityType[destination.kind]}</span>
                    <span className={`${styles.facilityStatus} ${styles[destination.status]}`}>
                      {destination.status === "building" ? "準備中" : destination.status === "live" ? "現在地" : "公開中"}
                    </span>
                    <span className={styles.enter}><span>入る</span><PixelIcon name="enter" /></span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        <section className={styles.travelRecord} aria-labelledby="record-title">
          <div className={styles.recordCopy}>
            <p>WHY THIS CITY EXISTS</p>
            <h2 id="record-title">
              <SemanticText phrases={["つくる", "ことと", "旅する", "ことを、", "ひとつの", "街に。"]} />
            </h2>
            <p>
              <SemanticText phrases={[
                "旅の途中で",
                "必要になった",
                "ものを",
                "アプリにする。",
                "出会った景色を",
                "映像にして、",
                "考えたことを",
                "文章にする。",
                "CITY 01は、",
                "それらを",
                "別々の実績",
                "ではなく、",
                "いまも続く",
                "一つの活動として",
                "案内する街です。",
              ]} />
            </p>
            <dl className={styles.shortJourney}>
              {journey.slice(0, 4).map((stop) => (
                <div key={stop.place}>
                  <dt>{stop.period}</dt><dd>{stop.place}{stop.status === "now" && <b>現在地</b>}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            className={styles.recordStill}
            href={`https://www.youtube.com/watch?v=${featuredFilm.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={`/media/cinema/${featuredFilm.id}.jpg`}
              alt=""
              width={480}
              height={360}
            />
            <span className={styles.play}><PixelIcon name="play" /></span>
            <span className={styles.stillCaption}>
              <small>旅先の記録&nbsp;· YouTubeサムネイル</small>
              <strong><SemanticText phrases={featuredFilm.displayTitleLines ?? [featuredFilm.title]} /></strong>
            </span>
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><span>CONTACT &amp; LINKS</span><p>制作、旅、文章の続きを、それぞれの場所で公開しています。</p></div>
        <nav aria-label="連絡先とリンク">
          <a href="mailto:shosuke240557@gmail.com">メールを送る</a>
          {socials.map((social) => (
            <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>
              {social.label}<PixelIcon name="external" />
            </a>
          ))}
          <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
        </nav>
      </footer>
    </div>
  );
}
