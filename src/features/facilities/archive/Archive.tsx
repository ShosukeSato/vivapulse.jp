import Image from "next/image";
import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { featuredArticle } from "@/data/content";
import archiveNotes from "@/data/note-archive.json";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import FeaturedArticleTitle from "@/features/shared/FeaturedArticleTitle";
import ClientCatalogue from "./ClientCatalogue";
import styles from "./archive.module.css";

export default function Archive({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#catalogue">公開文章の目録へ移動</a>
      <FacilityBar place={place} />

      <main>
        <article className={styles.feature} aria-labelledby="archive-title">
          <div className={styles.featureCopy}>
            <p className={styles.issue}>THE ARCHIVE · FEATURED STORY</p>
            <p className={styles.date}>{featuredArticle.date}</p>
            <h1 id="archive-title"><FeaturedArticleTitle /></h1>
            <p className={styles.excerpt}>{featuredArticle.excerpt}</p>
            <a className={styles.readFeature} href={featuredArticle.href} target="_blank" rel="noreferrer">
              <span>この文章をnoteで読む</span><PixelIcon name="external" />
            </a>
          </div>

          <a
            className={styles.featureImage}
            href={featuredArticle.href}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={featuredArticle.thumbnail}
              alt="世界一周の旅と、これまでに出会った人々を重ねた記事の見出し画像"
              width={1280}
              height={670}
              priority
            />
            <span>ISSUE {featuredArticle.issue}</span>
          </a>
        </article>

        <section className={styles.catalogue} id="catalogue" aria-labelledby="catalogue-title">
          <header className={styles.catalogueHeader}>
            <div>
              <p>PUBLIC WRITING · 2019—</p>
              <h2 id="catalogue-title">書いたものの、公開目録。</h2>
            </div>
            <p>
              旅、個人開発、学び、暮らしと思考。背表紙ではなく、題名と年月から探せる横組みの公開目録です。
            </p>
          </header>

          <ClientCatalogue notes={archiveNotes} />
        </section>

        <section className={styles.restricted} aria-labelledby="restricted-title">
          <div className={styles.archiveDoor} aria-hidden="true">
            <div className={styles.doorRecess}>
              <span className={styles.doorLeaf} />
              <span className={styles.doorLeaf} />
              <span className={styles.doorHandles}><i /><i /></span>
            </div>
            <span className={styles.threshold} />
          </div>
          <div className={styles.restrictedCopy}>
            <div className={styles.restrictedMeta}>
              <p>MEMBERS&apos; STACK</p>
              <span>開庫準備中</span>
            </div>
            <h2 id="restricted-title">秘密の書庫</h2>
            <p>noteメンバーシップの開始に向けて、この奥に書庫を準備しています。開庫までは入れません。</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><span>THE ARCHIVE / CITY 01</span><p>公開してきた文章を、古いものまで隠さず収蔵しています。</p></div>
        <a href="https://note.com/shosuke240557" target="_blank" rel="noreferrer">
          noteですべて見る <PixelIcon name="external" />
        </a>
        <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
      </footer>
    </div>
  );
}
