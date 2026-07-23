"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import DayCounter from "@/components/DayCounter";
import { cityPlaces } from "@/data/city";
import {
  currentJourneyStop,
  featuredArticle,
  featuredFilm,
  nextJourneyStop,
  products,
} from "@/data/content";
import CityScene from "./CityScene";
import PixelIcon from "./PixelIcon";
import FeaturedArticleTitle from "@/features/shared/FeaturedArticleTitle";
import SemanticText from "@/features/shared/SemanticText";
import styles from "./city.module.css";

const PRIMARY_PLACE_IDS = ["tripvlog", "haku", "stocka"];
const GUIDE_ID = "city-guide";
const LOWER_MAP_IDS = new Set(["cinema", "harbor"]);

export default function CityExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const directoryButtonRef = useRef<HTMLButtonElement>(null);
  const directoryReturnFocusRef = useRef<HTMLElement | null>(null);
  const pendingReturnFocusRef = useRef<HTMLElement | null>(null);
  const desktopGuideButtonRef = useRef<HTMLButtonElement>(null);
  const mobileGuideButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCardRef = useRef<HTMLElement>(null);

  const selectedPlace = useMemo(
    () => cityPlaces.find((place) => place.id === selectedId) ?? null,
    [selectedId],
  );
  const guideSelected = selectedId === GUIDE_ID;

  useEffect(() => {
    if (directoryOpen) {
      closeButtonRef.current?.focus();
      return;
    }

    const returnTarget = pendingReturnFocusRef.current;
    if (!returnTarget) return;
    returnTarget.focus();
    pendingReturnFocusRef.current = null;
  }, [directoryOpen]);

  useEffect(() => {
    const clearSelection = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !directoryOpen) setSelectedId(null);
    };
    document.addEventListener("keydown", clearSelection);
    return () => document.removeEventListener("keydown", clearSelection);
  }, [directoryOpen]);

  useEffect(() => {
    if (!selectedId || !window.matchMedia("(max-width: 1220px)").matches) return;
    const frame = window.requestAnimationFrame(() => {
      mobileCardRef.current?.scrollIntoView({ block: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedId]);

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

  const openDirectory = useCallback((returnFocusTo: HTMLElement | null) => {
    directoryReturnFocusRef.current = returnFocusTo;
    setDirectoryOpen(true);
  }, []);

  const closeDirectory = useCallback(() => {
    pendingReturnFocusRef.current =
      directoryReturnFocusRef.current ?? directoryButtonRef.current;
    directoryReturnFocusRef.current = null;
    setDirectoryOpen(false);
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

          <div className={styles.cityTime}>
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
            onClick={(event) => openDirectory(event.currentTarget)}
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
                <span>代表作を見る</span><PixelIcon name="enter" />
              </a>
              <Link className={styles.textAction} href="/places/city-01-central" prefetch={false}>プロフィールと現在地</Link>
            </div>

            {selectedPlace || guideSelected ? (
              <aside className={styles.placeInspector} aria-live="polite" data-map-selection-ui>
                <div className={styles.inspectorMeta}>
                  <span>{guideSelected ? "CITY GUIDE" : selectedPlace?.code}</span>
                  <button type="button" onClick={() => setSelectedId(null)} aria-label="施設情報を閉じる">×</button>
                </div>
                <p>{guideSelected ? "この街の案内人" : selectedPlace?.destination}</p>
                <h2>{guideSelected ? "SHOSUKE" : selectedPlace?.name}</h2>
                <p className={styles.inspectorSummary}>
                  {guideSelected
                    ? "この街をつくり、旅を続けている本人です。建物を選ぶか、施設一覧から行き先を探せます。"
                    : selectedPlace?.summary}
                </p>
                {guideSelected ? (
                  <button type="button" onClick={() => openDirectory(desktopGuideButtonRef.current)}>
                    <span>施設一覧を開く</span><PixelIcon name="directory" />
                  </button>
                ) : (
                  <Link href={selectedPlace!.path} prefetch={false}>
                    <span>この施設に入る</span><PixelIcon name="enter" />
                  </Link>
                )}
              </aside>
            ) : (
              <dl className={styles.currentQuest}>
                <div><dt><PixelIcon name="location" />現在地</dt><dd>{currentJourneyStop.place}</dd></div>
                <div><dt>次の街</dt><dd>{nextJourneyStop.place}</dd></div>
              </dl>
            )}
          </div>

          <div
            className={styles.mapFrame}
            onClick={(event) => {
              const target = event.target as Element;
              if (target.closest("[data-map-target], [data-map-selection-ui]")) return;
              setSelectedId(null);
            }}
          >
            <div className={styles.desktopScene}>
              <CityScene
                selectedId={selectedId}
                onSelect={setSelectedId}
                guideSelected={guideSelected}
                onGuideHover={() => setSelectedId(GUIDE_ID)}
                onGuideSelect={() => openDirectory(desktopGuideButtonRef.current)}
                guideButtonRef={desktopGuideButtonRef}
              />
            </div>
            <div className={styles.mobileScene}>
              <CityScene
                selectedId={selectedId}
                onSelect={setSelectedId}
                guideSelected={guideSelected}
                onGuideHover={() => setSelectedId(GUIDE_ID)}
                onGuideSelect={() => openDirectory(mobileGuideButtonRef.current)}
                preview
                interactive
                guideButtonRef={mobileGuideButtonRef}
              />
            </div>

            <p className={styles.mapStatus} role="status" aria-live="polite" aria-atomic="true">
              {guideSelected
                ? "街の案内人SHOSUKEを選択しました。詳細を表示しています。"
                : selectedPlace
                  ? `${selectedPlace.shortName}を選択しました。詳細を表示しています。`
                  : ""}
            </p>

            {selectedPlace && (
              <article
                className={styles.mobilePlaceCard}
                id="mobile-place-card"
                key={selectedId}
                ref={mobileCardRef}
                data-dock={LOWER_MAP_IDS.has(selectedId ?? "") ? "top" : "bottom"}
                data-map-selection-ui
              >
                <div className={styles.mobileCardHead}>
                  <span>{selectedPlace.code}</span>
                  <button type="button" onClick={() => setSelectedId(null)} aria-label="施設情報を閉じる">×</button>
                </div>
                <div className={styles.mobileCardCopy}>
                  <p>{selectedPlace.destination}</p>
                  <h2>{selectedPlace.shortName}</h2>
                </div>
                <Link href={selectedPlace.path} prefetch={false}>
                  <span>この施設に入る</span><PixelIcon name="enter" />
                </Link>
              </article>
            )}
          </div>

          <div className={styles.mobileWayfinding}>
            <div className={styles.mobileStatus}>
              <span><small><PixelIcon name="location" />現在地</small><strong>{currentJourneyStop.place}</strong></span>
              <span><small>次の街</small><strong>{nextJourneyStop.place}</strong></span>
              <Link href="/places/city-01-central" prefetch={false}>プロフィールと現在地 <PixelIcon name="enter" /></Link>
            </div>
            <nav aria-label="施設から作品を選ぶ">
              <p>街の施設</p>
              {cityPlaces.map((place) => (
                <Link href={place.path} key={place.id} prefetch={false}>
                  <span>{place.code}</span>
                  <span>
                    <strong>{place.shortName}</strong>
                    <small>
                      {place.id === "strategy"
                        ? <SemanticText phrases={["ビデオ", "ポッドキャスト"]} />
                        : place.destination}
                    </small>
                  </span>
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
          <h2 id="works-title">
            <span className="semanticPhrase">旅の</span><wbr />
            <span className="semanticPhrase">途中で、</span><br />
            <span className="semanticPhrase">必要な</span><wbr />
            <span className="semanticPhrase">ものを</span><wbr />
            <span className="semanticPhrase">つくる。</span>
          </h2>
          <p>旅の途中でつくり、企画から公開まで、ひとりで手を動かしているiOSアプリ。</p>
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

      <section className={styles.cityDispatches} aria-label="代表映像と編集者選の記事">
        <a className={styles.filmDispatch} href={`https://www.youtube.com/watch?v=${featuredFilm.id}`} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/media/cinema/${featuredFilm.id}-640.webp`}
            data-lazy-src={`/media/cinema/${featuredFilm.id}-1280.webp`}
            alt=""
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span className={styles.dispatchShade} />
          <span className={styles.dispatchCopy}><small><span>VOYAGE CINEMA /</span><wbr /> <span>代表映像</span></small><strong><SemanticText phrases={featuredFilm.displayTitleLines ?? [featuredFilm.title]} /></strong><span>再生する <PixelIcon name="play" /></span></span>
        </a>
        <a className={styles.articleDispatch} href={featuredArticle.href} target="_blank" rel="noreferrer">
          <div>
            <small><span>THE ARCHIVE /</span><wbr /> <span>編集者選</span></small>
            <strong><FeaturedArticleTitle /></strong>
            <p><SemanticText phrases={featuredArticle.excerptPhrases ?? [featuredArticle.excerpt]} /></p>
          </div>
          <span className={styles.dispatchExternal}>記事を読む <PixelIcon name="external" /></span>
        </a>
      </section>

        <footer className={styles.footer}>
          <div><strong>CITY 01</strong><span>つくったものが、街になっていく。</span></div>
          <a href="mailto:shosuke240557@gmail.com">CONTACT <PixelIcon name="external" /></a>
          <span>© SHOSUKE SATO</span>
        </footer>
      </main>

      {directoryOpen && (
        <>
          <div
            className={styles.directoryBackdrop}
            aria-hidden="true"
            onPointerDown={(event) => {
              event.preventDefault();
              closeDirectory();
            }}
          />
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
