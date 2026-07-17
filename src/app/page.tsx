import Reveal from "@/components/Reveal";
import DayCounter from "@/components/DayCounter";
import {
  profile,
  socials,
  products,
  otherApps,
  featuredArticle,
  articles,
  channelUrl,
  films,
  journey,
  type Product,
} from "@/data/content";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-10">
      <Header />
      <main>
        <Hero />
        <Works />
        <Writing />
        <Film />
        <Itinerary />
      </main>
      <Footer />
    </div>
  );
}

/* ───────────────────────── 頭書き ───────────────────────── */

function Header() {
  return (
    <header className="sticky top-0 z-40 -mx-6 flex items-baseline justify-between border-b border-rule/70 bg-paper/85 px-6 pb-4 pt-5 backdrop-blur-sm md:-mx-10 md:px-10">
      <a href="#top" className="text-sm tracking-[0.2em]">
        さとうしょうすけ
      </a>
      <nav className="flex gap-6 md:gap-8">
        {[
          ["#works", "作品"],
          ["#writing", "記録"],
          ["#film", "映像"],
          ["#itinerary", "旅程"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="caption text-ink-soft hover:text-shu transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ───────────────────────── 扉 ───────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[82vh] flex-col justify-center">
      {/* 縦書きの日付 */}
      <p
        className="tategaki absolute right-0 top-8 hidden text-xs text-ink-faint md:block"
        aria-hidden
      >
        {profile.departureNote}
      </p>

      <Reveal>
        <p className="caption mb-7 flex items-center gap-4">
          作品集
          <span className="inline-block h-px w-10 bg-rule align-middle" aria-hidden />
          アプリ ・ 文章 ・ 映像
        </p>
        <h1 className="text-[clamp(2.6rem,7.5vw,5.25rem)] font-semibold leading-[1.25] tracking-wide">
          旅の途中で、
          <br />
          つくる。
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-10 max-w-md text-[15px] leading-[2.1] text-ink-soft">
          {profile.bio}
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-y-3 border-t border-rule pt-5">
          <p className="caption flex items-center gap-2.5">
            <span className="shu-dot" />
            現在地 — {profile.currentLocation.place}
            <span className="hidden sm:inline text-ink-faint/70">
              ／ 旅の<DayCounter />日目
            </span>
          </p>
          <p className="caption">つぎの街 — {profile.nextLocation}</p>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 章の見出し ───────────────────────── */

function SectionTitle({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub: string;
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-5 border-t border-rule pt-5">
        <span className="text-sm text-ink-faint">{index}</span>
        <h2 className="text-2xl font-semibold tracking-[0.15em]">{title}</h2>
        <span className="caption ml-auto">{sub}</span>
      </div>
    </Reveal>
  );
}

/* ───────────────────────── 一、作品 ───────────────────────── */

function Works() {
  return (
    <section id="works" className="scroll-mt-10 pt-28 md:pt-36">
      <SectionTitle index="一" title="作品" sub="旅からうまれた三つのアプリ" />
      <div className="mt-4">
        {products.map((p, i) => (
          <WorkEntry key={p.id} product={p} index={["その一", "その二", "その三"][i] ?? ""} />
        ))}
      </div>
    </section>
  );
}

function WorkEntry({ product, index }: { product: Product; index: string }) {
  return (
    <Reveal>
      <article className="grid gap-8 border-b border-rule py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-3">
          <p className="caption mb-5">{index}</p>
          {product.icon ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.icon}
              alt={`${product.name} のアイコン`}
              loading="lazy"
              className="h-16 w-16 rounded-2xl border border-rule shadow-[0_10px_24px_-14px_rgba(60,50,32,0.35)]"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rule bg-white">
              <span className="h-5 w-5 rounded-full bg-[#e8b98a]" />
            </span>
          )}
          <p className="caption mt-5 leading-[2]">
            {product.caption.split(" ・ ").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="md:col-span-9">
          <h3 className="text-3xl font-semibold tracking-wide">{product.name}</h3>
          <p className="mt-3 font-semibold text-ink-soft">{product.tagline}</p>
          <p className="mt-6 max-w-xl text-[15px] leading-[2.05] text-ink-soft">
            {product.description}
          </p>
          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            {product.appStore && (
              <a
                href={product.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                App Storeで見る ↗
              </a>
            )}
            <a
              href={product.lp}
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-link"
            >
              公式サイト ↗
            </a>
          </p>
        </div>
      </article>
    </Reveal>
  );
}

/* ───────────────────────── 二、記録 ───────────────────────── */

function Writing() {
  return (
    <section id="writing" className="scroll-mt-10 pt-28 md:pt-36">
      <SectionTitle index="二" title="記録" sub="旅と思考のことば" />

      {/* 巻頭の一篇 */}
      <Reveal>
        <a
          href={featuredArticle.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-14 grid gap-8 md:grid-cols-12 md:gap-12"
        >
          <div className="md:col-span-5">
            <span className="print">
              <span className="print-window">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredArticle.thumbnail}
                  alt=""
                  loading="lazy"
                  className="aspect-[1.91/1] w-full object-cover"
                />
              </span>
            </span>
          </div>
          <div className="md:col-span-7">
            <p className="caption">{featuredArticle.date}</p>
            <h3 className="mt-4 text-xl font-semibold leading-[1.9] group-hover:text-shu transition-colors md:text-2xl md:leading-[1.9]">
              {featuredArticle.title}
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-[2.05] text-ink-soft">
              {featuredArticle.excerpt}
            </p>
            <p className="quiet-link mt-7 inline-block text-sm">noteで読む ↗</p>
          </div>
        </a>
      </Reveal>

      {/* 目次 */}
      <div className="mt-16">
        {articles.map((a, i) => (
          <Reveal key={a.href} delay={Math.min(i * 0.04, 0.2)}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-6 border-t border-rule py-5"
            >
              <span className="text-[15px] leading-[1.9] transition-colors group-hover:text-shu">
                {a.title}
              </span>
              <span className="caption shrink-0">{a.date}</span>
            </a>
          </Reveal>
        ))}
        <Reveal>
          <div className="border-t border-rule pt-8">
            <a
              href="https://note.com/shosuke240557"
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-link text-sm"
            >
              すべての記録を読む ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── 三、映像 ───────────────────────── */

function Film() {
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
  return (
    <section id="film" className="scroll-mt-10 pt-28 md:pt-36">
      <SectionTitle index="三" title="映像" sub="タダ飯・タダ宿の世界一周" />

      <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-12">
        {films.map((v, i) => (
          <Reveal key={v.id} className={spans[i % spans.length]} delay={(i % 2) * 0.08}>
            <a
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="print">
                <span className="print-window">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                </span>
              </span>
              <p className="mt-4 text-sm leading-[1.9] transition-colors group-hover:text-shu">
                {v.title}
              </p>
              <p className="caption mt-2">
                {v.place} ・ {v.date}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 border-t border-rule pt-8">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quiet-link text-sm"
          >
            チャンネルを観る ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 四、旅程 ───────────────────────── */

function Itinerary() {
  return (
    <section id="itinerary" className="scroll-mt-10 pt-28 md:pt-36">
      <SectionTitle index="四" title="旅程" sub="九ヶ月、世界一周" />

      <div className="relative mt-12 ml-1">
        <span
          className="absolute bottom-5 left-[3px] top-5 w-px bg-rule"
          aria-hidden
        />
        {journey.map((stop, i) => (
          <Reveal key={stop.place} delay={Math.min(i * 0.04, 0.2)}>
            <div className="relative grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-6 pl-8 md:grid-cols-[7rem_11rem_1fr]">
              <span
                className="absolute left-0 top-[2.05rem] flex h-[7px] w-[7px] items-center justify-center"
                aria-hidden
              >
                {stop.status === "now" ? (
                  <span className="shu-dot" />
                ) : stop.status === "done" ? (
                  <span className="h-[7px] w-[7px] rounded-full bg-ink-faint/70" />
                ) : (
                  <span className="h-[7px] w-[7px] rounded-full border border-ink-faint bg-paper" />
                )}
              </span>
              <span
                className={`caption ${stop.status === "now" ? "text-shu" : ""}`}
              >
                {stop.status === "now" ? "いま" : stop.period}
              </span>
              <span className="text-lg font-semibold tracking-[0.1em]">
                {stop.place}
              </span>
              <span className="col-span-2 mt-1 text-sm leading-relaxed text-ink-soft md:col-span-1 md:mt-0">
                {stop.note}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-12 text-sm leading-loose text-ink-faint">
          それぞれの土地に二、三週間。泊めてもらい、手伝い、暮らすように旅をしています。
        </p>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 奥付 ───────────────────────── */

function Footer() {
  return (
    <footer className="mt-32 border-t border-rule pb-14 pt-10 md:mt-40">
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="quiet-link text-sm"
          >
            {s.label}
          </a>
        ))}
      </div>

      <p className="caption mt-12 leading-[2.2]">
        そのほかの制作物 —{" "}
        {otherApps.map((app, i) => (
          <span key={app.name}>
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-shu transition-colors"
            >
              {app.name}
            </a>
            {i < otherApps.length - 1 && "、"}
          </span>
        ))}
      </p>

      <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3">
        <p className="caption">© 2026 さとうしょうすけ</p>
        <p className="caption">
          旅の途中より — <DayCounter />
          日目、{profile.currentLocation.place}
        </p>
      </div>
    </footer>
  );
}
