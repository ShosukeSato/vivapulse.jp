"use client";

import { useState } from "react";
import DayCounter from "@/components/DayCounter";
import IsometricCity from "@/components/IsometricCity";
import { cityPlaces } from "@/data/city";
import {
  articles,
  channelUrl,
  featuredArticle,
  films,
  journey,
  otherApps,
  products,
  profile,
  socials,
} from "@/data/content";

type DetailLink = { label: string; href: string; primary?: boolean };
type Detail = {
  eyebrow: string;
  title: string;
  number: string;
  description: string;
  fact?: string;
  links: DetailLink[];
  list?: { label: string; meta?: string; href?: string }[];
};

function makeDetails(): Record<string, Detail> {
  const byProduct = Object.fromEntries(products.map((product) => [product.id, product]));
  const tripvlog = byProduct.tripvlog;
  const haku = byProduct.haku;
  const stocka = byProduct.stocka;

  return {
    station: {
      eyebrow: "CITY CENTER · LIVE",
      title: "現在地中央駅",
      number: "00",
      description: profile.bio,
      fact: `${profile.currentLocation.place}から、次の街へ向かう途中。`,
      links: [],
      list: journey.map((stop) => ({
        label: stop.place,
        meta: stop.status === "now" ? "現在地" : stop.period,
      })),
    },
    tripvlog: {
      eyebrow: "MAKERS DISTRICT · OPEN",
      title: "TripVlog 映像店",
      number: "01",
      description: tripvlog.description,
      fact: tripvlog.tagline,
      links: [
        ...(tripvlog.appStore ? [{ label: "App Store", href: tripvlog.appStore, primary: true }] : []),
        { label: "公式サイト", href: tripvlog.lp },
      ],
    },
    haku: {
      eyebrow: "MAKERS DISTRICT · OPEN",
      title: "HAKU 写真館",
      number: "02",
      description: haku.description,
      fact: haku.tagline,
      links: [
        ...(haku.appStore ? [{ label: "App Store", href: haku.appStore, primary: true }] : []),
        { label: "公式サイト", href: haku.lp },
      ],
    },
    stocka: {
      eyebrow: "MAKERS DISTRICT · OPEN",
      title: "Stocka 語学学校",
      number: "03",
      description: stocka.description,
      fact: stocka.tagline,
      links: [
        ...(stocka.appStore ? [{ label: "App Store", href: stocka.appStore, primary: true }] : []),
        { label: "公式サイト", href: stocka.lp },
      ],
    },
    library: {
      eyebrow: "ARCHIVE QUARTER · 220+ TEXTS",
      title: "途中市立図書館",
      number: "04",
      description: "旅、個人開発、人生の選択。これまで書いてきた220本以上の文章を収蔵する、この街で最も大きな建物。",
      fact: `中央展示室：${featuredArticle.title}`,
      links: [
        { label: "図書館に入る", href: "https://note.com/shosuke240557", primary: true },
        { label: "中央展示を読む", href: featuredArticle.href },
      ],
      list: articles.map((article) => ({ label: article.title, meta: article.date, href: article.href })),
    },
    broadcast: {
      eyebrow: "BROADCAST ROW · ON AIR",
      title: "旅の中央放送局",
      number: "05",
      description: "タダ飯・タダ宿で世界一周。訪れた街、出会った人、そこで考えたことを、旅の現在地から放送する。",
      fact: films[0]?.title,
      links: [{ label: "放送局を観る", href: channelUrl, primary: true }],
      list: films.map((film) => ({
        label: film.title,
        meta: film.place,
        href: `https://www.youtube.com/watch?v=${film.id}`,
      })),
    },
    strategy: {
      eyebrow: "CITY HALL B2 · LATE NIGHT",
      title: "人生の作戦会議室",
      number: "06",
      description: "市役所の地下二階にある小さな放送室。人生、幸福、仕事、これからの選択を、完成した答えではなく作戦会議として記録する。",
      fact: "表通りでは話さないことを、深夜に放送中。",
      links: [],
    },
    harbor: {
      eyebrow: "WATERFRONT · DEPARTURES",
      title: "世界一周港",
      number: "07",
      description: "東京を出て、暮らすように世界を巡る。この港から伸びる航路は、旅が進むたびに新しい土地へ延びていく。",
      fact: `現在地 ${profile.currentLocation.place} ／ 次の街 ${profile.nextLocation}`,
      links: [],
      list: journey.map((stop) => ({ label: stop.place, meta: stop.status === "now" ? "NOW" : stop.period })),
    },
    construction: {
      eyebrow: "NORTHWEST · ALWAYS BUILDING",
      title: "ゼロイチ建設区",
      number: "08",
      description: "思いついたら、まず建てる。小さなアプリ、実験、完成しなかったものまで、この街の次の区画をつくっている。",
      fact: `${otherApps.length}の小さな制作物が稼働・保存されています。`,
      links: [],
      list: otherApps.map((app) => ({ label: app.name, href: app.href, meta: "PROJECT" })),
    },
  };
}

