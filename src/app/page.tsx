import Navigation from "@/components/Navigation";
import WorldMap from "@/components/WorldMap";
import FlyingPlane from "@/components/FlyingPlane";
import Stars from "@/components/Stars";
import TrainScene from "@/components/TrainScene";
import BoardingPass from "@/components/BoardingPass";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Polaroid,
  Postcard,
  PhotoCard,
  Sticker,
  WashiTape,
  PassportStamp,
} from "@/components/Decorations";
import {
  PlaneIcon,
  GlobeIcon,
  SuitcaseIcon,
  NoteIcon,
  GitHubIcon,
  XIcon,
  YouTubeIcon,
  TikTokIcon,
  MapPinIcon,
  TrainIcon,
  CompassIcon,
  InstagramIcon,
  AppStoreIcon,
} from "@/components/Icons";

/* note.com thumbnail URLs (latest articles) */
const NOTE_IMAGES = {
  selfWorth: "https://assets.st-note.com/production/uploads/images/269541292/rectangle_large_type_2_c302976dacfebc2502c09768542789bb.png",
  lifePlan: "https://assets.st-note.com/production/uploads/images/269011819/rectangle_large_type_2_b44e8e0641f2dd9c0e5e599cef60411a.png",
  utokyo: "https://assets.st-note.com/production/uploads/images/267933413/rectangle_large_type_2_d355e618a2fe9293ed4cdf5416288565.png",
  creation: "https://assets.st-note.com/production/uploads/images/266699314/rectangle_large_type_2_7a0740368d1ba265abe8a8c90ddc2778.png",
  noStartup: "https://assets.st-note.com/production/uploads/images/265501089/rectangle_large_type_2_416ebd9babb5ff336557ac2109f5114b.png",
  research: "https://assets.st-note.com/production/uploads/images/265306249/rectangle_large_type_2_3e8eca61864ff1c061420a28effbf4f5.png",
};

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen overflow-x-hidden">
        {/* ═══════════════════════════════════════════
            HERO — Giant Map + Scattered Art + Photos
        ═══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-art">
          <Stars />
          <FlyingPlane />

          {/* GIANT World Map */}
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <div className="w-[140%] max-w-none -mt-12">
              <WorldMap />
            </div>
          </div>

          {/* Paint blobs */}
          <div className="absolute top-12 left-6 w-36 h-36 bg-coral/12 paint-splash animate-drift" style={{ ["--drift-rotate" as string]: "5deg" }} />
          <div className="absolute top-1/4 right-8 w-44 h-44 bg-violet/12 paint-splash-2 animate-drift" style={{ ["--drift-rotate" as string]: "-8deg", animationDelay: "2s" }} />
          <div className="absolute bottom-1/3 left-12 w-32 h-32 bg-turquoise/10 paint-splash-3 animate-drift" style={{ ["--drift-rotate" as string]: "12deg", animationDelay: "4s" }} />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-golden/8 paint-splash animate-drift" style={{ ["--drift-rotate" as string]: "-3deg", animationDelay: "6s" }} />
          <div className="absolute top-1/3 left-1/3 w-28 h-28 bg-rose/8 paint-splash-2 animate-drift" style={{ ["--drift-rotate" as string]: "7deg", animationDelay: "3s" }} />

          {/* ===== Scattered REAL photos from note ===== */}
          <div className="absolute top-20 right-4 md:right-16 w-32 md:w-40 animate-fade-in [animation-delay:0.8s] opacity-0 z-20 hidden sm:block">
            <PhotoCard
              rotate={7}
              src={NOTE_IMAGES.creation}
              label="AIが何でも作れる時代に、なぜ「創作」するのか。"
              href="https://note.com/shosuke240557"
              color="#7C3AED"
            />
          </div>
          <div className="absolute bottom-36 left-4 md:left-12 w-32 md:w-40 animate-fade-in [animation-delay:1.2s] opacity-0 z-20 hidden sm:block">
            <PhotoCard
              rotate={-5}
              src={NOTE_IMAGES.utokyo}
              label="東大理系の4年間"
              href="https://note.com/shosuke240557"
              color="#00D4AA"
            />
          </div>
          <div className="absolute top-44 left-4 md:left-10 w-28 md:w-32 animate-fade-in [animation-delay:1.5s] opacity-0 z-20 hidden md:block">
            <Polaroid rotate={-12} src={NOTE_IMAGES.selfWorth} label="ESSAY" />
          </div>
          <div className="absolute bottom-44 right-4 md:right-12 w-28 md:w-36 animate-fade-in [animation-delay:1.8s] opacity-0 z-20 hidden md:block">
            <Polaroid rotate={8} src={NOTE_IMAGES.lifePlan} label="LIFE PLAN" />
          </div>

          {/* Passport stamps */}
          <div className="absolute top-28 right-[42%] w-20 animate-fade-in [animation-delay:1s] opacity-0 hidden lg:block">
            <PassportStamp text="KANAGAWA" subtext="JAPAN" date="HOME" color="#FF4545" rotate={15} />
          </div>
          <div className="absolute bottom-48 left-[28%] w-16 animate-fade-in [animation-delay:1.4s] opacity-0 hidden lg:block">
            <PassportStamp text="PARIS" subtext="FRANCE" date="2024" color="#7C3AED" rotate={-10} />
          </div>

          {/* Stickers */}
          <div className="absolute top-32 left-[52%] animate-fade-in [animation-delay:2s] opacity-0 hidden md:block">
            <Sticker text="✈ 2026" color="#00D4AA" className="w-14 h-14 p-1" rotate={-8} />
          </div>
          <div className="absolute bottom-36 right-[32%] animate-fade-in [animation-delay:2.2s] opacity-0 hidden md:block">
            <Sticker text="世界 一周" color="#F43F5E" className="w-14 h-14 p-1 text-[9px]" rotate={5} />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/20 to-cream/60" />

          {/* Hero Content */}
          <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
            <div className="inline-block mb-6 animate-fade-in-up">
              <div className="stamp border-coral text-coral animate-stamp" style={{ ["--stamp-rotate" as string]: "-5deg" }}>
                2026.05 — 世界一周へ
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold mb-6 animate-fade-in-up [animation-delay:0.15s] opacity-0 leading-[0.9]">
              <span className="text-gradient">Shosuke</span>
              <br />
              <span className="text-gradient-wild">Sato</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-ink-light mb-3 animate-fade-in-up [animation-delay:0.3s] opacity-0 leading-relaxed font-medium">
              2026年5月、東大院を休学して
              <br className="hidden sm:block" />
              <span className="text-coral font-extrabold">世界一周</span>の旅に出る
            </p>

            <p className="text-sm text-ink-muted font-mono mb-10 animate-fade-in-up [animation-delay:0.45s] opacity-0 tracking-[0.2em]">
              16 COUNTRIES VISITED &nbsp;/&nbsp; ∞ MORE TO GO
            </p>

            <div className="animate-fade-in-up [animation-delay:0.6s] opacity-0 flex gap-4 justify-center flex-wrap">
              <a
                href="#journey"
                className="group px-8 py-3.5 bg-coral text-white font-extrabold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-coral/25 flex items-center gap-2"
              >
                <PlaneIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                My Journey
              </a>
              <a
                href="#connect"
                className="px-8 py-3.5 border-3 border-violet text-violet font-extrabold rounded-full transition-all hover:bg-violet hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-violet/25"
              >
                Follow the Trip
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float z-20">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-ink-muted uppercase tracking-[0.3em] font-bold">Scroll</span>
              <div className="w-6 h-9 border-2 border-ink/20 rounded-full flex justify-center">
                <div className="w-1 h-2.5 bg-coral rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>

          <TrainScene />
        </section>

        {/* ═══════════════════════════════════════════
            MARQUEE
        ═══════════════════════════════════════════ */}
        <div className="bg-ink text-cream py-3 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex">
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="flex items-center gap-8 mr-8">
                {["TOKYO", "ROME", "PARIS", "BARCELONA", "LONDON", "BANGKOK", "ISTANBUL", "ATHENS", "HANOI", "SEOUL", "MANILA", "HONG KONG", "VANCOUVER"].map((city, i) => (
                  <span key={`${j}-${i}`} className="flex items-center gap-3">
                    <span className="text-sm font-extrabold tracking-[0.15em]">{city}</span>
                    <span className="text-coral text-lg">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            ABOUT — Who is Shosuke?
        ═══════════════════════════════════════════ */}
        <section id="about" className="py-28 px-6 relative overflow-hidden">
          <div className="absolute -top-20 -left-32 w-80 h-80 bg-violet/8 paint-splash" />
          <div className="absolute top-1/3 -right-20 w-64 h-64 bg-turquoise/8 paint-splash-2" />
          <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-golden/6 paint-splash-3" />

          {/* Decorative real photo */}
          <div className="absolute top-12 right-8 md:right-16 w-28 hidden md:block">
            <ScrollReveal delay={400}>
              <Polaroid rotate={12} src={NOTE_IMAGES.noStartup} label="ESSAY" />
            </ScrollReveal>
          </div>
          <div className="absolute bottom-20 right-12 hidden lg:block">
            <ScrollReveal delay={600}>
              <Sticker text="東大院 → 世界一周" color="#7C3AED" className="w-20 h-20 p-1 text-[8px]" rotate={-12} />
            </ScrollReveal>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-turquoise rounded-full flex items-center justify-center">
                  <GlobeIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-turquoise uppercase tracking-[0.2em] font-extrabold">Who Am I</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-16 leading-[0.95]">
                About<br />
                <span className="text-gradient">Shosuke</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-3 space-y-6 relative">
                <WashiTape className="absolute -top-4 left-8 w-28" rotate={2} color="#FFB800" />

                <ScrollReveal delay={100}>
                  <div className="bg-white p-6 rounded-xl collage-shadow" style={{ transform: "rotate(-0.5deg)" }}>
                    <p className="text-lg text-ink-light leading-relaxed">
                      2004年生まれ、神奈川県育ち。東京大学工学部システム創成学科を卒業し、2026年4月から同大学院に進学。でも、<span className="text-coral font-bold">入学と同時に休学して世界一周の旅に出る</span>ことを決めました。
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="bg-white p-6 rounded-xl collage-shadow" style={{ transform: "rotate(0.8deg)" }}>
                    <p className="text-lg text-ink-light leading-relaxed">
                      これまでに<span className="text-violet font-bold">16カ国</span>を旅してきました。イタリア、フランス、スペイン、ギリシャ、トルコ、イギリス、フィリピン、ベトナム、カンボジア、タイ、韓国、中国、香港、カナダ、ハワイ…。でもまだ見ていない世界の方がずっと広い。
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <div className="bg-coral/5 p-6 rounded-xl border-2 border-coral/20" style={{ transform: "rotate(-1deg)" }}>
                    <p className="text-xl text-ink font-bold leading-relaxed">
                      僕という、この時代に生きる一人の個体の人生を<span className="text-coral">「標本」</span>として残したい。<br className="hidden md:block" />noteやYouTubeでの発信を通じて、AI時代にどう独自性をつくれるかを探求しています。
                    </p>
                  </div>
                </ScrollReveal>

                {/* Real note article card */}
                <ScrollReveal delay={400}>
                  <div className="w-48 ml-auto -mt-2">
                    <PhotoCard
                      rotate={3}
                      src={NOTE_IMAGES.noStartup}
                      label="大学生時代、なぜ結局学生起業をしなかったのか"
                      href="https://note.com/shosuke240557"
                      color="#FFB800"
                    />
                  </div>
                </ScrollReveal>

                <div className="absolute -bottom-4 left-8 hidden md:block">
                  <div className="stamp border-turquoise text-turquoise text-[8px] rotate-12">
                    ✓ 16 COUNTRIES
                  </div>
                </div>
              </div>

              {/* Right: passport-style info */}
              <ScrollReveal delay={200} className="md:col-span-2">
                <div className="bg-white border-2 border-cream-dark rounded-2xl p-6 space-y-5 collage-shadow relative" style={{ transform: "rotate(1.5deg)" }}>
                  <WashiTape className="absolute -top-3 left-1/2 -translate-x-1/2 w-24" rotate={-1} color="#00D4AA" />

                  <div className="flex items-center gap-2 mb-4 pt-2">
                    <SuitcaseIcon className="w-5 h-5 text-golden" />
                    <p className="text-xs text-golden uppercase tracking-[0.2em] font-extrabold">Passport</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-ink-muted uppercase tracking-[0.15em] mb-2 font-bold">名前</p>
                    <p className="font-bold text-ink">佐藤 咲祐（Shosuke Sato）</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-ink-muted uppercase tracking-[0.15em] mb-2 font-bold">所属</p>
                    <p className="font-bold text-ink text-sm">東京大学大学院 工学系研究科<br />システム創成学専攻</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-ink-muted uppercase tracking-[0.15em] mb-2 font-bold">訪問国</p>
                    <div className="flex flex-wrap gap-1">
                      {["🇵🇭", "🇮🇹", "🇫🇷", "🇰🇷", "🇨🇳", "🇻🇳", "🇰🇭", "🇹🇭", "🇭🇰", "🇪🇸", "🇬🇷", "🇹🇷", "🇬🇧", "🇺🇸", "🇨🇦"].map((flag, i) => (
                        <span key={i} className="text-xl" title="visited">{flag}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-ink-muted uppercase tracking-[0.15em] mb-2 font-bold">発信メディア</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: "note", color: "bg-turquoise/15 text-turquoise" },
                        { name: "YouTube", color: "bg-coral/15 text-coral" },
                        { name: "Instagram", color: "bg-rose/15 text-rose" },
                        { name: "X", color: "bg-sky/15 text-sky" },
                        { name: "TikTok", color: "bg-violet/15 text-violet" },
                      ].map((s) => (
                        <span key={s.name} className={`px-3 py-1 rounded-full text-xs font-extrabold font-mono ${s.color}`}>
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-ink-muted uppercase tracking-[0.15em] mb-2 font-bold">好きなもの</p>
                    <p className="font-bold text-ink text-sm">みなとみらい / サウナ</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <MapPinIcon className="w-5 h-5 text-coral" />
                    <span className="font-bold">Kanagawa → World</span>
                  </div>

                  <div className="absolute -bottom-6 -right-4 w-16">
                    <PassportStamp text="UTokyo" subtext="東大" date="2022-" color="#7C3AED" rotate={20} />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CONTENT — note & YouTube showcase
        ═══════════════════════════════════════════ */}
        <section id="works" className="py-28 px-6 relative overflow-hidden">
          <div className="absolute top-20 -left-16 w-72 h-72 bg-golden/8 paint-splash" />
          <div className="absolute bottom-20 -right-16 w-64 h-64 bg-rose/8 paint-splash-2" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-sky/6 paint-splash-3" />

          <div className="absolute top-16 right-8 md:right-20 hidden md:block">
            <ScrollReveal delay={300}>
              <Sticker text="✍ note" color="#00D4AA" className="w-14 h-14 p-1" rotate={-8} />
            </ScrollReveal>
          </div>
          <div className="absolute bottom-20 left-8 hidden lg:block">
            <ScrollReveal delay={500}>
              <Sticker text="▶ YouTube" color="#FF4545" className="w-16 h-16 p-1 text-[8px]" rotate={10} />
            </ScrollReveal>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center">
                  <NoteIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-coral uppercase tracking-[0.2em] font-extrabold">Content</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-4 leading-[0.95]">
                <span className="text-gradient">Works</span>
              </h2>
              <p className="text-ink-muted text-lg mb-16 max-w-xl">
                noteでのエッセイ、YouTubeでの発信、<br className="hidden md:block" />そして旅から生まれたプロダクト。
              </p>
            </ScrollReveal>

            {/* Note articles showcase */}
            <ScrollReveal delay={100}>
              <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-turquoise rounded-full" />
                note
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
                <PhotoCard
                  rotate={-1}
                  src={NOTE_IMAGES.selfWorth}
                  label="自己肯定感を上げる方法がついにわかってしまったぞ！！！"
                  href="https://note.com/shosuke240557"
                  color="#7C3AED"
                />
                <div className="md:mt-6">
                  <PhotoCard
                    rotate={1.5}
                    src={NOTE_IMAGES.lifePlan}
                    label="これからの10年間の人生設計をした。"
                    href="https://note.com/shosuke240557"
                    color="#FFB800"
                  />
                </div>
                <PhotoCard
                  rotate={-0.5}
                  src={NOTE_IMAGES.utokyo}
                  label="東大理系の4年間"
                  href="https://note.com/shosuke240557"
                  color="#00D4AA"
                />
                <div className="md:mt-4">
                  <PhotoCard
                    rotate={2}
                    src={NOTE_IMAGES.creation}
                    label="AIが何でも作れる時代に、なぜ「創作」するのか。"
                    href="https://note.com/shosuke240557"
                    color="#F43F5E"
                  />
                </div>
                <PhotoCard
                  rotate={-1.5}
                  src={NOTE_IMAGES.noStartup}
                  label="大学生時代、なぜ結局学生起業をしなかったのか"
                  href="https://note.com/shosuke240557"
                  color="#0EA5E9"
                />
                <div className="md:mt-8">
                  <PhotoCard
                    rotate={1}
                    src={NOTE_IMAGES.research}
                    label="論文を出して終わり、じゃもったいない。研究の&quot;その後&quot;にやったほうがいいこと。"
                    href="https://note.com/shosuke240557"
                    color="#F97316"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* YouTube — Coming Soon */}
            <ScrollReveal delay={100}>
              <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-coral rounded-full" />
                YouTube
              </h3>
              <div className="flex items-center justify-center py-16 mb-16 bg-white rounded-2xl border-2 border-dashed border-cream-dark collage-shadow" style={{ transform: "rotate(-0.5deg)" }}>
                <div className="text-center">
                  <p className="text-5xl mb-4">🎬</p>
                  <p className="text-2xl font-extrabold text-ink mb-2">Coming Soon...</p>
                  <p className="text-ink-muted text-sm">新チャンネルで旅の動画を発信予定。お楽しみに！</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Projects as boarding passes */}
            <ScrollReveal delay={100}>
              <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-golden rounded-full" />
                プロダクト
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <BoardingPass
                  destination="MONEY → SECONDS"
                  flight="SS-000"
                  title="秒で家計簿"
                  description="2〜3タップで終わる、続けられない人のための家計簿。入力の摩擦を極限まで削ったiOSアプリ。"
                  tags={["iOS", "Finance"]}
                  href="https://apps.apple.com/jp/app/秒で家計簿/id6468492832?l=en-US"
                  icon={<AppStoreIcon className="w-8 h-8" />}
                  gate="A0"
                  accentColor="text-golden"
                  rotate={1.5}
                />
                <div className="md:mt-8">
                  <BoardingPass
                    destination="HABIT → TIMER"
                    flight="SS-001"
                    title="習慣化タイマー"
                    description="「成果」ではなく「時間」で習慣を積む、行動科学ベースのタイマー型iOSアプリ。"
                    tags={["iOS", "Habits"]}
                    href="https://apps.apple.com/jp/app/習慣化タイマー/id6764331794?l=en-US"
                    icon={<AppStoreIcon className="w-8 h-8" />}
                    gate="A1"
                    accentColor="text-turquoise"
                    rotate={-1}
                  />
                </div>
                <BoardingPass
                  destination="NIGHT → CLOSE"
                  flight="SS-002"
                  title="Owari"
                  description="就寝時刻に他アプリを強制ロック。明日の自分への引き継ぎを書いてから寝るiOSアプリ。"
                  tags={["iOS", "Sleep"]}
                  href="https://apps.apple.com/jp/app/owari/id6761009213?l=en-US"
                  icon={<AppStoreIcon className="w-8 h-8" />}
                  gate="A2"
                  accentColor="text-coral"
                  rotate={2}
                />
                <div className="md:mt-8">
                  <BoardingPass
                    destination="TIME → FOCUS"
                    flight="SS-003"
                    title="やる4"
                    description="1日のタスク合計を4時間にハードキャップ。制約から思考を鋭くするiOS todoアプリ。"
                    tags={["iOS", "Productivity"]}
                    href="https://apps.apple.com/jp/app/やる4/id6763765316?l=en-US"
                    icon={<AppStoreIcon className="w-8 h-8" />}
                    gate="A3"
                    accentColor="text-violet"
                    rotate={-1.5}
                  />
                </div>
                <BoardingPass
                  destination="EYES → SPEED"
                  flight="SS-004"
                  title="動体視力道場"
                  description="動体視力を鍛えるトレーニングアプリ。ゲーム感覚で楽しく視覚能力を向上。"
                  tags={["iOS", "Game"]}
                  href="https://apps.apple.com/jp/app/動体視力道場/id6476528461?l=en-US"
                  icon={<AppStoreIcon className="w-8 h-8" />}
                  gate="A4"
                  accentColor="text-rose"
                  rotate={1}
                />
                <div className="md:mt-8">
                  <BoardingPass
                    destination="PROMISE → SELF"
                    flight="SS-005"
                    title="Yakusoku."
                    description="今日、自分との約束を一行だけ書く。白と黒だけの静かな内省iOSアプリ。"
                    tags={["iOS", "Mindful"]}
                    href="https://apps.apple.com/jp/app/yakusoku/id6762287005?l=en-US"
                    icon={<AppStoreIcon className="w-8 h-8" />}
                    gate="A5"
                    accentColor="text-sky"
                    rotate={-2}
                  />
                </div>
                <BoardingPass
                  destination="LIFE → PHYSICS"
                  flight="SS-006"
                  title="日常物理"
                  description="日常の中に潜む物理法則を学べるアプリ。身近な現象を物理の視点で楽しむ。"
                  tags={["iOS", "Education"]}
                  href="https://apps.apple.com/jp/app/日常物理/id6475620635?l=en-US"
                  icon={<AppStoreIcon className="w-8 h-8" />}
                  gate="A6"
                  accentColor="text-coral"
                  rotate={1.5}
                />
                <div className="md:mt-8">
                  <BoardingPass
                    destination="AI → DISCOVER"
                    flight="SS-007"
                    title="AI Tool Hub"
                    description="ChatGPT・Claude・Geminiをはじめ、話題のAIツールの特徴・料金・強み・弱みを徹底比較できるメディアサイト。"
                    tags={["AI", "Web Media"]}
                    href="https://ai-tool-hub-pi.vercel.app"
                    icon={<CompassIcon className="w-8 h-8" />}
                    gate="A7"
                    accentColor="text-turquoise"
                    rotate={-1}
                  />
                </div>
                <BoardingPass
                  destination="TRAVEL → TECH"
                  flight="SS-008"
                  title="Tabi-Box"
                  description="旅の予約をまとめて管理できるWebアプリ。自分が世界一周で使うために作った。"
                  tags={["Travel", "Web App"]}
                  href="https://tabi-box.pages.dev"
                  icon={<GlobeIcon className="w-8 h-8" />}
                  gate="A8"
                  accentColor="text-violet"
                  rotate={2}
                />
                <div className="md:mt-8">
                  <BoardingPass
                    destination="RESEARCH → PRODUCT"
                    flight="SS-009"
                    title="FluidMotion"
                    description="粒子法×深層学習の流体シミュレーションをブラウザでリアルタイムに体験できるWebアプリ。研究で使った手法を誰でも触れる形に。"
                    tags={["Web App", "Research"]}
                    href="https://fluidmotion-73l.pages.dev"
                    icon={<GlobeIcon className="w-8 h-8" />}
                    gate="A9"
                    accentColor="text-golden"
                    rotate={-1.5}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            JOURNEY — Timeline
        ═══════════════════════════════════════════ */}
        <section id="journey" className="py-28 px-6 relative overflow-hidden">
          <div className="absolute inset-0 map-grid" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet/5 paint-splash" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-coral/5 paint-splash-3" />

          <div className="absolute top-20 right-12 w-28 hidden lg:block">
            <ScrollReveal delay={300}>
              <Polaroid rotate={-6} src={NOTE_IMAGES.utokyo} label="UTokyo" />
            </ScrollReveal>
          </div>
          <div className="absolute bottom-28 left-8 hidden lg:block">
            <ScrollReveal delay={500}>
              <PassportStamp text="2022" subtext="UTokyo" date="START" color="#00D4AA" rotate={-12} className="w-14" />
            </ScrollReveal>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-violet rounded-full flex items-center justify-center">
                  <TrainIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-violet uppercase tracking-[0.2em] font-extrabold">Route Map</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-16 leading-[0.95]">
                <span className="text-gradient">Journey</span>
              </h2>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 rounded-full md:-translate-x-px"
                style={{
                  background: "linear-gradient(to bottom, #FF4545, #FFB800, #00D4AA, #7C3AED, #F43F5E)",
                }}
              />

              {[
                {
                  year: "2026.05",
                  title: "世界一周 出発 ✈",
                  desc: "大学院を休学して、まだ見ぬ世界へ。noteとYouTubeで旅の全てを発信。リモートワークしながら旅費を稼ぐ。",
                  side: "right" as const,
                  color: "coral",
                },
                {
                  year: "2026.04",
                  title: "東大大学院 入学と同時に休学",
                  desc: "工学系研究科システム創成学専攻に進学。入学と同時に休学し、世界一周の準備へ。",
                  side: "left" as const,
                  color: "violet",
                },
                {
                  year: "2026.03",
                  title: "東京大学 卒業",
                  desc: "工学部システム創成学科を卒業。4年間の学びを経て、次のステージへ。",
                  side: "right" as const,
                  color: "turquoise",
                },
                {
                  year: "2025.10",
                  title: "GROWTH VERSE インターン",
                  desc: "GROWTH VERSEにインターンとして参画。",
                  side: "left" as const,
                  color: "golden",
                },
                {
                  year: "2025.05",
                  title: "羽石産業知能研究所 CPO就任",
                  desc: "羽石産業知能研究所にてCPO（最高プロダクト責任者）として活動開始。",
                  side: "right" as const,
                  color: "sky",
                },
                {
                  year: "2025",
                  title: "Tabi-Box 開発",
                  desc: "世界一周の準備として、旅行予約管理アプリTabi-Boxを開発。",
                  side: "left" as const,
                  color: "rose",
                },
                {
                  year: "2024.07",
                  title: "note 本格始動",
                  desc: "noteでのエッセイ執筆を本格的にスタート。AI時代の独自性や旅について発信。",
                  side: "right" as const,
                  color: "turquoise",
                },
                {
                  year: "2024",
                  title: "工学部システム創成学科に進学",
                  desc: "理科一類からシステム創成学科Cコースへ進学。iOSアプリ3本をリリース。",
                  side: "left" as const,
                  color: "violet",
                },
                {
                  year: "2024.01",
                  title: "Airion インターン開始",
                  desc: "Airionにインターンとして参画。2025年2月まで約1年間勤務。",
                  side: "right" as const,
                  color: "golden",
                },
                {
                  year: "2022",
                  title: "東京大学 理科一類 入学",
                  desc: "東京大学に入学。大学生活と並行して、旅とものづくりを続ける。",
                  side: "left" as const,
                  color: "rose",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div
                    className={`relative flex items-start gap-6 mb-16 ${
                      item.side === "right"
                        ? "md:flex-row md:ml-[50%] md:pl-12"
                        : "md:flex-row-reverse md:mr-[50%] md:pr-12 md:text-right"
                    } pl-16 md:pl-0`}
                  >
                    <div className={`absolute left-3.5 md:hidden top-1 w-6 h-6 rounded-full bg-cream border-3 border-${item.color} z-10`}>
                      <div className={`absolute inset-1.5 rounded-full bg-${item.color}`} />
                    </div>
                    <div className={`hidden md:block absolute top-1 w-6 h-6 rounded-full bg-cream border-3 border-${item.color} z-10`}
                      style={{
                        left: item.side === "right" ? "-0.75rem" : "auto",
                        right: item.side === "left" ? "-0.75rem" : "auto",
                      }}
                    >
                      <div className={`absolute inset-1.5 rounded-full bg-${item.color}`} />
                    </div>

                    <div className="bg-white p-5 rounded-xl collage-shadow" style={{ transform: `rotate(${item.side === "right" ? "0.5" : "-0.5"}deg)` }}>
                      <span className={`inline-block px-4 py-1.5 bg-${item.color}/15 text-${item.color} text-sm font-mono font-extrabold rounded-full mb-3`}>
                        {item.year}
                      </span>
                      <h3 className="text-xl font-extrabold text-ink mb-2">{item.title}</h3>
                      <p className="text-ink-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PHILOSOPHY — Big Bold Quote
        ═══════════════════════════════════════════ */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-rose/6 paint-splash" />
          <div className="absolute -bottom-20 -right-40 w-[400px] h-[400px] bg-turquoise/6 paint-splash-2" />
          <div className="absolute top-10 right-1/4 w-[300px] h-[300px] bg-golden/5 paint-splash-3" />

          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
            <div className="text-[25rem] font-bold text-coral select-none animate-globe">
              &#9992;
            </div>
          </div>

          <div className="absolute top-16 left-8 md:left-20 w-28 hidden md:block">
            <ScrollReveal delay={200}>
              <Polaroid rotate={-10} src={NOTE_IMAGES.selfWorth} label="ESSAY" />
            </ScrollReveal>
          </div>
          <div className="absolute bottom-16 right-8 md:right-24 w-32 hidden md:block">
            <ScrollReveal delay={400}>
              <PhotoCard rotate={8} src={NOTE_IMAGES.research} label="論文の&quot;その後&quot;" href="https://note.com/shosuke240557" color="#7C3AED" />
            </ScrollReveal>
          </div>
          <div className="absolute top-24 right-12 hidden lg:block">
            <ScrollReveal delay={300}>
              <Sticker text="冒険" color="#FFB800" className="w-14 h-14 p-1 text-base" rotate={-20} />
            </ScrollReveal>
          </div>
          <div className="absolute bottom-32 left-16 hidden lg:block">
            <ScrollReveal delay={500}>
              <PassportStamp text="WORLD" subtext="TRIP" date="2026" color="#7C3AED" rotate={15} className="w-16" />
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-block mb-8">
                <div className="stamp border-violet text-violet text-sm animate-stamp px-6 py-3" style={{ ["--stamp-rotate" as string]: "-3deg" }}>
                  My Philosophy
                </div>
              </div>
              <blockquote className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.2]">
                &ldquo;この時代に生きる
                <br />
                <span className="text-coral">一人の人生を、標本として残す。</span>&rdquo;
              </blockquote>
              <p className="mt-8 text-xl md:text-2xl text-ink-muted leading-relaxed">
                まだ見ぬ景色を自分の目で見に行き、<br className="hidden md:block" />その全てを記録する。— 2026年5月、世界一周へ。
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ═══════════════════════════════════════════
            CONNECT — Social Links (with Instagram)
        ═══════════════════════════════════════════ */}
        <section id="connect" className="py-28 px-6 relative overflow-hidden">
          <div className="absolute inset-0 map-grid" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-coral/5 paint-splash" />
          <div className="absolute top-10 -right-16 w-64 h-64 bg-violet/5 paint-splash-2" />

          <div className="absolute top-12 left-8 w-24 hidden lg:block">
            <ScrollReveal delay={200}>
              <Polaroid rotate={-8} src={NOTE_IMAGES.lifePlan} label="LIFE PLAN" />
            </ScrollReveal>
          </div>
          <div className="absolute bottom-16 right-12 hidden lg:block">
            <ScrollReveal delay={400}>
              <Sticker text="FOLLOW ME" color="#F43F5E" className="w-16 h-16 p-1 text-[8px]" rotate={12} />
            </ScrollReveal>
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-3 justify-center mb-2">
                <div className="w-8 h-8 bg-rose rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-rose uppercase tracking-[0.2em] font-extrabold">Follow the Journey</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[0.95]">
                <span className="text-gradient">Connect</span>
              </h2>
              <p className="text-ink-muted mb-12 text-lg">
                世界一周の旅をリアルタイムで発信します。<br className="hidden md:block" />一緒に旅を楽しみましょう。
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    name: "note",
                    desc: "旅のエッセイ",
                    href: "https://note.com/shosuke240557",
                    icon: <NoteIcon className="w-7 h-7" />,
                    bg: "hover:bg-turquoise hover:text-white hover:border-turquoise",
                    rotate: -1.5,
                  },
                  {
                    name: "YouTube",
                    desc: "旅の動画",
                    href: "https://www.youtube.com/@shouyu_desu",
                    icon: <YouTubeIcon className="w-7 h-7" />,
                    bg: "hover:bg-coral hover:text-white hover:border-coral",
                    rotate: 1,
                  },
                  {
                    name: "Instagram",
                    desc: "旅の写真",
                    href: "https://www.instagram.com/shouyu_desu/",
                    icon: <InstagramIcon className="w-7 h-7" />,
                    bg: "hover:bg-rose hover:text-white hover:border-rose",
                    rotate: -2,
                  },
                  {
                    name: "X",
                    desc: "つぶやき",
                    href: "https://x.com/shouyu_desu",
                    icon: <XIcon className="w-7 h-7" />,
                    bg: "hover:bg-sky hover:text-white hover:border-sky",
                    rotate: 1.5,
                  },
                  {
                    name: "TikTok",
                    desc: "縦動画",
                    href: "https://www.tiktok.com/@shouyu_desu",
                    icon: <TikTokIcon className="w-7 h-7" />,
                    bg: "hover:bg-violet hover:text-white hover:border-violet",
                    rotate: -1.5,
                  },
                  {
                    name: "GitHub",
                    desc: "コード",
                    href: "https://github.com/shosukesato",
                    icon: <GitHubIcon className="w-7 h-7" />,
                    bg: "hover:bg-ink hover:text-white hover:border-ink",
                    rotate: -1,
                  },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-cream-dark bg-white text-ink-muted transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lg collage-shadow ${link.bg}`}
                    style={{ transform: `rotate(${link.rotate}deg)` }}
                  >
                    {link.icon}
                    <span className="text-xs font-mono font-extrabold">{link.name}</span>
                    <span className="text-[9px] text-ink-muted">{link.desc}</span>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════ */}
        <footer className="py-10 px-6 bg-ink text-cream/60">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm">
              <CompassIcon className="w-5 h-5 text-coral" />
              <span className="font-bold text-cream">&copy; {new Date().getFullYear()} Shosuke Sato</span>
            </div>
            <p className="text-xs font-mono tracking-wider">
              The journey never ends ✈
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
