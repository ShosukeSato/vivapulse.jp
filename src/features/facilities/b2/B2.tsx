import Image from "next/image";
import Link from "next/link";
import type { CityPlace } from "@/data/city";
import {
  niwakaPhilosophyChannelUrl,
  niwakaPhilosophyEpisodes,
} from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import SemanticText from "@/features/shared/SemanticText";
import FacilityBar from "../FacilityBar";
import styles from "./b2.module.css";

const [featuredEpisode, ...pastEpisodes] = niwakaPhilosophyEpisodes;

const episodeTitlePhrases: Record<string, readonly string[]> = {
  "AFEKFEwe-tU": ["ゴルフ", "じゃないと", "ダメですか？"],
  "o_9XUgJ7K_c": ["【言葉と", "コミニュケーション】", "通じ合うって", "なんだ...？", "【にわか哲学】"],
  vGR0XhCqbbk: ["自己紹介って", "なんだ？", "【にわか哲学】"],
};

export default function B2({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <FacilityBar place={place} inverse />
      <main className={styles.room}>
        <div className={styles.level} aria-hidden="true"><span>B2</span><i /><i /><i /><i /></div>

        <div className={styles.studio}>
          <header className={styles.introduction}>
            <p className={styles.status}><span aria-hidden="true" /> B2 STUDIO / VIDEO PODCAST</p>
            <p className={styles.host}>一笑瓶の</p>
            <h1><span>にわか</span><wbr /><span>哲学</span></h1>
            <p className={styles.lead}>
              <SemanticText phrases={[
                "人文や哲学が",
                "好きな、",
                "専門家ではない",
                "友人二人。",
                "身近な疑問を",
                "「にわか」の",
                "立場で考え、",
                "話す",
                "ビデオ",
                "ポッドキャスト",
                "です。",
              ]} />
            </p>
            <p className={styles.people}>さとうしょうすけ × やまもとあやと</p>
          </header>

          <section className={styles.feature} aria-labelledby="featured-episode-title">
            <p className={styles.sectionLabel}>FEATURED CONVERSATION / 最新回</p>
            <a
              className={styles.featureLink}
              href={`https://www.youtube.com/watch?v=${featuredEpisode.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.monitor}>
                <Image
                  src={`/media/b2/${featuredEpisode.id}.webp`}
                  alt="『ゴルフの代わり？』と問いかける、二人の対話画面"
                  width={1280}
                  height={720}
                  priority
                  sizes="(max-width: 760px) calc(100vw - 40px), 58vw"
                />
              </span>
              <span className={styles.featureCopy}>
                <span className={styles.episodeMeta}>{featuredEpisode.date} · {featuredEpisode.duration}</span>
                <strong id="featured-episode-title">
                  <SemanticText phrases={episodeTitlePhrases[featuredEpisode.id] ?? [featuredEpisode.title]} />
                </strong>
                <span className={styles.watch}>YouTubeで見る <PixelIcon name="play" /></span>
              </span>
            </a>
          </section>

          <section className={styles.ledger} aria-labelledby="episode-ledger-title">
            <header>
              <div><span>EPISODE LEDGER</span><h2 id="episode-ledger-title">これまでの回</h2></div>
              <strong>CONVERSATION ARCHIVE</strong>
            </header>
            <ol>
              {pastEpisodes.map((episode) => (
                <li key={episode.id}>
                  <a href={`https://www.youtube.com/watch?v=${episode.id}`} target="_blank" rel="noreferrer">
                    <time>{episode.date}</time>
                    <strong>
                      <SemanticText phrases={episodeTitlePhrases[episode.id] ?? [episode.title]} />
                    </strong>
                    <span>{episode.duration}</span>
                    <PixelIcon name="external" />
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <footer className={styles.footer}>
            <a href={niwakaPhilosophyChannelUrl} target="_blank" rel="noreferrer">
              <span>公式チャンネルへ</span><PixelIcon name="external" />
            </a>
            <Link href="/">
              <span>街へ戻る</span><PixelIcon name="map" />
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