const CITY_DETAILS = makeDetails();

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15L15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function CityPortfolio() {
  const [selectedId, setSelectedId] = useState<string | null>("station");
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const selected = selectedId ? CITY_DETAILS[selectedId] : null;

  const choosePlace = (id: string) => {
    setSelectedId(id);
    setDirectoryOpen(false);
  };

  return (
    <main className="portfolio-shell">
      <header className="city-header">
        <button className="brand" type="button" onClick={() => choosePlace("station")}>
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
          <span>DAY <DayCounter /></span>
        </div>

        <button className="directory-button" type="button" onClick={() => setDirectoryOpen((open) => !open)} aria-expanded={directoryOpen}>
          <span className="directory-icon"><i /><i /><i /></span>
          CITY GUIDE
        </button>
      </header>

      <section className="city-stage" aria-label="途中市を探索する">
        <div className="hero-copy">
          <p className="overline"><span>01</span> A LIVING PORTFOLIO</p>
          <h1>つくるたび、<br />街になる。</h1>
          <p>さとうしょうすけが何かを始めるたびに、<br className="desktop-break" />建物が増え、道が延びていく未完成の街。</p>
        </div>

        <IsometricCity selectedId={selectedId} onSelect={setSelectedId} />

        <div className="city-coordinate" aria-hidden="true">
          <span>35.6762° N</span>
          <span>139.6503° E</span>
        </div>

        <nav className="social-dock" aria-label="外部リンク">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
          ))}
        </nav>
      </section>

      <aside className={`directory-panel${directoryOpen ? " is-open" : ""}`} aria-hidden={!directoryOpen} inert={!directoryOpen}>
        <div className="directory-head">
          <div>
            <p>TOCHU CITY</p>
            <h2>観光案内所</h2>
          </div>
          <button type="button" onClick={() => setDirectoryOpen(false)} aria-label="観光案内所を閉じる">×</button>
        </div>
        <p className="directory-intro">建物を選ぶと、さとうしょうすけの活動と記録を見られます。</p>
        <div className="directory-list">
          {cityPlaces.map((place, index) => (
            <button key={place.id} type="button" onClick={() => choosePlace(place.id)} className={selectedId === place.id ? "is-active" : ""}>
              <span>{String(index).padStart(2, "0")}</span>
              <span><strong>{place.name}</strong><small>{place.district}</small></span>
              <span>↗</span>
            </button>
          ))}
        </div>
      </aside>

      {selected && (
        <aside className="place-panel" aria-live="polite">
          <button className="panel-close" type="button" onClick={() => setSelectedId(null)} aria-label="詳細を閉じる">×</button>
          <div className="panel-number">{selected.number}</div>
          <p className="panel-eyebrow">{selected.eyebrow}</p>
          <h2>{selected.title}</h2>
          {selected.fact && <p className="panel-fact">{selected.fact}</p>}
          <p className="panel-description">{selected.description}</p>

          {selected.list && (
            <div className="panel-list">
              {selected.list.map((item, index) =>
                item.href ? (
                  <a key={`${item.label}-${index}`} href={item.href} target="_blank" rel="noopener noreferrer">
                    <span>{item.label}</span><small>{item.meta}</small>
                  </a>
                ) : (
                  <div key={`${item.label}-${index}`}>
                    <span>{item.label}</span><small>{item.meta}</small>
                  </div>
                )
              )}
            </div>
          )}

          {selected.links.length > 0 && (
            <div className="panel-actions">
              {selected.links.map((link) => (
                <a key={link.href} className={link.primary ? "primary" : ""} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}<ArrowIcon />
                </a>
              ))}
            </div>
          )}
        </aside>
      )}

      <div className="edge-copy" aria-hidden="true">THE CITY IS NEVER FINISHED</div>
    </main>
  );
}
