import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { CityPlace } from "@/data/city";
import { featuredArticle, membership } from "@/data/content";
import archiveNotes from "@/data/note-archive.json";
import PixelIcon from "@/features/city/PixelIcon";
import SemanticText from "@/features/shared/SemanticText";
import FacilityBar from "../FacilityBar";
import ClientCatalogue from "./ClientCatalogue";
import styles from "./archive.module.css";

const archiveDisplayTitle = [
  "東大を",
  "休学して",
  "貯金",
  "0円で",
  "世界一周",
  "してるけど、",
  "僕には",
  "「やりたい",
  "こと」が",
  "1つも",
  "なかった",
] as const;

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
            <h1 id="archive-title" aria-label={featuredArticle.title}>
              {archiveDisplayTitle.map((phrase, index) => (
                <Fragment key={phrase}>
                  {index > 0 ? <wbr /> : null}
                  <span className={styles.featureTitleUnit} aria-hidden="true">{phrase}</span>
                </Fragment>
              ))}
            </h1>
            <p className={styles.excerpt}>
              <SemanticText phrases={featuredArticle.excerptPhrases ?? [featuredArticle.excerpt]} />
            </p>
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
              <h2 id="catalogue-title">
                <span>書いた</span><wbr /><span>ものの、</span><wbr />
                <span>公開</span><wbr /><span>目録。</span>
              </h2>
            </div>
            <p>
              旅、個人開発、学び、暮らしと思考。背表紙ではなく、題名と年月から探せる横組みの公開目録です。
            </p>
          </header>

          <ClientCatalogue notes={archiveNotes} />
        </section>

        <section className={styles.vault} aria-labelledby="vault-title">
          <div className={`${styles.archiveDoor} ${styles.doorOpen}`} aria-hidden="true">
            <div className={styles.doorRecess}>
              <span className={styles.doorLeaf} />
              <span className={styles.doorLeaf} />
            </div>
            <span className={styles.threshold} />
          </div>
          <div className={styles.vaultCopy}>
            <div className={styles.vaultMeta}>
              <p>MEMBERS&apos; STACK</p>
              <span>開庫</span>
            </div>
            <h2 id="vault-title">秘密の書庫</h2>
            <p>
              {`noteメンバーシップ「${membership.name}」を開きました。この街をどう建てたのか、何をどう作り、何に失敗したのか。公開目録には出さない制作と生活の裏側を、この奥に置いていきます。`}
            </p>
            <div className={styles.vaultDoors}>
              <a className={styles.join} href={membership.href} target="_blank" rel="noreferrer">
                <span>メンバーシップ「{membership.name}」に入る</span><PixelIcon name="external" />
              </a>
              <a className={styles.aboutMembership} href={membership.aboutHref} target="_blank" rel="noreferrer">
                <span>開庫の挨拶「{membership.aboutTitle}」を読む</span><PixelIcon name="external" />
              </a>
            </div>
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
