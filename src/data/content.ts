// ─────────────────────────────────────────────────────────────
// サイトの全コンテンツデータ
// 新しいアプリ・記事・動画・旅の行き先はこのファイルを編集するだけで反映されます
// ─────────────────────────────────────────────────────────────

export const DEPARTURE_DATE = "2026-05-23"; // 世界一周出発日

export const profile = {
  name: "さとうしょうすけ",
  nameEn: "Shosuke Sato",
  bio: "東京大学を休学し、世界一周の旅の途中。アプリをつくり、文章を書き、映像を撮りながら、世界のどこかで暮らしています。",
  departureNote: "二〇二六年五月二三日、東京を発つ。",
  currentLocation: {
    place: "スリランカ、ガラハ",
    detail: "山あいのプレスクールに滞在中",
  },
  nextLocation: "インド",
};

export const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@shosuke_sato" },
  { label: "note", href: "https://note.com/shosuke240557" },
  { label: "Instagram", href: "https://www.instagram.com/shosuke_sato" },
  { label: "TikTok", href: "https://www.tiktok.com/@shosuke_sato" },
  { label: "X", href: "https://x.com/shosuke_sato" },
  { label: "GitHub", href: "https://github.com/shosukesato" },
] as const;

// ─── 作品(アプリ) ───

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  caption: string;
  icon?: string;
  lp: string;
  appStore?: string;
  status: "released" | "coming-soon";
};

export const products: Product[] = [
  {
    id: "tripvlog",
    name: "TripVlog",
    tagline: "撮るだけ、編集ゼロ。今日から旅が1本のvlogになる。",
    description:
      "旅先で適当に動画を撮るだけで、日付も、訪れた場所も、国旗も、地図も焼き込まれた縦型vlogがワンタップで完成する。世界一周の道中、毎日の編集がどうしても追いつかなくて、自分のためにつくった。いまも毎日、これで旅を記録している。",
    caption: "iOSアプリ ・ 旅の道中でつくった",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/8f/a8/02/8fa80278-4827-fc1d-ca21-179c107e8a8b/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    lp: "https://shosukesato.github.io/tripvlog-lp/",
    appStore: "https://apps.apple.com/jp/app/tripvlog/id6779697639",
    status: "released",
  },
  {
    id: "haku",
    name: "HAKU",
    tagline: "撮るだけで、作品になる。",
    description:
      "撮る、という判断だけを人に残して、そこから先はすべて委ねる。光と色と被写体を読み、フィルムのような淡い色調に整え、展示のセオリーに基づいた余白で額装する。一枚の写真が、一枚の作品に変わる。",
    caption: "iOSアプリ ・ 旅の道中でつくった",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/22/49/b9/2249b9b9-81ab-5e24-b1ad-2c29868abc05/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    lp: "https://shosukesato.github.io/haku-lp/",
    appStore: "https://apps.apple.com/jp/app/haku-shoot-then-art/id6788477365",
    status: "released",
  },
  {
    id: "stocka",
    name: "Stocka",
    tagline: "翻訳を、あなたの英語に変える。",
    description:
      "訳すたびに、構文と文法と単語をほどいて教えてくれて、そのままカードになって手元にたまっていく。旅の会話で「調べて、終わり」を繰り返すのが悔しかったから、翻訳という行為そのものを学びに変えた。わからなかった言葉が、そのまま自分の言葉になる。",
    caption: "iOSアプリ ・ 旅の道中でつくった",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/85/9c/a1/859ca181-e9ec-d617-8ea2-4c899034cd5b/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    lp: "https://stocka-lp.vercel.app/",
    appStore: "https://apps.apple.com/jp/app/stocka/id6784304293",
    status: "released",
  },
];

// ─── その他の制作物 ───

export const otherApps = [
  { name: "秒で家計簿", href: "https://apps.apple.com/jp/app/秒で家計簿/id6468492832" },
  { name: "習慣化タイマー", href: "https://apps.apple.com/jp/app/習慣化タイマー/id6764331794" },
  { name: "OWARI", href: "https://apps.apple.com/jp/app/owari/id6761009213" },
  { name: "やる4", href: "https://apps.apple.com/jp/app/やる4/id6763765316" },
  { name: "動体視力道場", href: "https://apps.apple.com/jp/app/動体視力道場/id6476528461" },
  { name: "yakusoku", href: "https://apps.apple.com/jp/app/yakusoku/id6762287005" },
  { name: "日常物理", href: "https://apps.apple.com/jp/app/日常物理/id6475620635" },
  { name: "AI Tool Hub", href: "https://ai-tool-hub-pi.vercel.app" },
  { name: "Tabi Box", href: "https://tabi-box.pages.dev" },
  { name: "FluidMotion", href: "https://fluidmotion-73l.pages.dev" },
];

