import Image from "next/image";
import type { CityPlace } from "@/data/city";
import { products } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import CurrentLocationName from "@/features/shared/CurrentLocationName";
import styles from "./haku.module.css";

const haku = products.find((product) => product.id === "haku")!;

const exhibits = [
  {
    number: "I",
    image: "/media/products/haku/auto.webp",
    title: "光を読み、色を選ぶ。",
    description: "光と被写体を解析し、15のスタイルから写真に合う仕上げを自動で選ぶ。夜景では夜を残し、人物では肌の色を守ります。",
    alt: "スリランカの山あいを写すHAKUのカメラ画面と『シーンを読んで、最適な色。』という実機能の紹介",
    tone: "ivory",
  },
  {
    number: "II",
    image: "/media/products/haku/frame.webp",
    title: "余白まで、一枚ごとに。",
    description: "写真の明暗と色を見て、マットと余白を設計する。草むらの小さな花が、白い額装のなかで一つの展示作品になります。",
    alt: "草むらの黄色い花を白い余白で額装したHAKUの実作品",
    tone: "night",
  },
  {
    number: "III",
    image: "/media/products/haku/food.webp",
    title: "料理には、料理の色。",
    description: "夕焼け、街、緑、夜、ポートレート、料理。撮るものに合わせて、色の温度と質感を変えます。",
    alt: "スリランカ料理を自然な色で仕上げたHAKUの実作品",
    tone: "rose",
  },
  {
    number: "IV",
    image: "/media/products/haku/control.webp",
    title: "自動の先にも、撮る自由を。",
    description: "スタイル、ズーム、露出、AE・AFロックはいつでも手動に切り替えられる。自動に任せるか、自分で決めるかも撮る人の選択です。",
    alt: "スタイルと露出を手動調整できるHAKUの実際の撮影画面",
    tone: "blue",
  },
] as const;

export default function Haku({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#exhibition">作品を見る</a>
      <FacilityBar place={place} />

      <main>
        <section className={styles.entrance} aria-labelledby="haku-title">
          <div className={styles.entranceCopy}>
            <p className={styles.kicker}>HAKU GALLERY</p>
            <h1 id="haku-title">
              <span>撮った写真を、</span>
              <span>飾りたくなる</span>
              <span>一枚へ。</span>
            </h1>
            <p>{haku.description}</p>
            <dl>
              <div><dt>作品</dt><dd>iOS Camera App</dd></div>
              <div><dt>制作</dt><dd>旅の道中</dd></div>
              <div><dt>状態</dt><dd>公開中</dd></div>
            </dl>
            <div className={styles.actions}>
              <a href={haku.appStore} target="_blank" rel="noreferrer">
                <span>App Storeで見る</span><PixelIcon name="external" />
              </a>
              <a href={haku.lp} target="_blank" rel="noreferrer">
                <span>公式サイトへ</span><PixelIcon name="external" />
              </a>
            </div>
          </div>

          <figure className={styles.entranceWork}>
            <Image
              src="/media/products/haku/hero.webp"
              alt="スリランカの山あいと白い建物を写した『撮るだけで、作品になる。』というHAKUの実作品"
              width={718}
              height={1560}
              priority
            />
            <figcaption><span>HAKU GALLERY · ENTRANCE WORK</span><b><CurrentLocationName place="スリランカ、ガラハ" /></b></figcaption>
          </figure>
        </section>

        <section className={styles.exhibition} id="exhibition" aria-labelledby="exhibition-title">
          <header className={styles.exhibitionHeader}>
            <span>EXHIBITION 01</span>
            <h2 id="exhibition-title">一枚ずつ、見る。</h2>
            <p>ここにあるのは、旅の途中で実際に撮り、HAKUで仕上げた写真と実際のアプリ画面です。</p>
          </header>

          {exhibits.map((exhibit) => (
            <article
              className={`${styles.exhibit} ${styles[`tone${exhibit.tone[0].toUpperCase()}${exhibit.tone.slice(1)}`]}`}
              key={exhibit.number}
            >
              <figure>
                <Image
                  src={exhibit.image}
                  alt={exhibit.alt}
                  width={718}
                  height={1560}
                  loading="lazy"
                />
              </figure>
              <div className={styles.placard}>
                <span>{exhibit.number}</span>
                <h3>{exhibit.title}</h3>
                <p>{exhibit.description}</p>
                <small>HAKU / 2026 / 旅の途中で撮影</small>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.admission} aria-labelledby="admission-title">
          <figure>
            <Image
              src="/media/products/haku/free.webp"
              alt="HAKUの無料枠と料金を案内する実際のプロダクトビジュアル"
              width={718}
              height={1560}
              loading="lazy"
            />
          </figure>
          <div>
            <Image className={styles.icon} src="/media/products/haku/icon.webp" alt="" width={74} height={74} />
            <p>作品をつくる入口</p>
            <h2 id="admission-title">まずは無料で、<br />月30枚。</h2>
            <p>すべてのスタイルと機能を、無料枠から試せます。旅先の日常を、飾りたくなる一枚として残してください。</p>
            <a href={haku.appStore} target="_blank" rel="noreferrer">
              <span>HAKUを使ってみる</span><PixelIcon name="external" />
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>HAKU GALLERY / CITY 01</span>
        <p>撮る、という判断だけを人に残す。</p>
      </footer>
    </div>
  );
}
