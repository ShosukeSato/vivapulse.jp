"use client";

import { useMemo, useState } from "react";
import DayCounter from "@/components/DayCounter";
import IsometricCity from "@/components/IsometricCity";
import { cityPlaces, type CityPlace } from "@/data/city";
import {
  featuredArticle,
  films,
  journey,
  otherApps,
  products,
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
    eyebrow: "CITY CENTER · LIVE",
    title: "現在地中央駅",
    number: "00",
    description: profile.bio,
    fact: `${profile.currentLocation.place}から、${profile.nextLocation}へ向かう途中。`,
    list: journey.map((stop) => ({
      label: stop.place,
      meta: stop.status === "now" ? "現在地" : stop.period,
    })),
  },
  strategy: {
    eyebrow: "CITY HALL B2 · LATE NIGHT",
    title: "人生の作戦会議室",
    number: "06",
    description: "市役所の地下二階にある秘密の放送室。人生、幸福、仕事、これからの選択を、完成した答えではなく作戦会議として記録する。",
    fact: "表通りでは話さないことを、深夜に放送中。",
  },
  harbor: {
    eyebrow: "WATERFRONT · DEPARTURES",
    title: "世界一周港",
    number: "07",
    description: "東京を出て、暮らすように世界を巡る。この港から伸びる航路は、旅が進むたびに新しい土地へ延びていく。",
    fact: `現在地 ${profile.currentLocation.place} ／ 次の街 ${profile.nextLocation}`,
    list: journey.map((stop) => ({
      label: stop.place,
      meta: stop.status === "now" ? "NOW" : stop.period,
    })),
  },
  construction: {
    eyebrow: "NORTHWEST · ALWAYS BUILDING",
    title: "ゼロイチ建設区",
    number: "08",
    description: "思いついたら、まず建てる。小さなアプリ、実験、完成しなかったものまで、次の区画をつくる街の心臓部。",
    fact: `${otherApps.length}の小さな制作物が稼働・保存されています。`,
    list: otherApps.map((app) => ({ label: app.name, href: app.href, meta: "PROJECT" })),
  },
};

const SECONDARY_LINKS = Object.fromEntries(
  products.map((product) => [
    product.id,
    product.appStore ? { label: "App Store", href: product.appStore } : null,
  ]),
) as Record<string, { label: string; href: string } | null>;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15L15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function LandmarkPreview({ place }: { place: CityPlace | null }) {
  if (!place) {
    return (
      <aside className="landmark-preview is-idle">
        <span className="preview-index">MAP</span>
        <div>
          <p>街を探索する</p>
          <span>建物を選ぶと、その場所へ直接入れます。</span>
        </div>
      </aside>
    );
  }

  const secondary = SECONDARY_LINKS[place.id];
  return (
    <aside className="landmark-preview" aria-live="polite">
      <span className={`preview-status status-${place.status}`}>{place.status === "building" ? "UNDER CONSTRUCTION" : place.status.toUpperCase()}</span>
      <p>{place.district}</p>
      <h2>{place.name}</h2>
      <span className="preview-summary">{place.summary}</span>
      <div className="preview-actions">
        {place.href ? (
          <a href={place.href} target="_blank" rel="noopener noreferrer">
            {place.action}<ArrowIcon />
          </a>
        ) : (
          <span>{place.action} →</span>
        )}
        {secondary && (
          <a className="secondary" href={secondary.href} target="_blank" rel="noopener noreferrer">
            {secondary.label}<ArrowIcon />
          </a>
        )}
      </div>
    </aside>
  );
}

