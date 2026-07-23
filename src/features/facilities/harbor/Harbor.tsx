import Image from "next/image";
import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { featuredArticle, films, journey, profile } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import CurrentLocationName from "@/features/shared/CurrentLocationName";
import FeaturedArticleTitle from "@/features/shared/FeaturedArticleTitle";
import styles from "./harbor.module.css";

const departureFilm = films.find((film) => film.id === "exr5-6Sb9h0")!;
const indonesiaFilm = films.find((film) => film.id === "Vkf4wQSLD04")!;
const currentStop = journey.find((stop) => stop.status === "now")!;
const nextStop = journey.find((stop) => stop.status === "next")!;

const routePoints = [
  { x: 888, y: 139, name: "東京", state: "done" },
  { x: 797, y: 246, name: "インドネシア", state: "done" },
  { x: 724, y: 211, name: "スリランカ", state: "now" },
  { x: 697, y: 184, name: "インド", state: "next" },
  { x: 623, y: 126, name: "ジョージア", state: "planned" },
] as const;

function WorldLand() {
  return (
    <g className={styles.land} aria-hidden="true">
      <path d="M62 106 93 76 150 61 203 72 249 65 307 91 337 124 322 151 282 159 260 185 225 177 194 151 152 158 117 142 84 139Z" />
      <path d="M253 189 289 204 313 240 304 281 283 322 264 374 243 350 232 304 213 272 218 229Z" />
      <path d="M356 67 384 48 414 54 425 82 403 102 371 95Z" />
      <path d="M475 112 514 86 558 84 591 67 636 75 667 61 711 69 747 84 792 73 837 84 884 105 921 128 904 153 867 151 837 174 796 172 766 191 730 181 699 203 659 191 625 169 590 172 556 151 520 150 491 137Z" />
      <path d="M515 153 560 151 603 166 628 192 619 226 603 269 576 320 550 301 532 266 520 224 492 195Z" />
      <path d="M784 274 817 255 861 266 892 292 876 326 840 338 801 323 777 299Z" />
      <path d="M760 218 779 213 790 226 775 234 756 228Z" />
      <path d="M791 235 806 231 820 239 807 247 788 244Z" />
      <path d="M872 137 879 129 885 138 880 151 875 153Z" />
      <path d="M718 211 724 206 728 214 725 224 720 221Z" />
      <path d="M406 167 422 158 434 168 425 183 410 181Z" />
    </g>
  );
}

function Routes() {
  return (
    <g>
      <polyline className={styles.routeDone} points="888,139 797,246 724,211" />
      <polyline className={styles.routeNext} points="724,211 697,184 623,126" />
      {routePoints.map((stop) => (
        <g className={`${styles.mapStop} ${styles[stop.state]}`} key={stop.name}>
          <rect x={stop.x - 7} y={stop.y - 7} width="14" height="14" />
          <circle cx={stop.x} cy={stop.y} r="3" />
          <text x={stop.x} y={stop.y - 14} textAnchor="middle">{stop.name}</text>
        </g>
      ))}
    </g>
  );
}

function RouteMap() {
  return (
    <div className={styles.maps}>
      <svg className={styles.worldMap} viewBox="0 0 1000 430" role="img" aria-label="東京からインドネシア、スリランカを経て、インド、ジョージアへ向かう世界一周ルート">
        <title>世界一周ルートの世界地図</title>
        <g className={styles.graticule} aria-hidden="true">
          <path d="M0 107.5H1000M0 215H1000M0 322.5H1000M250 0V430M500 0V430M750 0V430" />
        </g>
        <WorldLand />
        <Routes />
      </svg>
      <svg className={styles.regionMap} viewBox="480 55 455 250" role="img" aria-label="世界地図のアジア区間を拡大。東京、インドネシア、スリランカ、インド、ジョージアの順に進む">
        <title>世界一周ルート、アジア区間の拡大図</title>
        <g className={styles.graticule} aria-hidden="true">
          <path d="M500 107.5H950M500 215H950M500 322.5H950M625 55V305M750 55V305M875 55V305" />
        </g>
        <WorldLand />
        <Routes />
      </svg>
    </div>
  );
}