// ─── 記録(note) ───

export type Article = {
  title: string;
  href: string;
  date: string;
  thumbnail?: string;
  excerpt?: string;
};

export const featuredArticle: Article = {
  title: "貯金0の世界一周で学んだ、自由に生きるための「一人経済圏の作り方」の全て",
  href: "https://note.com/shosuke240557/n/n502cf63fbb41",
  date: "二〇二六年七月 ・ スリランカ、ガラハにて",
  thumbnail:
    "https://assets.st-note.com/production/uploads/images/292263882/rectangle_large_type_2_84fb0ec887b1693287f3d78fbddf9741.png?width=800",
  excerpt:
    "スリランカの山奥で、ひとりで書きはじめた。旅が進むたびに追記されて、旅と一緒に育っていく記事。",
};

export const articles: Article[] = [
  {
    title: "個人開発で初収益が出たのでこれまでやったことを全て振り返るとともに、これからの作戦会議をしよう",
    href: "https://note.com/shosuke240557/n/nb5e7dee34b57",
    date: "2026.06",
  },
  {
    title: "僕は、「こう考えているから」「これをしているから」幸せなんだと思う。ということ。",
    href: "https://note.com/shosuke240557/n/n1e13363fb448",
    date: "2026.06",
  },
  {
    title: "東大を休学して貯金0円で世界一周してるけど、僕には「やりたいこと」が1つもなかった",
    href: "https://note.com/shosuke240557/n/nc7487ff91841",
    date: "2026.06",
  },
  {
    title: "世界一周へついに出発！！！",
    href: "https://note.com/shosuke240557/n/ncc7d979d6bc0",
    date: "2026.05",
  },
  {
    title: "世界一周にこれから行く僕が、なぜ若いうちに旅に出た方がいいと考えているか。",
    href: "https://note.com/shosuke240557/n/n262a2e2273d1",
    date: "2026.05",
  },
  {
    title: "本を読んでいただけで、東大休学して貯金ほぼ0で世界一周することになった僕の『本の読み方』を、全部公開します",
    href: "https://note.com/shosuke240557/n/n69698ce0db85",
    date: "2026.05",
  },
  {
    title: "AIが何でも作れる時代に、なぜ「創作」するのか。",
    href: "https://note.com/shosuke240557/n/n5b43bf52bc36",
    date: "2026.04",
  },
];

// ─── 映像(YouTube) ───

export type Video = {
  id: string;
  title: string;
  date: string;
  place: string;
};

export const channelUrl = "https://www.youtube.com/@shosuke_sato";

export const films: Video[] = [
  {
    id: "WI8SgpYi4Es",
    title: "貯金0で世界一周一人旅をして得た6つのもの",
    date: "2026.07",
    place: "スリランカ",
  },
  {
    id: "y5mZkbirYdA",
    title: "インドネシアの超名門「ガジャ・マダ大学」を現地の学生に案内してもらった",
    date: "2026.07",
    place: "ジョグジャカルタ",
  },
  {
    id: "IgQsSdzRiQc",
    title: "舐めて突撃した活火山のフチから見た絶景がガチで恐怖すぎた",
    date: "2026.06",
    place: "ブローモ山",
  },
  {
    id: "m6MwYUMGRn0",
    title: "インドネシアの「日本を超えたおしゃれカフェ」3選",
    date: "2026.06",
    place: "バトゥ",
  },
];

// ─── 旅程 ───

export type Stop = {
  place: string;
  period: string;
  note: string;
  status: "done" | "now" | "next" | "planned";
};

export const journey: Stop[] = [
  {
    place: "東京",
    period: "2026.05",
    note: "大学院を休学し、人生初の一人旅へ。",
    status: "done",
  },
  {
    place: "インドネシア",
    period: "2026.06",
    note: "ジャワ島の家々に泊めてもらいながら暮らす。犠牲祭と、活火山と。",
    status: "done",
  },
  {
    place: "スリランカ",
    period: "2026.07",
    note: "ガラハの山あいのプレスクールに滞在中。",
    status: "now",
  },
  {
    place: "インド",
    period: "つぎ",
    note: "",
    status: "next",
  },
  {
    place: "ジョージア",
    period: "予定",
    note: "旅は九ヶ月、続く。",
    status: "planned",
  },
];
