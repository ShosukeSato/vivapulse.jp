import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { channelUrl, featuredFilm, films, filmStill, smallStillFilmIds } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import ProtectedText from "@/features/shared/ProtectedText";
import FacilityBar from "../FacilityBar";
import CinemaProgrammeLoader from "./CinemaProgrammeLoader";
import styles from "./cinema.module.css";

const availableFilms = films;
const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

function cinemaStillSrc(id: string) {
  return filmStill(id, 1280);
}

function cinemaStillSrcSet(id: string) {
  if (smallStillFilmIds.has(id)) return `/media/cinema/${id}-640.webp 640w`;

  const widths = id === "Vkf4wQSLD04" ? [640, 832, 960, 1280] : [640, 960, 1280];

  return widths
    .map((width) => `/media/cinema/${id}-${width}.webp ${width}w`)
    .join(", ");
}

export default function Cinema({ place }: { place: CityPlace }) {
  const feature = featuredFilm;
  const programme = availableFilms.filter((film) => film.id !== featuredFilm.id);

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#programme">上映作品一覧へ</a>
      <FacilityBar place={place} inverse />

      <main>
        <section className={styles.nowShowing} aria-labelledby="cinema-title">
          <a
            className={styles.featureScreen}
            href={`https://www.youtube.com/watch?v=${feature.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cinemaStillSrc(feature.id)}
              srcSet={cinemaStillSrcSet(feature.id)}
              sizes="(max-width: 980px) 100vw, 58vw"
              alt={feature.title}
              width="1280"
              height="720"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <span className={styles.featureShade} />
            <span className={styles.play}><PixelIcon name="play" /></span>
            <span className={styles.screenMeta}>{feature.place} · {feature.date} · {feature.duration}</span>
          </a>

          <div className={styles.featureCopy}>
            <span className={styles.eyebrow}>SCREEN 01 · NOW SHOWING</span>
            <p className={styles.facilityName}>VOYAGE CINEMA</p>
            <h1 id="cinema-title" aria-label={feature.title}>
              {(feature.displayTitleLines ?? [feature.title]).map((line) => <span aria-hidden="true" key={line}>{line}</span>)}
            </h1>
            <p className={styles.featureLead}>
              <span>世界一周の</span><wbr />
              <span>途中で</span><wbr />
              <span>出会った</span><wbr />
              <span>景色と人を、</span><wbr />
              <span>一本ずつ</span><wbr />
              <span>上映しています。</span>
            </p>
            <a className={styles.watchButton} href={`https://www.youtube.com/watch?v=${feature.id}`} target="_blank" rel="noreferrer">
              <span>本編を観る</span><PixelIcon name="play" />
            </a>
          </div>
        </section>

        <section className={styles.programme} id="programme" aria-labelledby="programme-title">
          <CinemaProgrammeLoader />
          <header className={styles.programmeHead}>
            <div>
              <span>CITY PROGRAMME</span>
              <h2 id="programme-title">
                <span>上映</span><wbr /><span>プログラム</span>
              </h2>
            </div>
            <p>VOYAGE FILMS / 2026—</p>
          </header>

          <div className={styles.filmGrid}>
            {programme.map((film, index) => {
              const isWide = index === 0 || index === 5;

              return (
                <a
                  className={`${styles.film}${isWide ? ` ${styles.wide}` : ""}`}
                  href={`https://www.youtube.com/watch?v=${film.id}`}
                  target="_blank"
                  rel="noreferrer"
                  key={film.id}
                >
                  <span className={styles.still}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={transparentPixel}
                      data-cinema-src={cinemaStillSrc(film.id)}
                      data-cinema-src-set={cinemaStillSrcSet(film.id)}
                      sizes={`(max-width: 620px) 100vw, (max-width: 980px) 50vw, ${isWide ? "66vw" : "33vw"}`}
                      alt=""
                      width="1280"
                      height="720"
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                    />
                    <span className={styles.filmNumber}>{String(index + 2).padStart(2, "0")}</span>
                    <span className={styles.duration}>{film.duration}</span>
                    <span className={styles.smallPlay}><PixelIcon name="play" /></span>
                  </span>
                  <span className={styles.filmMeta}>{film.place} · {film.date}</span>
                  <strong><ProtectedText text={film.title} /></strong>
                </a>
              );
            })}
          </div>

          <footer className={styles.cinemaFooter}>
            <div><span>NEXT SCREENING</span><p>次の上映は、旅先から届き次第。</p></div>
            <a href={channelUrl} target="_blank" rel="noreferrer"><span>YouTube<wbr />チャンネルへ</span><PixelIcon name="external" /></a>
            <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
          </footer>
        </section>
      </main>
    </div>
  );
}