export default function CityPortfolio() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
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

  const previewPlaceOnMap = (id: string | null) => {
    setPreviewId(id);
    if (id) setIntroOpen(false);
  };

  return (
    <main className="portfolio-shell">
      <header className="city-header">
        <button className="brand" type="button" onClick={() => setSelectedId(null)} aria-label="途中市の地図へ戻る">
          <span className="brand-mark"><i>途</i></span>
          <span>
            <strong>途中市</strong>
            <small>TOCHU CITY / EST. 2026</small>
          </span>
        </button>

        <div className="city-status" aria-label="街の現在の状態">
          <span className="status-light" />
          <span>LIVE FROM {profile.currentLocation.place}</span>
          <span className="status-divider" />
          <span>JOURNEY DAY <DayCounter /></span>
        </div>

        <nav className="header-actions" aria-label="街のメニュー">
          <button type="button" onClick={() => inspectPlace("station")}>ABOUT</button>
          <button className="directory-button" type="button" onClick={() => setDirectoryOpen((open) => !open)} aria-expanded={directoryOpen}>
            <span className="directory-icon"><i /><i /><i /></span>
            CITY GUIDE
          </button>
        </nav>
      </header>

      <section className="city-stage" aria-label="途中市を探索する">
        {introOpen && <div className="city-intro">
          <p><span>01</span> A CITY BUILT FROM IDEAS</p>
          <h1>さとうしょうすけの<br />活動が、街になった。</h1>
          <span>アプリは店に、文章は本に、映像は映画に。<br />建物を押すと、その場所へ直接入れます。</span>
          <button type="button" onClick={() => inspectPlace("station")}>この街について <b>→</b></button>
        </div>}

        <IsometricCity selectedId={selectedId} onSelect={inspectPlace} onPreview={previewPlaceOnMap} />
        <LandmarkPreview place={previewPlace} />

        <div className="city-coordinate" aria-hidden="true">
          <span>WATERFRONT CITY</span>
          <span>EXPANDING SINCE 2026</span>
        </div>

        <nav className="social-dock" aria-label="外部リンク">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
          ))}
        </nav>

        <div className="city-ticker" aria-label="街の最新情報">
          <span className="ticker-label">CITY NEWS</span>
          <a href={`https://www.youtube.com/watch?v=${films[0].id}`} target="_blank" rel="noopener noreferrer">
            <small>NOW SHOWING</small>{films[0].title}<b>↗</b>
          </a>
          <a href={featuredArticle.href} target="_blank" rel="noopener noreferrer">
            <small>NEW ARRIVAL</small>{featuredArticle.title}<b>↗</b>
          </a>
        </div>
      </section>

      <aside className={`directory-panel${directoryOpen ? " is-open" : ""}`} aria-hidden={!directoryOpen} inert={!directoryOpen}>
        <div className="directory-head">
          <div>
            <p>TOCHU CITY DIRECTORY</p>
            <h2>どこへ行く？</h2>
          </div>
          <button type="button" onClick={() => setDirectoryOpen(false)} aria-label="観光案内所を閉じる">×</button>
        </div>
        <p className="directory-intro">外部施設はその場所へ直接移動します。街の施設は案内パネルが開きます。</p>
        <div className="directory-list">
          {cityPlaces.map((place, index) => {
            const content = (
              <>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span><strong>{place.name}</strong><small>{place.district} · {place.summary}</small></span>
                <span>{place.href ? "↗" : "→"}</span>
              </>
            );
            return place.href ? (
              <a key={place.id} href={place.href} target="_blank" rel="noopener noreferrer" onClick={() => setDirectoryOpen(false)}>{content}</a>
            ) : (
              <button key={place.id} type="button" onClick={() => inspectPlace(place.id)} className={selectedId === place.id ? "is-active" : ""}>{content}</button>
            );
          })}
        </div>
      </aside>

      {selected && (
        <aside className="place-panel" aria-live="polite">
          <button className="panel-close" type="button" onClick={() => setSelectedId(null)} aria-label="詳細を閉じる">×</button>
          <div className="panel-number">{selected.number}</div>
          <p className="panel-eyebrow">{selected.eyebrow}</p>
          <h2>{selected.title}</h2>
          <p className="panel-fact">{selected.fact}</p>
          <p className="panel-description">{selected.description}</p>
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
      )}

      <div className="edge-copy" aria-hidden="true">THE CITY IS NEVER FINISHED</div>
    </main>
  );
}
