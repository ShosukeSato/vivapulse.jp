import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cityPlaces, type CityPlace } from "@/data/city";
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
import styles from "./place.module.css";

type PageProps = { params: Promise<{ slug: string }> };

const slugFor = (place: CityPlace) => place.path.split("/").filter(Boolean).at(-1) ?? place.id;

const externalProps = {
  target: "_blank",
  rel: "noreferrer",
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return cityPlaces.map((place) => ({ slug: slugFor(place) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = cityPlaces.find((item) => slugFor(item) === slug);
  if (!place) return {};

  return {
    title: `${place.name} | CITY 01`,
    description: place.summary,
    alternates: { canonical: place.path },
  };
}

function ArrowIcon({ outward = false }: { outward?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={outward ? "M6 14 14 6M8 6h6v6" : "M15 10H5m4-4-4 4 4 4"} />
    </svg>
  );
}

function CityReturn({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={compact ? styles.returnCompact : styles.returnLink} href="/">
      <ArrowIcon />
      <span>{compact ? "MAP" : "街へ戻る"}</span>
    </Link>
  );
}

function ExternalButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={styles.primaryButton} href={href} {...externalProps}>
      <span>{children}</span>
      <ArrowIcon outward />
    </a>
  );
}

function EntranceTransition({ place }: { place: CityPlace }) {
  return (
    <div className={styles.entrance} aria-hidden="true">
      <div className={styles.entranceLeft} />
      <div className={styles.entranceRight} />
      <div className={styles.entranceSign}>
        <span>{place.code}</span>
        <strong>ENTERING</strong>
        <small>{place.name}</small>
      </div>
    </div>
  );
}

function CinemaInterior() {
  const [feature, ...lineup] = films;

  return (
    <>
      <section className={`${styles.featureRoom} ${styles.cinemaRoom}`} aria-labelledby="now-showing">
        <div className={styles.sectionHeading}>
          <span>SCREEN 01</span>
          <h2 id="now-showing">NOW SHOWING</h2>
          <p>世界のどこかで撮った最新作を、いちばん大きなスクリーンで。</p>
        </div>
        <a
          className={styles.heroScreen}
          href={`https://www.youtube.com/watch?v=${feature.id}`}
          aria-label={`${feature.title}をYouTubeで観る`}
          {...externalProps}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${feature.id}/maxresdefault.jpg`} alt="" />
          <span className={styles.screenShade} />
          <span className={styles.playButton} aria-hidden="true">▶</span>
          <span className={styles.screenCopy}>
            <small>{feature.place} · {feature.date}</small>
            <strong>{feature.title}</strong>
            <em>本編を観る ↗</em>
          </span>
        </a>
        <div className={styles.auditorium} aria-hidden="true">
          {Array.from({ length: 24 }, (_, index) => <i key={index} />)}
        </div>
      </section>

      <section className={styles.contentSection} aria-labelledby="screening-lineup">
        <div className={styles.sectionHeadingRow}>
          <div className={styles.sectionHeading}>
            <span>SCREENS 02—04</span>
            <h2 id="screening-lineup">上映中の作品</h2>
          </div>
          <p className={styles.counter}>{String(films.length).padStart(2, "0")} FILMS</p>
        </div>
        <div className={styles.posterGrid}>
          {lineup.map((film, index) => (
            <a
              className={styles.posterCard}
              href={`https://www.youtube.com/watch?v=${film.id}`}
              key={film.id}
              aria-label={`${film.title}をYouTubeで観る`}
              {...externalProps}
            >
              <span className={styles.posterImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${film.id}/hqdefault.jpg`} alt="" />
                <b>{String(index + 2).padStart(2, "0")}</b>
                <i aria-hidden="true">▶</i>
              </span>
              <span className={styles.posterMeta}>{film.place} · {film.date}</span>
              <strong>{film.title}</strong>
            </a>
          ))}
        </div>
        <div className={styles.endCta}>
          <p>次の上映は、旅先から届き次第。</p>
          <ExternalButton href={channelUrl}>YouTubeチャンネルへ</ExternalButton>
        </div>
      </section>
    </>
  );
}

const bookColors = ["#215e78", "#e05b45", "#d89a2b", "#2d7462", "#75548e", "#3f6fb4", "#9a5546"];

function LibraryInterior() {
  return (
    <>
      <section className={`${styles.featureRoom} ${styles.libraryRoom}`} aria-labelledby="curators-pick">
        <div className={styles.libraryWindow} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.sectionHeading}>
          <span>CURATOR&apos;S PICK · 2026.07</span>
          <h2 id="curators-pick">旅と一緒に育つ一冊。</h2>
        </div>
        <a className={styles.featureBook} href={featuredArticle.href} {...externalProps}>
          <span className={styles.featureBookCover}>
            <small>ESSAY / JOURNEY</small>
            <strong>{featuredArticle.title}</strong>
            <em>SHOSUKE SATO</em>
          </span>
          <span className={styles.featureBookText}>
            <small>{featuredArticle.date}</small>
            <span>{featuredArticle.excerpt}</span>
            <b>この本を読む <ArrowIcon outward /></b>
          </span>
        </a>
      </section>

      <section className={`${styles.contentSection} ${styles.archiveSection}`} aria-labelledby="open-shelves">
        <div className={styles.sectionHeadingRow}>
          <div className={styles.sectionHeading}>
            <span>OPEN SHELVES · SELECTED</span>
            <h2 id="open-shelves">ひらかれた書架</h2>
          </div>
          <p className={styles.counter}>220+ TEXTS</p>
        </div>
        <div className={styles.bookshelf}>
          <div className={styles.bookRow}>
            {articles.map((article, index) => (
              <a
                className={styles.book}
                href={article.href}
                key={article.href}
                style={{ "--book": bookColors[index % bookColors.length] } as CSSProperties}
                title={article.title}
                {...externalProps}
              >
                <span>{article.date}</span>
                <strong>{article.title}</strong>
                <small>SHOSUKE SATO</small>
              </a>
            ))}
          </div>
          <div className={styles.shelf} aria-hidden="true"><i>TRAVEL</i><i>IDEAS</i><i>01</i></div>
        </div>
        <div className={styles.catalogueGrid}>
          {articles.map((article, index) => (
            <a className={styles.catalogueCard} href={article.href} key={article.href} {...externalProps}>
              <span>{String(index + 1).padStart(3, "0")}</span>
              <div><small>{article.date}</small><strong>{article.title}</strong></div>
              <ArrowIcon outward />
            </a>
          ))}
        </div>
        <div className={styles.endCta}>
          <p>220本以上の全蔵書は、note本館で閲覧できます。</p>
          <ExternalButton href="https://note.com/shosuke240557">蔵書をすべて見る</ExternalButton>
        </div>
      </section>
    </>
  );
}

function HarborInterior() {
  return (
    <>
      <section className={`${styles.featureRoom} ${styles.harborRoom}`} aria-labelledby="voyage-log">
        <div className={styles.sectionHeading}>
          <span>VOYAGE LOG · 2026—</span>
          <h2 id="voyage-log">まだ、航路の途中。</h2>
          <p>決まっているのは次の港まで。街は、旅が進むたびに海の向こうへ広がる。</p>
        </div>
        <div className={styles.routeChart}>
          <svg viewBox="0 0 1000 390" role="img" aria-label="東京からジョージアまでの世界一周航路">
            <defs>
              <linearGradient id="sea" x1="0" x2="1"><stop stopColor="#d9f1f4" /><stop offset="1" stopColor="#a9dbe3" /></linearGradient>
              <filter id="routeGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <rect width="1000" height="390" rx="24" fill="url(#sea)" />
            <path className={styles.chartContour} d="M-50 80C160 5 250 125 410 56s335 30 640-45M-20 312c180-80 275 60 470-8s334-15 590-100" />
            <path className={styles.chartRouteBase} d="M100 250C205 105 320 300 430 175S630 85 705 190s115 48 195-55" />
            <path className={styles.chartRoute} d="M100 250C205 105 320 300 430 175S630 85 705 190" filter="url(#routeGlow)" />
            {journey.map((stop, index) => {
              const positions = [[100, 250], [275, 190], [430, 175], [705, 190], [900, 135]];
              const [x, y] = positions[index] ?? [900, 135];
              return (
                <g key={stop.place} transform={`translate(${x} ${y})`}>
                  <circle className={`${styles.chartPoint} ${styles[`chart_${stop.status}`]}`} r={stop.status === "now" ? 12 : 8} />
                  <text y={index % 2 ? 34 : -24} textAnchor="middle">{stop.place}</text>
                </g>
              );
            })}
            <g className={styles.chartVessel} transform="translate(652 160)"><path d="m0 14 32-7-10 18H4Z" /><path d="M14 7V0l12 7" /></g>
          </svg>
          <div className={styles.coordinates}>07°16&apos;N · 80°36&apos;E <span>LIVE</span></div>
        </div>
      </section>
      <section className={styles.contentSection} aria-labelledby="port-calls">
        <div className={styles.sectionHeadingRow}>
          <div className={styles.sectionHeading}><span>PORT CALLS</span><h2 id="port-calls">旅のしおり</h2></div>
          <p className={styles.counter}>{journey.length} STOPS</p>
        </div>
        <ol className={styles.itinerary}>
          {journey.map((stop, index) => (
            <li className={`${styles.itineraryStop} ${styles[`stop_${stop.status}`]}`} key={stop.place}>
              <div className={styles.itineraryNumber}>{String(index + 1).padStart(2, "0")}</div>
              <div className={styles.itineraryRail}><i /></div>
              <div className={styles.itineraryCopy}>
                <span>{stop.period} · {stop.status === "now" ? "NOW HERE" : stop.status.toUpperCase()}</span>
                <h3>{stop.place}</h3>
                {stop.note && <p>{stop.note}</p>}
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.boardingPass}>
          <span><small>PASSENGER</small><strong>SHOSUKE SATO</strong></span>
          <span><small>FROM</small><strong>TOKYO</strong></span>
          <span><small>TO</small><strong>UNKNOWN</strong></span>
          <b aria-label="boarding pass number">┃┃ ┃┃┃ ┃ ┃┃┃</b>
        </div>
      </section>
    </>
  );
}

function ProductInterior({ place }: { place: CityPlace }) {
  const product = products.find((item) => item.id === place.id);
  if (!product) return null;

  const exhibitCopy: Record<string, { label: string; rooms: [string, string][] }> = {
    tripvlog: { label: "MOVING IMAGE LAB", rooms: [["RECORD", "旅先で、好きなだけ撮る。"], ["ASSEMBLE", "日付・場所・地図を自動で編集。"], ["RELIVE", "一日が一本のvlogとして残る。"]] },
    haku: { label: "PHOTOGRAPHIC COLLECTION", rooms: [["CAPTURE", "人に残すのは、撮るという判断だけ。"], ["DEVELOP", "光と色を読み、淡い色調へ。"], ["FRAME", "余白まで含めて一枚の作品に。"]] },
    stocka: { label: "LANGUAGE LABORATORY", rooms: [["TRANSLATE", "旅先で出会った言葉を調べる。"], ["UNPACK", "構文・文法・単語をほどく。"], ["STOCK", "調べた英語が自分のカードになる。"]] },
  };
  const exhibit = exhibitCopy[product.id];

  return (
    <>
      <section className={`${styles.featureRoom} ${styles.productRoom}`} aria-labelledby="product-exhibit">
        <div className={styles.sectionHeading}><span>{exhibit.label}</span><h2 id="product-exhibit">{product.tagline}</h2></div>
        <div className={styles.productExhibit}>
          <div className={styles.iconPlinth}>
            <span className={styles.plinthLight} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {product.icon && <img src={product.icon} alt={`${product.name} アプリアイコン`} />}
            <i aria-hidden="true" />
          </div>
          <div className={styles.productStatement}>
            <small>EXHIBIT {place.code}</small>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>{product.caption}</span>
            <div className={styles.buttonRow}>
              <ExternalButton href={product.lp}>公式サイトを見る</ExternalButton>
              {product.appStore && <a className={styles.secondaryButton} href={product.appStore} {...externalProps}>App Store ↗</a>}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.contentSection} aria-labelledby="process-gallery">
        <div className={styles.sectionHeading}><span>HOW IT WORKS</span><h2 id="process-gallery">3つの展示室</h2></div>
        <div className={styles.processGrid}>
          {exhibit.rooms.map(([title, copy], index) => (
            <article key={title}><span>ROOM {String(index + 1).padStart(2, "0")}</span><b>{title}</b><p>{copy}</p><i aria-hidden="true">{index + 1}</i></article>
          ))}
        </div>
        <div className={styles.makerNote}>
          <span>MAKER&apos;S NOTE</span>
          <p>必要なものがなければ、つくる。旅の途中で感じた不便から生まれ、いまも実際の旅で使われているプロダクトです。</p>
        </div>
      </section>
    </>
  );
}

function FoundryInterior() {
  return (
    <>
      <section className={`${styles.featureRoom} ${styles.foundryRoom}`} aria-labelledby="foundry-floor">
        <div className={styles.sectionHeading}><span>PROTOTYPE FLOOR</span><h2 id="foundry-floor">思いつきが、街になる場所。</h2><p>完成品だけを置く展示室ではなく、ゼロから一が立ち上がった痕跡を残す工房。</p></div>
        <div className={styles.foundryMachine} aria-hidden="true"><i /><i /><i /><span>0</span><b>→</b><span>1</span></div>
      </section>
      <section className={styles.contentSection} aria-labelledby="prototype-index">
        <div className={styles.sectionHeadingRow}>
          <div className={styles.sectionHeading}><span>BUILT HERE</span><h2 id="prototype-index">小さな発明品</h2></div>
          <p className={styles.counter}>{otherApps.length} OBJECTS</p>
        </div>
        <div className={styles.prototypeGrid}>
          {otherApps.map((app, index) => (
            <a href={app.href} key={app.name} {...externalProps}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.prototypeObject} aria-hidden="true"><i /><i /><b>{app.name.slice(0, 1)}</b></div>
              <strong>{app.name}</strong>
              <small>OPEN PROJECT ↗</small>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function StationInterior() {
  return (
    <>
      <section className={`${styles.featureRoom} ${styles.stationRoom}`} aria-labelledby="station-board">
        <div className={styles.stationClock} aria-label="CITY 01 local time"><i /><b /></div>
        <div className={styles.sectionHeading}><span>CENTRAL CONCOURSE</span><h2 id="station-board">ようこそ、僕の現在地へ。</h2></div>
        <div className={styles.departureBoard}>
          <div><span>NAME</span><b>{profile.nameEn.toUpperCase()}</b><small>SHOSUKE</small></div>
          <div><span>NOW</span><b>{profile.currentLocation.place}</b><small>滞在中</small></div>
          <div><span>NEXT</span><b>{profile.nextLocation}</b><small>BOARDING SOON</small></div>
        </div>
      </section>
      <section className={styles.contentSection} aria-labelledby="about-passenger">
        <div className={styles.profileGrid}>
          <div className={styles.sectionHeading}><span>PASSENGER PROFILE</span><h2 id="about-passenger">さとうしょうすけ</h2><p>{profile.bio}</p></div>
          <div className={styles.currentCard}><small>CURRENT LOCATION</small><strong>{profile.currentLocation.place}</strong><p>{profile.currentLocation.detail}</p><i>● LIVE</i></div>
        </div>
        <div className={styles.stationLinks}>
          {socials.map((social, index) => <a href={social.href} key={social.label} {...externalProps}><span>{String(index + 1).padStart(2, "0")}</span><strong>{social.label}</strong><ArrowIcon outward /></a>)}
        </div>
        <p className={styles.departureNote}>{profile.departureNote}</p>
      </section>
    </>
  );
}

function StrategyInterior() {
  return (
    <>
      <section className={`${styles.featureRoom} ${styles.strategyRoom}`} aria-labelledby="night-session">
        <div className={styles.onAir}><i /> ON AIR</div>
        <div className={styles.sectionHeading}><span>AFTER HOURS · B2F</span><h2 id="night-session">人生の作戦会議室</h2><p>答えを教える場所ではなく、自分の次の一手を一緒に考えるための小さな放送室。</p></div>
        <div className={styles.studioDesk} aria-hidden="true"><span /><i /><b>◉</b><em /></div>
      </section>
      <section className={styles.contentSection} aria-labelledby="program-note">
        <div className={styles.strategyGrid}>
          <article><span>01 / QUESTION</span><h3>本当は、どうしたい？</h3><p>世間の正解ではなく、自分の声が聞こえるまで問いを置く。</p></article>
          <article><span>02 / ROUTE</span><h3>次の一歩を描く。</h3><p>大きな計画より、今夜決められる具体的な一手を。</p></article>
          <article><span>03 / LOG</span><h3>途中を残す。</h3><p>迷った時間も、やめた道も、次の誰かの地図になる。</p></article>
        </div>
        <div className={styles.quietNotice} id="program-note"><span>PROGRAM STATUS</span><strong>次回放送の準備中</strong><p>URLが開通したら、この放送室から聴けるようになります。</p></div>
      </section>
    </>
  );
}

function InteriorFor({ place }: { place: CityPlace }) {
  if (place.kind === "cinema") return <CinemaInterior />;
  if (place.kind === "library") return <LibraryInterior />;
  if (place.kind === "harbor") return <HarborInterior />;
  if (["tripvlog", "haku", "stocka"].includes(place.kind)) return <ProductInterior place={place} />;
  if (place.kind === "construction") return <FoundryInterior />;
  if (place.kind === "station") return <StationInterior />;
  return <StrategyInterior />;
}

export default async function PlacePage({ params }: PageProps) {
  const { slug } = await params;
  const place = cityPlaces.find((item) => slugFor(item) === slug);
  if (!place) notFound();

  return (
    <div className={`${styles.page} ${styles[`kind_${place.kind}`]}`}>
      <a className={styles.skipLink} href="#inside">館内コンテンツへ</a>
      <EntranceTransition place={place} />
      <header className={styles.topbar}>
        <CityReturn compact />
        <Link className={styles.cityBrand} href="/" aria-label="CITY 01の地図へ戻る">
          <span>CITY</span><b>01</b><small>INTERIOR NETWORK</small>
        </Link>
        <div className={styles.placeLocator}><span>{place.district}</span><b>{place.code}</b></div>
      </header>

      <main id="inside">
        <section className={styles.placeHero} aria-labelledby="place-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCode}>{place.code}</div>
          <div className={styles.heroCopy}>
            <span>{place.district} · {place.status.toUpperCase()}</span>
            <h1 id="place-title">{place.name}</h1>
            <p>{place.summary}</p>
          </div>
          <div className={styles.heroDirection} aria-hidden="true"><i /><span>YOU ARE INSIDE</span></div>
        </section>

        <InteriorFor place={place} />
      </main>

      <footer className={styles.footer}>
        <div><span>CITY 01</span><small>A LIVING PORTFOLIO BY SHOSUKE SATO</small></div>
        <CityReturn />
        {place.externalHref && <a href={place.externalHref} {...externalProps}>{place.destination} ↗</a>}
      </footer>
    </div>
  );
}
