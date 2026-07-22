"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import DayCounter from "@/components/DayCounter";
import { cityPlaces } from "@/data/city";
import { featuredArticle, films, products, profile } from "@/data/content";
import CityScene from "./CityScene";
import PixelIcon from "./PixelIcon";
import FeaturedArticleTitle from "@/features/shared/FeaturedArticleTitle";
import styles from "./city.module.css";

const PRIMARY_PLACE_IDS = ["tripvlog", "haku", "stocka"];
const ignoreSelection = () => undefined;

const placeStatusLabel = (status: (typeof cityPlaces)[number]["status"]) => {
  if (status === "live") return "CURRENT";
  if (status === "building") return "OPENING SOON";
  return "OPEN";
};

export default function CityExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const directoryButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const selectedPlace = useMemo(
    () => cityPlaces.find((place) => place.id === selectedId) ?? null,
    [selectedId],
  );

  useEffect(() => {
    if (directoryOpen) closeButtonRef.current?.focus();
  }, [directoryOpen]);

  useEffect(() => {
    const deferredImages = Array.from(
      document.querySelectorAll<HTMLImageElement>("img[data-lazy-src]"),
    );
    const reveal = (image: HTMLImageElement) => {
      const source = image.dataset.lazySrc;
      if (!source) return;
      image.src = source;
      delete image.dataset.lazySrc;
    };

    if (!("IntersectionObserver" in window)) {
      deferredImages.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLImageElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "240px 0px" },
    );
    deferredImages.forEach((image) => observer.observe(image));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!directoryOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [directoryOpen]);

  const closeDirectory = useCallback(() => {
    setDirectoryOpen(false);
    window.requestAnimationFrame(() => directoryButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!directoryOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDirectory();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = document.getElementById("city-directory");
      const focusable = panel?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeDirectory, directoryOpen]);

  return (
    <div className={styles.page}>
      <main className={styles.siteContent} inert={directoryOpen}>
        <a className={styles.skipLink} href="#works">代表作へスキップ</a>

      <section className={styles.game} aria-labelledby="city-title">
        <header className={styles.cityBar}>
          <Link className={styles.brand} href="/" aria-label="CITY 01 ホーム">
            <span className={styles.brandMark} aria-hidden="true"><i /><i /><i /><i /></span>
            <span><strong>CITY 01</strong><small>SHOSUKE SATO / PORTFOLIO CITY</small></span>
          </Link>

          <div className={styles.cityTime} aria-label="街の固定時刻と旅の日数">
            <span>CITY TIME 18:42</span>
            <span>JOURNEY DAY <DayCounter /></span>
          </div>

          <button
            className={styles.directoryTrigger}
            type="button"
            ref={directoryButtonRef}
            aria-expanded={directoryOpen}
            aria-controls="city-directory"
            aria-label="施設一覧を開く"
            onClick={() => setDirectoryOpen(true)}
          >
            <PixelIcon name="directory" />
            <span>施設一覧</span>
          </button>
        </header>

        <div className={styles.gameBody}>
          <div className={styles.identity}>
            <p className={styles.kicker}>さとうしょうすけ / PORTFOLIO CITY</p>
            <h1 id="city-title"><span>つくったものが、</span><br /><span>街になる。</span></h1>
            <p className={styles.introCopy}>
              <span className={styles.introLine}>世界を旅しながら、アプリをつくり、</span><br />
              <span className={styles.introLine}>映像を撮り、文章を書く。</span>
            </p>

            <div className={styles.primaryActions}>
              <a className={styles.primaryAction} href="#works">
                <span>3つの代表作を見る</span><PixelIcon name="enter" />
              </a>
              <Link className={styles.textAction} href="/places/city-01-central" prefetch={false}>本人について</Link>
            </div>

            <dl className={styles.currentQuest}>
              <div><dt><PixelIcon name="location" />現在地</dt><dd>{profile.currentLocation.place}</dd></div>
              <div><dt>次の街</dt><dd>{profile.nextLocation}</dd></div>
            </dl>
          </div>

          <div className={styles.mapFrame}>
            <div className={styles.desktopScene}>
              <CityScene selectedId={selectedId} onSelect={setSelectedId} />
            </div>
            <div className={styles.mobileScene}>
              <CityScene selectedId={null} onSelect={ignoreSelection} preview />
            </div>

            {selectedPlace && (
              <article className={styles.placeCard}>
                <div className={styles.placeMeta}>
                  <span>{selectedPlace.code}</span>
                  <span>{placeStatusLabel(selectedPlace.status)}</span>
                </div>
                <div className={styles.placeCopy}>
                  <div><p>{selectedPlace.destination}</p><h2>{selectedPlace.name}</h2></div>
                  <p>{selectedPlace.summary}</p>
                </div>
                <Link className={styles.enterLink} href={selectedPlace.path} prefetch={false}>
                  <span>この施設に入る</span><PixelIcon name="enter" />
                </Link>
              </article>
            )}
          </div>

          <div className={styles.mobileWayfinding}>
            <div className={styles.mobileStatus}>
              <span><small><PixelIcon name="location" />現在地</small><strong>{profile.currentLocation.place}</strong></span>
              <span><small>次の街</small><strong>{profile.nextLocation}</strong></span>
              <Link href="/places/city-01-central" prefetch={false}>本人について <PixelIcon name="enter" /></Link>
            </div>
            <nav aria-label="施設から作品を選ぶ">
              <p>街の施設</p>
              {cityPlaces.map((place) => (
                <Link href={place.path} key={place.id} prefetch={false}>
                  <span>{place.code}</span>
                  <span><strong>{place.shortName}</strong><small>{place.destination}</small></span>
                  <PixelIcon name="enter" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {!selectedId && <p className={styles.controlHint}><span>建物を選ぶ</span><span>施設一覧から直接移動できます</span></p>}
      </section>

      <section className={styles.works} id="works" aria-labelledby="works-title">
        <div className={styles.sectionLead}>
          <span>MAKERS QUAY / 代表作</span>
          <h2 id="works-title">旅の途中で、<br />必要なものをつくる。</h2>
          <p>企画、設計、開発、公開まで、ひとりで手を動かしている三つのiOSアプリ。</p>
        </div>

        <div className={styles.productIndex}>
          {PRIMARY_PLACE_IDS.map((id, index) => {
            const product = products.find((item) => item.id === id);
            const place = cityPlaces.find((item) => item.id === id);
            if (!product || !place) return null;
            return (
              <Link className={styles.productRow} href={place.path} key={id} prefetch={false}>
                <span className={styles.productNumber}>0{index + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/media/products/${id}/icon.webp`}
                  alt=""
                  width="112"
                  height="112"
                  fetchPriority="low"
                  decoding="async"
                />
                <span className={styles.productMain}>
                  <small>{product.caption}</small>
                  <strong>{product.name}</strong>
                  <span>{product.tagline}</span>
                </span>
                <span className={styles.productEnter}><PixelIcon name="enter" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.cityDispatches} aria-label="最新の映像と文章">
        <a className={styles.filmDispatch} href={`https://www.youtube.com/watch?v=${films[0].id}`} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/media/cinema/${films[0].id}-preview.webp`}
            data-lazy-src={`/media/cinema/${films[0].id}-home.webp`}
            alt=""
            width="480"
            height="360"
            loading="lazy"
            decoding="async"
          />
          <span className={styles.dispatchShade} />
          <span className={styles.dispatchCopy}><small>VOYAGE CINEMA / 最新映像</small><strong>{films[0].title}</strong><span>再生する <PixelIcon name="play" /></span></span>
        </a>
        <a className={styles.articleDispatch} href={featuredArticle.href} target="_blank" rel="noreferrer">
          <div><small>THE ARCHIVE / 編集者選</small><strong><FeaturedArticleTitle /></strong><p>{featuredArticle.excerpt}</p></div>
          <span className={styles.dispatchExternal}>記事を読む <PixelIcon name="external" /></span>
        </a>
      </section>

        <footer className={styles.footer}>
          <div><strong>CITY 01</strong><span>つくったものが、街になっていく。</span></div>
          <a href="mailto:shosuke240557@gmail.com">CONTACT <PixelIcon name="external" /></a>
          <span>© 2026 SHOSUKE SATO</span>
        </footer>
      </main>

      {directoryOpen && (
        <>
          <button className={styles.directoryBackdrop} type="button" onClick={closeDirectory} aria-label="施設一覧を閉じる" />
          <aside
            id="city-directory"
            className={styles.directory}
            role="dialog"
            aria-modal="true"
            aria-labelledby="city-directory-title"
          >
            <div className={styles.directoryHead}>
              <div><span>CITY DIRECTORY</span><h2 id="city-directory-title">行き先を選ぶ</h2></div>
              <button type="button" ref={closeButtonRef} onClick={closeDirectory} aria-label="施設一覧を閉じる"><PixelIcon name="close" /></button>
            </div>
            <nav>
              {cityPlaces.map((place) => (
                <Link href={place.path} key={place.id} prefetch={false}>
                  <span>{place.code}</span>
                  <span><strong>{place.name}</strong><small>{place.destination}</small></span>
                  <PixelIcon name="enter" />
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </div>
  );
}
