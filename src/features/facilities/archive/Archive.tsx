import Image from "next/image";
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
      <a className={styles.skip} href="#catalogue">229本の目録へ移動</a>
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
            aria-label={`注目記事「${featuredArticle.title}」をnoteで読む`}
          >
            <Image
              src="/media/archive/featured.webp"
              alt="貯金0の世界一周で学んだ、一人経済圏の作り方という注目記事の見出し画像"
              width={1200}
              height={628}
              priority
            />
            <span>ISSUE 2026.07</span>
          </a>
        </article>

        <section className={styles.catalogue} id="catalogue" aria-labelledby="catalogue-title">
          <header className={styles.catalogueHeader}>
            <div>
              <p>PUBLIC WRITING · 2019—2026</p>
              <h2 id="catalogue-title">書いたもの、229本。</h2>
            </div>
            <p>
              旅、個人開発、学び、暮らしと思考。背表紙ではなく、題名と年月から探せる横組みの公開目録です。
            </p>
          </header>

          <ClientCatalogue notes={archiveNotes} />
        </section>
      </main>

      <footer className={styles.footer}>
        <div><span>THE ARCHIVE / CITY 01</span><p>公開してきた文章を、古いものまで隠さず収蔵しています。</p></div>
        <a href="https://note.com/shosuke240557" target="_blank" rel="noreferrer">
          noteですべて見る <PixelIcon name="external" />
        </a>
      </footer>
    </div>
  );
}