const stateCopy = {
  done: "滞在済み",
  now: "現在地",
  next: "次の目的地",
  planned: "旅程",
} as const;

export default function Harbor({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#route-map">現在の航路へ移動</a>
      <FacilityBar place={place} />

      <main>
        <header className={styles.harborHead}>
          <div>
            <p>ROUTE TERMINAL · WORLD JOURNEY</p>
            <h1>
              <span className={styles.titleLine}><span>東京から</span><wbr /><span>世界へ。</span></span>
              <span className={styles.titleLine}><span>旅の現在地を</span><wbr /><span>ひらく港。</span></span>
            </h1>
          </div>
          <div className={styles.nowBoard}>
            <span>現在地 · {currentStop.period}</span>
            <strong><CurrentLocationName place={profile.currentLocation.place} /></strong>
            <p>{profile.currentLocation.detail}</p>
            <span className={styles.nextPort}>次の目的地　{nextStop.place}</span>
          </div>
        </header>

        <section className={styles.chartRoom} id="route-map" aria-labelledby="chart-title">
          <header>
            <div>
              <p>ROUTE CHART · 2026.05—</p>
              <h2 id="chart-title">世界一周、現在の航路。</h2>
            </div>
            <ul className={styles.legend} aria-label="航路の凡例">
              <li><i className={styles.doneMark} />移動済み</li>
              <li><i className={styles.nowMark} />現在地</li>
              <li><i className={styles.planMark} />この先の予定</li>
            </ul>
          </header>
          <RouteMap />
          <p className={styles.mapNote}>等距円筒図法の概略図。位置は国・地域単位で示し、確定していない都市や座標は記載していません。</p>
        </section>

        <section className={styles.logbook} aria-labelledby="logbook-title">
          <header>
            <p>PORT LOG</p>
            <h2 id="logbook-title">旅程記録</h2>
          </header>
          <ol>
            {journey.map((stop, index) => (
              <li className={styles[stop.status]} key={`${stop.place}-${stop.period}`}>
                <span className={styles.stopNumber}>{String(index + 1).padStart(2, "0")}</span>
                <time>{stop.period}</time>
                <div><strong>{stop.place}</strong>{stop.note && <p>{stop.note}</p>}</div>
                <span className={styles.state}>{stateCopy[stop.status]}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.dispatches} aria-labelledby="dispatch-title">
          <header>
            <p>DISPATCHES FROM THE ROUTE</p>
            <h2 id="dispatch-title">航路から届いた記録</h2>
          </header>

          <div className={styles.dispatchLayout}>
            <a className={styles.departureDispatch} href={`https://www.youtube.com/watch?v=${departureFilm.id}`} target="_blank" rel="noreferrer">
              <span className={styles.dispatchImage}>
                <Image src={`/media/cinema/${departureFilm.id}.jpg`} alt="東京から世界一周へ出発した日のYouTube映像サムネイル" width={480} height={360} />
                <i><PixelIcon name="play" /></i>
              </span>
              <span className={styles.dispatchMeta}>TOKYO · {departureFilm.date} · FILM</span>
              <strong>{departureFilm.title}</strong>
            </a>

            <div className={styles.routeDispatches}>
              <a href={`https://www.youtube.com/watch?v=${indonesiaFilm.id}`} target="_blank" rel="noreferrer">
                <Image src={`/media/cinema/${indonesiaFilm.id}.jpg`} alt="インドネシアの年越しを記録したYouTube映像サムネイル" width={1280} height={720} />
                <span><small>INDONESIA · FILM</small><strong>{indonesiaFilm.title}</strong></span>
              </a>
              <a href={featuredArticle.href} target="_blank" rel="noreferrer">
                <Image src="/media/archive/nc7487ff91841.webp" alt="世界一周の旅と、これまでに出会った人々を重ねた記事の見出し画像" width={1280} height={670} />
                <span><small>ON THE ROAD · NOTE</small><strong><FeaturedArticleTitle /></strong></span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>ROUTE TERMINAL / CITY 01</span>
        <p>旅が進むたびに、地図と記録を更新します。</p>
        <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
      </footer>
    </div>
  );
}
