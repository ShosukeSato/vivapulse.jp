"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DayCounter from "@/components/DayCounter";
import IsometricCity from "@/components/IsometricCity";
import { cityPlaces, type CityPlace } from "@/data/city";
import {
  featuredArticle,
  films,
  journey,
  otherApps,
  profile,
  socials,
} from "@/data/content";

type PanelItem = { label: string; meta?: string; href?: string };
type InternalDetail = {
  eyebrow: string;
  title: string;
  number: string;
  description: string;
  fact: string;
  list?: PanelItem[];
};

const INTERNAL_DETAILS: Record<string, InternalDetail> = {
  station: {
    eyebrow: "C-01 · CENTRAL · LIVE",
    title: "CITY 01 CENTRAL",
    number: "C01",
    description: profile.bio,
    fact: `${profile.currentLocation.place}から、${profile.nextLocation}へ向かう途中。`,
    list: journey.map((stop) => ({
      label: stop.place,
      meta: stop.status === "now" ? "現在地" : stop.period,
    })),
  },
  strategy: {
    eyebrow: "C-B2 · CENTRAL · AFTER HOURS",
    title: "B2 STUDIO",
    number: "CB2",
    description: "人生、幸福、仕事、これからの選択を、完成した答えではなく作戦会議として記録する夜のフォーラム。",
    fact: "『人生の作戦会議室』は現在オープン準備中。",
  },
  harbor: {
    eyebrow: "W-01 · HARBOR EDGE",
    title: "ROUTE TERMINAL",
    number: "W01",
    description: "東京を出て、暮らすように世界を巡る。この港から伸びる航路は、旅が進むたびに新しい土地へ延びていく。",
    fact: `現在地 ${profile.currentLocation.place} ／ 次の街 ${profile.nextLocation}`,
    list: journey.map((stop) => ({
      label: stop.place,
      meta: stop.status === "now" ? "NOW" : stop.period,
    })),
  },
  construction: {
    eyebrow: "N-01 · NORTH YARD · ALWAYS BUILDING",
    title: "01 YARD",
    number: "N01",
    description: "思いついたら、まず建てる。小さなアプリ、実験、完成しなかったものまで、次の区画をつくる街の心臓部。",
    fact: `${otherApps.length}の小さな制作物が稼働・保存されています。`,
    list: otherApps.map((app) => ({ label: app.name, href: app.href, meta: "PROJECT" })),
  },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15L15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function LandmarkPreview({
  place,
  onEnter,
  onInspect,
}: {
  place: CityPlace | null;
  onEnter: (id: string) => void;
  onInspect: (id: string) => void;
}) {
  if (!place) {
    return (
      <aside className="landmark-preview is-idle">
        <span className="preview-index">01</span>
        <div>
          <p>CODE = PLACE</p>
          <span>地図コードを選ぶと、作品や記録へ移動できます。</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="landmark-preview" aria-live="polite">
      <span className={`preview-status status-${place.status}`}>{place.status === "building" ? "UNDER CONSTRUCTION" : place.status.toUpperCase()}</span>
      <p>{place.code} · {place.district}</p>
      <h2>{place.name}</h2>
      <span className="preview-summary">{place.summary}<br />行先：{place.destination}</span>
      <div className="preview-actions">
        <button type="button" onClick={() => onEnter(place.id)}>
          {place.action}<ArrowIcon />
        </button>
        {INTERNAL_DETAILS[place.id] && (
          <button className="secondary" type="button" onClick={() => onInspect(place.id)}>
            QUICK INFO
          </button>
        )}
      </div>
    </aside>
  );
}

const GUIDE_IDS = [
  "station",
  "tripvlog",
  "haku",
  "stocka",
  "cinema",
  "library",
  "strategy",
  "harbor",
  "construction",
];

const GUIDE_PLACES = GUIDE_IDS.flatMap((id) => {
  const place = cityPlaces.find((candidate) => candidate.id === id);
  return place ? [place] : [];
});

function FacilityGuide({ onEnter, onOpenAll }: { onEnter: (id: string) => void; onOpenAll: () => void }) {
  return (
    <nav className="facility-guide" aria-label="CITY 01 施設ガイド">
      <div className="facility-guide-head">
        <span><b>MAP KEY</b> / SELECT A PLACE</span>
        <button type="button" onClick={onOpenAll}>ALL {String(cityPlaces.length).padStart(2, "0")}</button>
      </div>
      <div className="facility-guide-list">
        {GUIDE_PLACES.map((place) => (
          <button key={place.id} type="button" onClick={() => onEnter(place.id)}>
            <span>{place.code}</span>
            <span><strong>{place.shortName}</strong><small>{place.destination}</small></span>
            <span>ENTER →</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function CityPortfolio() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const [enteringId, setEnteringId] = useState<string | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const enteringRef = useRef(false);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const directoryCloseRef = useRef<HTMLButtonElement>(null);
  const selected = selectedId ? INTERNAL_DETAILS[selectedId] : null;
  const previewPlace = useMemo(
    () => cityPlaces.find((place) => place.id === previewId) ?? null,
    [previewId],
  );

  const inspectPlace = (id: string) => {
    setIntroOpen(false);
    setSelectedId(id);
    setDirectoryOpen(false);
  };

  const closePanel = () => setSelectedId(null);
  const closeDirectory = () => setDirectoryOpen(false);

  const openDirectory = () => {
    setIntroOpen(false);
    setSelectedId(null);
    setDirectoryOpen(true);
  };

  const enterPlace = (id: string) => {
    if (enteringRef.current) return;
    const place = cityPlaces.find((candidate) => candidate.id === id);
    if (!place) return;

    enteringRef.current = true;
    setIntroOpen(false);
    setDirectoryOpen(false);
    setSelectedId(null);
    setPreviewId(id);
    setEnteringId(id);
    router.prefetch(place.path);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enterTimerRef.current = window.setTimeout(() => router.push(place.path), reduceMotion ? 0 : 700);
  };

  useEffect(() => () => {
    if (enterTimerRef.current !== null) window.clearTimeout(enterTimerRef.current);
  }, []);

  useEffect(() => {
    if (directoryOpen) directoryCloseRef.current?.focus();
    else if (selected) panelCloseRef.current?.focus();
  }, [directoryOpen, selected]);

  useEffect(() => {
    if (!directoryOpen && !selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (directoryOpen) closeDirectory();
      else closePanel();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [directoryOpen, selected]);

  const previewPlaceOnMap = (id: string | null) => {
    setPreviewId(id);
    if (id) setIntroOpen(false);
  };

  const enteringPlace = enteringId
    ? cityPlaces.find((place) => place.id === enteringId) ?? null
    : null;

  return (
    <main className={`portfolio-shell${enteringPlace ? " is-entering" : ""}`}>
      <header className="city-header">
        <button className="brand" type="button" onClick={() => { closePanel(); closeDirectory(); }} aria-label="CITY 01の地図へ戻る">
          <span className="brand-mark"><i>01</i></span>
          <span>
            <strong>CITY 01</strong>
            <small>A LIVING CITY BY SHOSUKE SATO</small>
          </span>
        </button>

        <div className="city-status" aria-label="街の現在の状態">
          <span className="status-light" />
          <span>LIVE FROM {profile.currentLocation.place}</span>
          <span className="status-divider" />
          <span>JOURNEY DAY <DayCounter /></span>
        </div>

        <nav className="header-actions" aria-label="街のメニュー">
          <button type="button" onClick={() => enterPlace("station")}>ABOUT</button>
          <button className="directory-button" type="button" onClick={() => directoryOpen ? closeDirectory() : openDirectory()} aria-expanded={directoryOpen} aria-controls="city-directory">
            <span className="directory-icon"><i /><i /><i /></span>
            CITY GUIDE
          </button>
        </nav>
      </header>

      <section className="city-stage" aria-label="CITY 01を探索する">
        {introOpen && <div className="city-intro">
          <button className="intro-dismiss" type="button" onClick={() => setIntroOpen(false)} aria-label="紹介を閉じて街を見る">×</button>
          <p><span>01</span> IDEAS BECOME PLACES</p>
          <h1>つくったものが、<br />街になっていく。</h1>
          <span>建物のコードを選ぶと、作品・映像・文章のための施設へ入れます。</span>
          <button className="intro-guide" type="button" onClick={openDirectory}>行き先を選ぶ <b>→</b></button>
        </div>}

        <IsometricCity selectedId={selectedId} enteringId={enteringId} onEnter={enterPlace} onPreview={previewPlaceOnMap} />
        <LandmarkPreview place={previewPlace} onEnter={enterPlace} onInspect={inspectPlace} />
        <FacilityGuide onEnter={enterPlace} onOpenAll={openDirectory} />

        <div className="city-coordinate" aria-hidden="true">
          <span>CITY 01 / WATERFRONT</span>
          <span>BUILT BY SHOSUKE SATO</span>
        </div>

        <nav className="social-dock" aria-label="外部リンク">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
          ))}
        </nav>

        <div className="city-ticker" aria-label="街の最新情報">
          <span className="ticker-label">CITY 01 LIVE</span>
          <a href={`https://www.youtube.com/watch?v=${films[0].id}`} target="_blank" rel="noopener noreferrer">
            <small>NOW SHOWING</small>{films[0].title}<b>↗</b>
          </a>
          <a href={featuredArticle.href} target="_blank" rel="noopener noreferrer">
            <small>NEW ARRIVAL</small>{featuredArticle.title}<b>↗</b>
          </a>
        </div>
      </section>

      {directoryOpen && (
        <button
          className="directory-backdrop"
          type="button"
          onClick={closeDirectory}
          aria-label="CITY GUIDEを閉じる"
          style={{ position: "fixed", inset: 0, zIndex: 55, border: 0, background: "rgba(20, 56, 76, .2)", cursor: "default" }}
        />
      )}

      <aside
        id="city-directory"
        className={`directory-panel${directoryOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="directory-title"
        aria-hidden={!directoryOpen}
        inert={!directoryOpen}
      >
        <div className="directory-head">
          <div>
            <p>CITY 01 / WAYFINDING</p>
            <h2 id="directory-title">行き先を選ぶ</h2>
          </div>
          <button ref={directoryCloseRef} type="button" onClick={closeDirectory} aria-label="CITY GUIDEを閉じる">×</button>
        </div>
        <p className="directory-intro">すべての施設には地図コードがあります。選ぶと建物へズームし、CITY 01内の館内ページへ入ります。</p>
        <div className="directory-list">
          {GUIDE_PLACES.map((place) => (
            <button key={place.id} type="button" onClick={() => enterPlace(place.id)} className={enteringId === place.id ? "is-active" : ""}>
              <span>{place.code}</span>
              <span>
                <strong>{place.name}</strong>
                <small>{place.district} · 行先：{place.destination}</small>
              </span>
              <span>ENTER →</span>
            </button>
          ))}
        </div>
      </aside>

      {selected && (
        <>
          <button
            className="panel-backdrop"
            type="button"
            onClick={closePanel}
            aria-label="施設案内を閉じる"
            style={{ position: "fixed", inset: 0, zIndex: 45, border: 0, background: "rgba(25, 66, 88, .08)", cursor: "default" }}
          />
          <aside
            className="place-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`place-panel-${selectedId}`}
            aria-describedby={`place-description-${selectedId}`}
          >
          <button ref={panelCloseRef} className="panel-close" type="button" onClick={closePanel} aria-label="施設案内を閉じる">×</button>
          <div className="panel-number">{selected.number}</div>
          <p className="panel-eyebrow">{selected.eyebrow}</p>
          <h2 id={`place-panel-${selectedId}`}>{selected.title}</h2>
          <p className="panel-fact">{selected.fact}</p>
          <p id={`place-description-${selectedId}`} className="panel-description">{selected.description}</p>
          {selected.list && (
            <div className="panel-list">
              {selected.list.map((item, index) => item.href ? (
                <a key={`${item.label}-${index}`} href={item.href} target="_blank" rel="noopener noreferrer">
                  <span>{item.label}</span><small>{item.meta}</small>
                </a>
              ) : (
                <div key={`${item.label}-${index}`}><span>{item.label}</span><small>{item.meta}</small></div>
              ))}
            </div>
          )}
          </aside>
        </>
      )}

      {enteringPlace && (
        <div className="city-entering" role="status" aria-live="assertive">
          <span>{enteringPlace.code}</span>
          <strong>ENTERING {enteringPlace.name}</strong>
          <small>{enteringPlace.destination}</small>
        </div>
      )}

      <div className="edge-copy" aria-hidden="true">IDEAS BECOME PLACES / CITY 01</div>
    </main>
  );
}
