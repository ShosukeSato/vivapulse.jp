import Link from "next/link";
import { cityPlaces, traveler } from "@/data/city";
import {
  careerArticleUrl,
  lifeLineContinuationPhrases,
  lifeStations,
  personal,
  profile,
  socials,
  workCreed,
  workHistory,
} from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import SemanticText from "@/features/shared/SemanticText";
import shell from "../facilities/facility-shell.module.css";
import styles from "./traveler.module.css";

const cinema = cityPlaces.find((place) => place.id === "cinema")!;
const archive = cityPlaces.find((place) => place.id === "library")!;
const yard = cityPlaces.find((place) => place.id === "construction")!;
const harbor = cityPlaces.find((place) => place.id === "harbor")!;
const FIELD_OFFICE_URL = "/field-office";

/**
 * The traveler page. SHOSUKE is the one person of CITY 01, not a tenth
 * facility: no facility code, no building on the map. His biography is a
 * LIFE LINE — a vertical rail diagram in the warm station palette, so the
 * world journey reads as one station on a longer line. The harbor keeps the
 * cold sea diagram; this page keeps the warm rail one.
 */
export default function Traveler() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#life-line">ここまでの各駅へ移動</a>

      <header className={shell.bar}>
        <Link className={shell.back} href="/" aria-label="街へ戻る">
          <PixelIcon name="map" /><span>街へ戻る</span>
        </Link>
        <Link className={shell.cityMark} href="/" aria-label="CITY 01 ホーム">
          <i aria-hidden="true"><b /><b /><b /><b /></i>
          <strong>CITY 01</strong>
        </Link>
        <div className={shell.locator}>
          <span>{traveler.role}</span><b>{traveler.name}</b>
        </div>
      </header>

      <main>
        <section className={styles.opening} aria-labelledby="traveler-title">
          <p className={styles.kicker}>TRAVELER&nbsp;· この街をつくった人</p>
          <div className={styles.nameSign}>
            <h1 id="traveler-title">
              <span>さとう</span><wbr /><span>しょうすけ</span>
            </h1>
            <p className={styles.nameEn}>{profile.nameEn}</p>
          </div>
          <p className={styles.bio}>
            <SemanticText phrases={profile.bioPhrases} />
          </p>
          <div className={styles.primaryRoutes}>
            <a href="#life-line">ここまでの各駅を見る</a>
            <a href="#contact">連絡先へ</a>
            <a href={FIELD_OFFICE_URL} target="_blank" rel="noreferrer">Web制作の相談 <PixelIcon name="external" /></a>
          </div>
        </section>

        <section className={styles.lifeLine} id="life-line" aria-labelledby="life-line-title">
          <header>
            <p>LIFE LINE&nbsp;· ここまでの各駅</p>
            <h2 id="life-line-title">
              <SemanticText phrases={["世界一周は、", "この線路の", "一駅に", "すぎない。"]} />
            </h2>
          </header>

          <ol className={styles.line}>
            {lifeStations.map((station) => (
              <li className={station.status === "now" ? styles.now : undefined} key={station.name}>
                <div className={styles.sign}>
                  {(station.period || station.status === "now") && (
                    <span className={styles.signTop}>
                      {station.period && <span className={styles.signPeriod}>{station.period}</span>}
                      {station.status === "now" && <b className={styles.nowChip}>現在地</b>}
                    </span>
                  )}
                  <strong className={styles.signName}>{station.name}</strong>
                  {station.note && (
                    <p className={styles.signNote}>
                      <SemanticText phrases={station.notePhrases ?? [station.note]} />
                    </p>
                  )}
                  {station.status === "now" && (
                    <Link className={styles.signRoute} href={harbor.path}>
                      この旅の航路を見る<PixelIcon name="enter" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.continuation}>
            <SemanticText phrases={lifeLineContinuationPhrases} />
          </p>

          <a className={styles.careerArticle} href={careerArticleUrl} target="_blank" rel="noreferrer">
            この経歴の、詳しい話を読む(note)<PixelIcon name="external" />
          </a>
        </section>

        <section className={styles.work} aria-labelledby="work-title">
          <header>
            <p>WORK&nbsp;· ここまでの職歴</p>
            <h2 id="work-title">
              <SemanticText phrases={["肩書きより、", "やってきたこと。"]} />
            </h2>
          </header>
          <p className={styles.workLead}>
            <SemanticText phrases={[
              "大学1年の",
              "塾講師から、",
              "いまの二社まで。",
              "働くことも、",
              "この年表の",
              "一部です。",
            ]} />
          </p>

          <ol className={styles.workLedger}>
            {workHistory.map((job) => (
              <li key={job.name}>
                <div className={styles.workWhen}>
                  <time>{job.period}</time>
                  {job.periodNote && <small>{job.periodNote}</small>}
                </div>
                <div className={styles.workBody}>
                  <span className={styles.workKind}>{job.kind}</span>
                  <span className={styles.workTitle}>
                    <strong>{job.name}</strong>
                    {job.role && <em>{job.role}</em>}
                  </span>
                  <p><SemanticText phrases={job.notePhrases ?? [job.note]} /></p>
                </div>
                {job.status === "now" && <span className={styles.workState}>現在も勤務中</span>}
              </li>
            ))}
          </ol>

          <blockquote className={styles.workCreed} cite={careerArticleUrl}>
            <p><SemanticText phrases={workCreed.quotePhrases} /></p>
            <cite>— {workCreed.source}</cite>
          </blockquote>

          <a className={styles.workArticle} href={careerArticleUrl} target="_blank" rel="noreferrer">
            働くことの詳しい話も、この記事に(note)<PixelIcon name="external" />
          </a>
        </section>

        <section className={styles.origin} aria-labelledby="origin-title">
          <header>
            <p>FAVORITE PLACE&nbsp;· この街の原風景</p>
            <h2 id="origin-title">
              <SemanticText phrases={["いちばん", "好きな場所は、", `${personal.favoritePlace}。`]} />
            </h2>
          </header>
          <p className={styles.originCopy}>
            <SemanticText phrases={[
              "海と",
              "文化施設と",
              "駅と港のある、",
              "夜景の街。",
              "CITY 01の",
              "街並みは、",
              "この場所の",
              "都市構造から",
              "採られています。",
            ]} />
          </p>
          <dl className={styles.personal}>
            <div><dt>趣味</dt><dd>{personal.hobbies.join("、")}</dd></div>
            <div><dt>特技</dt><dd>{personal.skills.join("、")}</dd></div>
            <div>
              <dt>つくる場所</dt>
              <dd className={styles.activityLinks}>
                <Link href={cinema.path}>YouTube / {cinema.shortName}</Link>
                <Link href={archive.path}>note / {archive.shortName}</Link>
                <Link href={yard.path}>個人開発 / {yard.shortName}</Link>
              </dd>
            </div>
          </dl>
        </section>

        <section className={styles.why} aria-labelledby="why-title">
          <p>WHY THIS CITY EXISTS</p>
          <h2 id="why-title">
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
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <div><span>CONTACT &amp; LINKS</span><p>制作、旅、文章の続きを、それぞれの場所で公開しています。</p></div>
        <nav aria-label="連絡先とリンク">
          <a href={FIELD_OFFICE_URL} target="_blank" rel="noreferrer">FIELD OFFICE / Web制作 <PixelIcon name="external" /></a>
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
