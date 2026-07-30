import Image from "next/image";
import Link from "next/link";
import DayCounter from "@/components/DayCounter";
import {
  articles,
  DEPARTURE_DATE,
  films,
  filmStill,
  journey,
  portByPlace,
  type Port as PortData,
} from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import SemanticText from "@/features/shared/SemanticText";
import shell from "../facilities/facility-shell.module.css";
import PortVignette from "./PortVignette";
import styles from "./port.module.css";

const ROUTE_TERMINAL_PATH = "/places/route-terminal";
const filmById = new Map(films.map((film) => [film.id, film]));
const articleByHref = new Map(articles.map((article) => [article.href, article]));

const roleLabel = { home: { en: "HOME PORT", ja: "母港" }, call: { en: "PORT OF CALL", ja: "寄港地" } } as const;

/**
 * 寄港地(PORT OF CALL) — the world outside CITY 01, reached by ship from
 * ROUTE TERMINAL. One shared harbor-ledger format for every port; the
 * country-ness comes from the real films and articles made there, plus at
 * most two accent colors set later by the art director via
 * --port-accent-1/-2 (the base palette works without them). Tokyo, the home
 * port, keeps the city's own stone-and-lamp colors: the city is painted in
 * the colors of the place the traveler left.
 */
export default function Port({ port }: { port: PortData }) {
  const stopIndex = journey.findIndex((stop) => stop.place === port.place);
  const stop = journey[stopIndex];
  const number = String(stopIndex + 1).padStart(2, "0");
  const isLive = stop.status === "now";
  const stateWord = isLive ? "現在停泊中" : port.role === "home" ? "出発地" : "滞在済み";

  const featuredFilm = port.featuredFilmId ? filmById.get(port.featuredFilmId) : undefined;
  const catalogue = films.filter(
    (film) => port.placeAliases.includes(film.place) && film.id !== port.featuredFilmId,
  );
  const portArticles = port.articleHrefs
    .map((href) => articleByHref.get(href))
    .filter((article) => article !== undefined);
  const hasRecords = Boolean(featuredFilm) || catalogue.length > 0 || portArticles.length > 0;

  const prevStop = stopIndex > 0 ? journey[stopIndex - 1] : undefined;
  const nextStop = stopIndex < journey.length - 1 ? journey[stopIndex + 1] : undefined;
  const prevPort = prevStop ? portByPlace.get(prevStop.place) : undefined;
  const nextPort = nextStop ? portByPlace.get(nextStop.place) : undefined;

  return (
    <div className={styles.page} data-port={port.slug}>
      <div className={styles.arrival} aria-hidden="true" />
      <a className={styles.skip} href="#records">滞在の記録へ移動</a>

      <header className={shell.bar}>
        <Link className={shell.back} href={ROUTE_TERMINAL_PATH} aria-label="ROUTE TERMINALへ帰港">
          <PixelIcon name="map" /><span>ターミナルへ帰港</span>
        </Link>
        <Link className={shell.cityMark} href="/" aria-label="CITY 01 ホーム">
          <i aria-hidden="true"><b /><b /><b /><b /></i>
          <strong>CITY 01</strong>
        </Link>
        <div className={shell.locator}>
          <span>{roleLabel[port.role].ja} {number}</span><b>{port.nameEn}</b>
        </div>
      </header>

      <main>
        <PortVignette slug={port.slug} />

        <header className={styles.portHead}>
          <div className={styles.portIntro}>
            <p className={styles.kicker}>PORT {number}&nbsp;· {roleLabel[port.role].en} / {roleLabel[port.role].ja}</p>
            <h1><span>{stop.place}</span></h1>
            <p className={styles.portNameEn}>{port.nameEn}</p>
            {stop.note && (
              <p className={styles.stayNote}>
                <SemanticText phrases={stop.notePhrases ?? [stop.note]} />
              </p>
            )}
          </div>

          <aside className={`${styles.stayBoard}${isLive ? ` ${styles.liveBoard}` : ""}`}>
            <p>{isLive ? "PORT SIGNAL · LIVE" : "PORT RECORD"}</p>
            <dl>
              <div><dt>滞在期間</dt><dd>{isLive ? `${stop.period} —` : stop.period}</dd></div>
              {port.role === "home" && (
                <div><dt>出発日</dt><dd>{DEPARTURE_DATE.replaceAll("-", ".")}</dd></div>
              )}
              {isLive && (
                <div><dt>JOURNEY DAY</dt><dd><DayCounter /></dd></div>
              )}
              <div><dt>状態</dt><dd><b className={styles.stateChip}>{stateWord}</b></dd></div>
            </dl>
          </aside>

          <div className={styles.quayEdge} aria-hidden="true">
            <span /><span /><span />
            <b>{port.nameEn} / {roleLabel[port.role].en}</b>
          </div>
        </header>

        <section className={styles.records} id="records" aria-labelledby="records-title">
          <header>
            <p>RECORDS MADE HERE</p>
            <h2 id="records-title">
              <SemanticText phrases={["この土地で", "つくった記録。"]} />
            </h2>
          </header>

          {featuredFilm && (
            <a
              className={styles.featured}
              href={`https://www.youtube.com/watch?v=${featuredFilm.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.featuredImage}>
                <Image src={filmStill(featuredFilm.id, 960)} alt="" width={960} height={540} />
                <i><PixelIcon name="play" /></i>
              </span>
              <span className={styles.featuredCopy}>
                <small>FILM · {featuredFilm.date} · {featuredFilm.duration}</small>
                <strong><SemanticText phrases={featuredFilm.displayTitleLines ?? [featuredFilm.title]} /></strong>
              </span>
            </a>
          )}

          {catalogue.length > 0 && (
            <ul className={styles.filmGrid} aria-label={`${stop.place}で撮った映像`}>
              {catalogue.map((film) => (
                <li key={film.id}>
                  <a href={`https://www.youtube.com/watch?v=${film.id}`} target="_blank" rel="noreferrer">
                    <span className={styles.filmThumb}>
                      <Image src={filmStill(film.id, 640)} alt="" width={640} height={360} loading="lazy" />
                    </span>
                    <small>{film.date} · {film.duration}</small>
                    <strong>{film.title}</strong>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {portArticles.length > 0 && (
            <ul className={styles.articleList} aria-label={`${stop.place}で書いた文章`}>
              {portArticles.map((article) => (
                <li key={article.href}>
                  <a href={article.href} target="_blank" rel="noreferrer">
                    <small>NOTE · {article.date}</small>
                    <strong>{article.title}</strong>
                    <PixelIcon name="external" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {!hasRecords && (
            <div className={styles.openLog}>
              <p>
                <SemanticText phrases={[
                  "いま、",
                  "この港に",
                  "停泊中。",
                  "この土地の記録は、",
                  "滞在のあとに",
                  "増えていく。",
                ]} />
              </p>
              <Link href="/places/voyage-cinema">
                旅の映像はVOYAGE CINEMAで公開されていく <PixelIcon name="enter" />
              </Link>
            </div>
          )}
        </section>

        <nav className={styles.routeNav} aria-label="航路の前後の寄港地">
          {prevStop && (
            prevPort ? (
              <Link className={styles.navPrev} href={`/ports/${prevPort.slug}`}>
                <small>まえの港</small>
                <strong>{prevStop.place}</strong>
              </Link>
            ) : (
              <span className={styles.navPrev}>
                <small>まえの港</small>
                <strong>{prevStop.place}</strong>
              </span>
            )
          )}
          <Link className={styles.navTerminal} href={ROUTE_TERMINAL_PATH}>
            <small>ROUTE TERMINAL</small>
            <strong>ターミナルへ帰港</strong>
          </Link>
          {nextStop && (
            nextPort ? (
              <Link className={styles.navNext} href={`/ports/${nextPort.slug}`}>
                <small>つぎの港</small>
                <strong>{nextStop.place}</strong>
              </Link>
            ) : (
              <span className={`${styles.navNext} ${styles.navClosed}`}>
                <small>つぎの港</small>
                <strong>{nextStop.place}<b>未寄港</b></strong>
              </span>
            )
          )}
        </nav>
      </main>

      <footer className={styles.footer}>
        <span>PORT {number} {port.nameEn} / CITY 01</span>
        <p>ROUTE TERMINALから船で渡る、街の外の記録。</p>
        <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
      </footer>
    </div>
  );
}
