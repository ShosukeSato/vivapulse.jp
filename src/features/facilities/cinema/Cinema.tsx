import type { CityPlace } from "@/data/city";
import { channelUrl, films } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import styles from "./cinema.module.css";

const availableFilms = films.filter((film) => film.id !== "IR-GR-u0kMM");

export default function Cinema({ place }: { place: CityPlace }) {
  const [feature, ...programme] = availableFilms;

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
            aria-label={`${feature.title}をYouTubeで再生（新しいタブ）`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/media/cinema/${feature.id}.jpg`} alt="" width="480" height="360" />
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
              <span>世界一周の途中で出会った</span><wbr />
              <span>景色と人を、</span><wbr />
              <span>一本ずつ上映しています。</span>
            </p>
            <a className={styles.watchButton} href={`https://www.youtube.com/watch?v=${feature.id}`} target="_blank" rel="noreferrer">
              <span>本編を観る</span><PixelIcon name="play" />
            </a>
          </div>
        </section>

        <section className={styles.programme} id="programme" aria-labelledby="programme-title">
          <header className={styles.programmeHead}>
            <div><span>SCREENS 02—{String(availableFilms.length).padStart(2, "0")}</span><h2 id="programme-title">上映プログラム</h2></div>
            <p>{availableFilms.length} FILMS / 2026</p>
          </header>

          <div className={styles.filmGrid}>
            {programme.map((film, index) => (
              <a
                className={`${styles.film}${index === 0 || index === 5 ? ` ${styles.wide}` : ""}`}
                href={`https://www.youtube.com/watch?v=${film.id}`}
                target="_blank"
                rel="noreferrer"
                key={film.id}
                aria-label={`${film.title}をYouTubeで再生（新しいタブ）`}
              >
                <span className={styles.still}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/media/cinema/${film.id}.jpg`} alt="" width="480" height="360" loading="lazy" />
                  <span className={styles.filmNumber}>{String(index + 2).padStart(2, "0")}</span>
                  <span className={styles.duration}>{film.duration}</span>
                  <span className={styles.smallPlay}><PixelIcon name="play" /></span>
                </span>
                <span className={styles.filmMeta}>{film.place} · {film.date}</span>
                <strong>{film.title}</strong>
              </a>
            ))}
          </div>

          <footer className={styles.cinemaFooter}>
            <div><span>NEXT SCREENING</span><p>次の上映は、旅先から届き次第。</p></div>
            <a href={channelUrl} target="_blank" rel="noreferrer">YouTubeチャンネルへ <PixelIcon name="external" /></a>
          </footer>
        </section>
      </main>
    </div>
  );
}
