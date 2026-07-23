import Image from "next/image";
import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { products } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import SemanticText from "@/features/shared/SemanticText";
import FacilityBar from "../FacilityBar";
import styles from "./tripvlog.module.css";

const tripVlog = products.find((product) => product.id === "tripvlog")!;

export default function TripVlog({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#production-sequence">制作工程へ移動</a>
      <FacilityBar place={place} inverse />

      <main>
        <section className={styles.introduction} aria-labelledby="tripvlog-title">
          <div className={styles.introCopy}>
            <div className={styles.productMark}>
              <Image src="/media/products/tripvlog/icon.webp" alt="" width={72} height={72} priority />
              <span>旅の映像編集室</span>
            </div>
            <p className={styles.kicker}>TRIPVLOG STUDIO</p>
            <h1 id="tripvlog-title">
              <span className={styles.titleLine}><span>撮るだけ。</span></span>
              <span className={styles.titleLine}><span>旅の一日が、</span></span>
              <span className={styles.titleLine}><span>一本になる。</span></span>
            </h1>
            <p className={styles.lead}>
              <SemanticText phrases={tripVlog.descriptionPhrases ?? [tripVlog.description]} />
            </p>
            <div className={styles.actions}>
              <a href={tripVlog.appStore} target="_blank" rel="noreferrer">
                <span>App Storeで見る</span><PixelIcon name="external" />
              </a>
              <a href={tripVlog.lp} target="_blank" rel="noreferrer">
                <span>公式サイトへ</span><PixelIcon name="external" />
              </a>
            </div>
          </div>

          <figure className={styles.finishedPreview}>
            <Image
              src="/media/products/tripvlog/hero.webp"
              alt="TripVlogで書き出した世界一周34日目、インドネシア・スラカルタの縦型vlog"
              width={1179}
              height={2096}
              priority
            />
            <figcaption><span>完成映像</span><b>世界一周 Day 34</b></figcaption>
          </figure>
        </section>

        <section className={styles.sequence} id="production-sequence" aria-labelledby="sequence-title">
          <header className={styles.sequenceHeader}>
            <p>実際のアプリ画面で見る</p>
            <h2 id="sequence-title">
              <span>撮影から</span><wbr /><span>完成まで。</span>
            </h2>
            <p>
              <SemanticText phrases={[
                "旅先で撮った",
                "短いクリップを、",
                "一日単位で",
                "集める。",
                "日付、場所、",
                "国旗、地図を",
                "自動で組み、",
                "縦型vlogとして",
                "書き出します。",
              ]} />
            </p>
          </header>

          <ol className={styles.stages}>
            <li className={`${styles.stage} ${styles.capture}`}>
              <div className={styles.stageCopy}>
                <span className={styles.number}>01</span>
                <p className={styles.stageLabel}>RECORD / COLLECT</p>
                <h3><SemanticText phrases={["旅を", "撮る。"]} /></h3>
                <p>
                  <SemanticText phrases={[
                    "編集のことは",
                    "考えず、",
                    "その瞬間を",
                    "短く撮影。",
                    "クリップは",
                    "日付と場所ごとに",
                    "一日の記録へ",
                    "まとまります。",
                  ]} />
                </p>
                <dl>
                  <div><dt>この日の記録</dt><dd>19 clips / 0:50</dd></div>
                  <div><dt>移動</dt><dd>11 spots / 83 km</dd></div>
                </dl>
              </div>
              <figure className={`${styles.screen} ${styles.captureScreen}`}>
                <Image
                  src="/media/products/tripvlog/cards.webp"
                  alt="TripVlogのタイトルカード設定と、撮影した19本のクリップ一覧"
                  width={1179}
                  height={2556}
                  loading="lazy"
                />
                <figcaption>撮った順に集まる、実際のクリップ一覧</figcaption>
              </figure>
            </li>

            <li className={`${styles.stage} ${styles.assemble}`}>
              <div className={styles.stageCopy}>
                <span className={styles.number}>02</span>
                <p className={styles.stageLabel}>AUTOMATIC EDIT</p>
                <h3><SemanticText phrases={["旅の", "情報を、", "映像にする。"]} /></h3>
                <p>
                  <SemanticText phrases={[
                    "冒頭には",
                    "日付と旅の",
                    "タイトル。",
                    "最後には、",
                    "訪れた場所と",
                    "移動の記録。",
                    "編集作業を",
                    "増やさず、",
                    "旅の文脈を",
                    "残します。",
                  ]} />
                </p>
              </div>
              <div className={styles.generatedCards}>
                <figure className={styles.cardFrame}>
                  <Image
                    src="/media/products/tripvlog/title-card.webp"
                    alt="TripVlogが自動生成した、インドネシア国旗と世界一周Day34のタイトルカード"
                    width={1179}
                    height={2288}
                    loading="lazy"
                  />
                  <figcaption>冒頭カード</figcaption>
                </figure>
                <figure className={styles.cardFrame}>
                  <Image
                    src="/media/products/tripvlog/map-card.webp"
                    alt="ジョグジャカルタからスラカルタまでの11地点、83kmを示す実際の地図カード"
                    width={1179}
                    height={2250}
                    loading="lazy"
                  />
                  <figcaption>訪れた場所</figcaption>
                </figure>
              </div>
            </li>

            <li className={`${styles.stage} ${styles.export}`}>
              <div className={styles.exportControls}>
                <figure className={styles.screen}>
                  <Image
                    src="/media/products/tripvlog/export.webp"
                    alt="TripVlogの仕上がりプレビューとカメラロールへの書き出し画面"
                    width={1179}
                    height={2556}
                    loading="lazy"
                  />
                  <figcaption>プレビューして、カメラロールへ</figcaption>
                </figure>
              </div>
              <div className={styles.stageCopy}>
                <span className={styles.number}>03</span>
                <p className={styles.stageLabel}>EXPORT</p>
                <h3><SemanticText phrases={["一本の", "vlogが", "完成。"]} /></h3>
                <p>
                  <SemanticText phrases={[
                    "一日のクリップを",
                    "時系列に",
                    "つなぎ、",
                    "選んだスタンプと",
                    "BGMを反映。",
                    "カメラロールへ",
                    "書き出して、",
                    "そのまま",
                    "旅の記録として",
                    "残せます。",
                  ]} />
                </p>
                <a className={styles.finalAction} href={tripVlog.appStore} target="_blank" rel="noreferrer">
                  <span>TripVlogを使ってみる</span><PixelIcon name="external" />
                </a>
              </div>
            </li>
          </ol>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>TRIPVLOG STUDIO / CITY 01</span>
        <p>
          <SemanticText phrases={[
            "旅の途中で、",
            "毎日の編集が",
            "追いつかなく",
            "なった自分の",
            "ために",
            "つくりました。",
          ]} />
        </p>
        <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
      </footer>
    </div>
  );
}
