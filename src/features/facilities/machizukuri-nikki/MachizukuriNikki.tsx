import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { machizukuriNikkiChannelUrl } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import SemanticText from "@/features/shared/SemanticText";
import FacilityBar from "../FacilityBar";
import styles from "./machizukuri-nikki.module.css";

export default function MachizukuriNikki({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#about-program">番組について読む</a>
      <FacilityBar place={place} />

      <main>
        <header className={styles.hero}>
          <div className={styles.roomScene} aria-hidden="true">
            <div className={styles.roomSign}><span>THE LIVING ROOM</span><b>N-02</b></div>
            <div className={styles.window}><i /><i /><i /></div>
            <div className={styles.desk}>
              <span className={styles.notebook}><i /><i /><i /></span>
              <span className={styles.monitor}><b>開局準備中</b></span>
            </div>
            <div className={styles.chair}><i /></div>
            <div className={styles.floorShadow} />
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.status}><i aria-hidden="true" /> THE LIVING ROOM / 開局準備中</p>
            <p className={styles.programType}>PERSONAL VIDEO PODCAST</p>
            <h1><span>まちづくり</span><wbr /><span>日記</span></h1>
            <p className={styles.lead}>
              <SemanticText phrases={["毎日を、", "つくりながら", "生きる。"]} />
            </p>
          </div>

          <aside className={styles.channelCard} aria-label="チャンネルの公開状況">
            <span>CHANNEL STATUS</span>
            <strong>開局準備中</strong>
            <p>まだ動画はありません。最初の記録を公開するための準備をしています。</p>
            <a href={machizukuriNikkiChannelUrl} target="_blank" rel="noreferrer">
              YouTubeチャンネルへ <PixelIcon name="external" />
            </a>
          </aside>
        </header>

        <section className={styles.about} id="about-program" aria-labelledby="about-program-title">
          <div className={styles.fieldNotes} aria-label="番組のフィールドノート">
            <div className={styles.noteBinding} aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className={styles.notePage}>
              <span>FIELD NOTE / PURPOSE</span>
              <p>どうすれば、<br />日々をもっと豊かに<br />生きられるだろう。</p>
            </div>
            <div className={styles.notePage}>
              <span>RECORDING METHOD</span>
              <ol><li>試す</li><li>迷う</li><li>考え直す</li><li>また試す</li></ol>
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <div className={styles.aboutTitle}>
              <span>ABOUT THIS PROGRAM</span>
              <h2 id="about-program-title"><span>完成形ではなく、</span><br /><span>途中を残す。</span></h2>
            </div>
            <p>
              日々の生活で感じたことを、さとうしょうすけがひとりで語る
              ビデオポッドキャストです。
            </p>
            <p>
              どうすれば日々をより豊かに生きられるのか。そのために試したこと、
              うまくいかなかったこと、考え直したことを、答えが出る前から記録します。
            </p>
            <p>
              成功だけを振り返る番組ではありません。試行錯誤ともがきの最中を
              実況中継する、個人的なドキュメンタリーです。
            </p>
          </div>
        </section>

        <section className={styles.principles} aria-label="番組を構成する三つの視点">
          <article><span>01 / DAILY LIFE</span><h2>日々から始める</h2><p>特別な出来事ではなく、毎日の生活で実際に感じたことを起点に話します。</p></article>
          <article><span>02 / TRY &amp; ERROR</span><h2>途中を隠さない</h2><p>うまくいった方法だけでなく、迷い、試し、考え直す過程まで残します。</p></article>
          <article><span>03 / DOCUMENTARY</span><h2>変化を記録する</h2><p>未来の自分が振り返れるように、生活をつくり直す時間を記録します。</p></article>
        </section>

        <footer className={styles.footer}>
          <a href={machizukuriNikkiChannelUrl} target="_blank" rel="noreferrer">
            チャンネルを開く <PixelIcon name="external" />
          </a>
          <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
        </footer>
      </main>
    </div>
  );
}
