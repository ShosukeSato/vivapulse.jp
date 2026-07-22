import Image from "next/image";
import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { products } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import SemanticText from "@/features/shared/SemanticText";
import FacilityBar from "../FacilityBar";
import styles from "./stocka.module.css";

const stocka = products.find((product) => product.id === "stocka")!;

export default function Stocka({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#learning-flow">学習フローへ移動</a>
      <FacilityBar place={place} />

      <main>
        <section className={styles.masthead} aria-labelledby="stocka-title">
          <div className={styles.identity}>
            <Image src="/media/products/stocka/icon.webp" alt="" width={80} height={80} priority />
            <div><span>STOCKA LAB</span><p>翻訳から始まる英語学習</p></div>
          </div>
          <div className={styles.titleBlock}>
            <p>「調べて、終わり」を終わらせる。</p>
            <h1 id="stocka-title"><span>翻訳を、</span><span>あなたの英語に</span><span>変える。</span></h1>
          </div>
          <div className={styles.overview}>
            <p><SemanticText phrases={stocka.descriptionPhrases ?? [stocka.description]} /></p>
            <div className={styles.actions}>
              <a href={stocka.appStore} target="_blank" rel="noreferrer">
                <span>App Storeで見る</span><PixelIcon name="external" />
              </a>
              <a href={stocka.lp} target="_blank" rel="noreferrer">
                <span>公式サイトへ</span><PixelIcon name="external" />
              </a>
            </div>
          </div>
        </section>

        <section className={styles.syllabus} aria-label="Stockaの学習フロー">
          <span>学習の流れ</span>
          <ol>
            <li><b>01</b> 翻訳する</li>
            <li><b>02</b> 分解して理解する</li>
            <li><b>03</b> 知識として保存する</li>
            <li><b>04</b> 忘れる前に復習する</li>
          </ol>
        </section>

        <ol className={styles.learningFlow} id="learning-flow">
          <li className={`${styles.lesson} ${styles.translate}`}>
            <div className={styles.lessonCopy}>
              <span className={styles.lessonNumber}>01</span>
              <p className={styles.lessonType}>TRANSLATE</p>
              <h2>まず、言いたかったことを訳す。</h2>
              <p>旅先の会話や、伝えたかった日本語を入力する。直訳を一つ返すだけでなく、フォーマル、標準、カジュアルなど、場面に合う複数の言い方を示します。</p>
              <blockquote>
                <span>入力</span>
                <p>残業には慣れているよ。</p>
                <span>標準的な表現</span>
                <p lang="en">I&apos;m used to working overtime.</p>
              </blockquote>
            </div>
            <figure className={styles.realScreen}>
              <Image
                src="/media/products/stocka/translate.webp"
                alt="『残業には慣れているよ。』を場面別の英語へ翻訳するStockaの実画面"
                width={1206}
                height={2622}
                priority
              />
              <figcaption>実際の翻訳画面</figcaption>
            </figure>
          </li>

          <li className={`${styles.lesson} ${styles.analyse}`}>
            <figure className={styles.realScreen}>
              <Image
                src="/media/products/stocka/points.webp"
                alt="be used toと動名詞、overtimeなどを構文・文法・単語に分解するStockaの実画面"
                width={1206}
                height={2622}
                loading="lazy"
              />
              <figcaption>実際の学習ポイント</figcaption>
            </figure>
            <div className={styles.lessonCopy}>
              <span className={styles.lessonNumber}>02</span>
              <p className={styles.lessonType}>UNDERSTAND</p>
              <h2>文を、構文・文法・単語にほどく。</h2>
              <p>なぜその英語になるのかを、学習ポイントとして分解。使った文の中で理解するから、文法書の例文ではなく自分の場面と結びつきます。</p>
              <dl className={styles.breakdown}>
                <div><dt>文法</dt><dd>be used to + 動詞ing</dd></div>
                <div><dt>単語</dt><dd>overtime「残業」</dd></div>
                <div><dt>構文</dt><dd>自分が使った文脈のまま理解</dd></div>
              </dl>
            </div>
          </li>

          <li className={`${styles.lesson} ${styles.stock}`}>
            <div className={styles.lessonCopy}>
              <span className={styles.lessonNumber}>03</span>
              <p className={styles.lessonType}>STOCK</p>
              <h2>わからなかった言葉を、手元に残す。</h2>
              <p>翻訳と学習ポイントは、そのまま知識カードとして蓄積。構文、文法、単語で探せて、理解したものと次に復習するものを一つの場所で見渡せます。</p>
              <p className={styles.note}>検索して、比べて、復習する。調べた言葉が、自分の英語として少しずつ蓄積していきます。</p>
            </div>
            <figure className={styles.realScreen}>
              <Image
                src="/media/products/stocka/stock.webp"
                alt="翻訳から作られた構文・文法・単語カードを一覧できるStockaの知識ストック実画面"
                width={1206}
                height={2622}
                loading="lazy"
              />
              <figcaption>実際の知識ストック</figcaption>
            </figure>
          </li>

          <li className={`${styles.lesson} ${styles.review}`}>
            <figure className={styles.realScreen}>
              <Image
                src="/media/products/stocka/review.webp"
                alt="6枚の復習待ちカードと『復習を始める』ボタンを表示するStockaの実画面"
                width={1206}
                height={2622}
                loading="lazy"
              />
              <figcaption>実際の復習画面</figcaption>
            </figure>
            <div className={styles.lessonCopy}>
              <span className={styles.lessonNumber}>04</span>
              <p className={styles.lessonType}>REVIEW</p>
              <h2>忘れる前に、思い出す。</h2>
              <p>覚えたつもりで終わらせず、復習待ちのカードをもう一度。旅先で調べた言葉を、自分で使える言葉へ変えていきます。</p>
              <a className={styles.start} href={stocka.appStore} target="_blank" rel="noreferrer">
                <span>Stockaで学び始める</span><PixelIcon name="external" />
              </a>
            </div>
          </li>
        </ol>
      </main>

      <footer className={styles.footer}>
        <div><span>STOCKA LAB / CITY 01</span><p>旅の会話から生まれた、自分のための学習装置。</p></div>
        <a href={stocka.lp} target="_blank" rel="noreferrer">機能を詳しく見る <PixelIcon name="external" /></a>
        <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
      </footer>
    </div>
  );
}
