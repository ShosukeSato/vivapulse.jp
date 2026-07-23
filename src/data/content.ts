// ─────────────────────────────────────────────────────────────
// サイトの全コンテンツデータ
// 新しいアプリ・記事・動画・旅の行き先はこのファイルを編集するだけで反映されます
// ─────────────────────────────────────────────────────────────

export const DEPARTURE_DATE = "2026-05-23"; // 世界一周出発日

const profileBioPhrases = [
  "東京大学",
  "大学院を",
  "休学し、",
  "世界一周の",
  "旅をしています。",
  "アプリを",
  "つくり、",
  "文章を書き、",
  "映像を",
  "撮りながら、",
  "世界のどこかで",
  "暮らしています。",
] as const;

export const profile = {
  name: "さとうしょうすけ",
  nameEn: "Shosuke Sato",
  bio: profileBioPhrases.join(""),
  bioPhrases: profileBioPhrases,
  departureNote: "二〇二六年五月二三日、東京を発つ。",
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
  descriptionPhrases?: readonly string[];
  caption: string;
  icon?: string;
  lp: string;
  appStore?: string;
  status: "released" | "coming-soon";
};

const tripVlogDescriptionPhrases = [
  "旅先で撮った",
  "動画から、",
  "日付・場所・",
  "国旗・地図入りの",
  "縦型vlogを",
  "ワンタップで",
  "つくれます。",
  "編集が",
  "追いつかず、",
  "旅を残すために",
  "つくった",
  "アプリを、",
  "いまも毎日",
  "使っています。",
] as const;

const hakuDescriptionPhrases = [
  "撮る、という",
  "判断だけを",
  "人に残して、",
  "そこから先は",
  "すべて委ねる。",
  "光と色と",
  "被写体を読み、",
  "フィルムのような",
  "淡い色調に",
  "整え、",
  "展示のセオリーに",
  "基づいた",
  "余白で",
  "額装する。",
  "一枚の写真が、",
  "一枚の作品に",
  "変わる。",
] as const;

const stockaDescriptionPhrases = [
  "旅先で",
  "「調べて、",
  "終わり」を",
  "繰り返すのが",
  "悔しくて",
  "つくった。",
  "翻訳のたびに",
  "構文・文法・",
  "単語をほどき、",
  "復習カードとして",
  "残せます。",
] as const;

export const products: Product[] = [
  {
    id: "tripvlog",
    name: "TripVlog",
    tagline: "撮るだけ、編集ゼロ。今日から旅が1本のvlogになる。",
    description: tripVlogDescriptionPhrases.join(""),
    descriptionPhrases: tripVlogDescriptionPhrases,
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
    description: hakuDescriptionPhrases.join(""),
    descriptionPhrases: hakuDescriptionPhrases,
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
    description: stockaDescriptionPhrases.join(""),
    descriptionPhrases: stockaDescriptionPhrases,
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
  displayTitle?: {
    lead: string;
    phrases: readonly string[];
  };
  href: string;
  date: string;
  issue?: string;
  thumbnail?: string;
  excerpt?: string;
  excerptPhrases?: readonly string[];
};

const featuredArticleDisplayTitle = {
  lead: "東大を",
  phrases: ["休学して", "貯金0円で", "世界一周", "してるけど、", "僕には", "「やりたい", "こと」", "が1つも", "なかった"],
} as const;

export const featuredArticle = {
  title: `${featuredArticleDisplayTitle.lead}${featuredArticleDisplayTitle.phrases.join("")}`,
  displayTitle: featuredArticleDisplayTitle,
  href: "https://note.com/shosuke240557/n/nc7487ff91841",
  date: "二〇二六年六月 ・ 世界一周の途中にて",
  issue: "2026.06",
  thumbnail: "/media/archive/nc7487ff91841.webp",
  excerpt:
    "「何者か」になりたかった二年前から、やりたいことのないまま世界一周へ出るまで。肩書きと行動力の奥にあった怖さをたどり直した文章。",
  excerptPhrases: [
    "「何者か」に",
    "なりたかった",
    "二年前から、",
    "やりたいことの",
    "ないまま",
    "世界一周へ",
    "出るまで。",
    "肩書きと",
    "行動力の奥に",
    "あった怖さを",
    "たどり直した",
    "文章。",
  ],
} satisfies Article;

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
  displayTitleLines?: readonly string[];
  date: string;
  place: string;
  duration: string;
};

export const channelUrl = "https://www.youtube.com/@shosuke_sato";

export type PodcastEpisode = {
  id: string;
  title: string;
  date: string;
  duration: string;
};

export const niwakaPhilosophyChannelUrl = "https://www.youtube.com/@niwaka_tetsugaku";

/** Official channel feed, newest first. Last verified 2026-07-23. */
export const niwakaPhilosophyEpisodes: PodcastEpisode[] = [
  {
    id: "AFEKFEwe-tU",
    title: "ゴルフじゃないとダメですか？",
    date: "2026.07.20",
    duration: "36:12",
  },
  {
    id: "o_9XUgJ7K_c",
    title: "【言葉とコミニュケーション】通じ合うってなんだ...？【にわか哲学】",
    date: "2026.06.23",
    duration: "40:39",
  },
  {
    id: "vGR0XhCqbbk",
    title: "自己紹介ってなんだ？【にわか哲学】",
    date: "2026.06.05",
    duration: "43:03",
  },
];

const featureFilmTitleLines = ["これ、", "インドネシアの", "年越しです。"] as const;

export const films: Video[] = [
  {
    id: "Vkf4wQSLD04",
    title: featureFilmTitleLines.join(""),
    displayTitleLines: featureFilmTitleLines,
    date: "2026.07",
    place: "インドネシア",
    duration: "9:01",
  },
  {
    id: "G6_y3AEJdBs",
    title: "インドネシアのカラオケが日本のカラオケとどう違うのかを実際に潜入して調査してきました。",
    date: "2026.07",
    place: "インドネシア",
    duration: "4:26",
  },
  {
    id: "m4hBhX5bZqQ",
    title: "【決定版】貯金0円で世界一周する旅行好きの東大生が、旅費を浮かせるために実践している全テクニックを解説します",
    date: "2026.07",
    place: "世界一周",
    duration: "1:29:15",
  },
  {
    id: "y5mZkbirYdA",
    title: "【留学検討者必見】インドネシアの超名門「ガジャ・マダ大学」を現地の学生に案内してもらった",
    date: "2026.07",
    place: "ジョグジャカルタ",
    duration: "37:22",
  },
  {
    id: "WI8SgpYi4Es",
    title: "貯金0で世界一周一人旅をして得た6つのもの【チャンネル登録者100人記念】",
    date: "2026.07",
    place: "世界一周",
    duration: "17:07",
  },
  {
    id: "ywBornpZvrE",
    title: "海外旅行をしていたら詐欺に騙されそうになりました...",
    date: "2026.07",
    place: "旅の途中",
    duration: "9:06",
  },
  {
    id: "m6MwYUMGRn0",
    title: "インドネシアの「日本を超えたおしゃれカフェ」3選",
    date: "2026.06",
    place: "バトゥ",
    duration: "9:08",
  },
  {
    id: "XntnDbBljN8",
    title: "毎週日曜、インドネシアの大通りから車が消えます",
    date: "2026.06",
    place: "インドネシア",
    duration: "4:54",
  },
  {
    id: "IgQsSdzRiQc",
    title: "【ブローモ山ツアー】舐めて突撃した活火山のフチから見た絶景がガチで恐怖すぎた",
    date: "2026.06",
    place: "ブローモ山",
    duration: "9:51",
  },
  {
    id: "3NQBT_z9K9w",
    title: "【実録】日本の焼き鳥をインドネシアの材料で完全再現して、現地の人に振る舞った結果…",
    date: "2026.06",
    place: "インドネシア",
    duration: "7:22",
  },
  {
    id: "AWF8EWxTp5M",
    title: "【絶景】ジャワ島最高峰の「隠された秘境」がガチのサバイバルだった",
    date: "2026.06",
    place: "ジャワ島",
    duration: "6:59",
  },
  {
    id: "Fe-uX3dALXs",
    title: "月収、恋愛、宗教観、日本について…インドネシアの若者の本音を100の質問で完全解剖してみた。",
    date: "2026.06",
    place: "インドネシア",
    duration: "1:24:59",
  },
  {
    id: "GII-mpEEr30",
    title: "【世界一周のリアル】海外で体調を崩しても大丈夫だと思うために準備すべきこと",
    date: "2026.06",
    place: "旅の途中",
    duration: "13:14",
  },
  {
    id: "wb7EO53RxmQ",
    title: "【検証】世界一周スタート直後にインドネシアでTOEICを受けたら、驚きの点数でした。",
    date: "2026.06",
    place: "インドネシア",
    duration: "7:42",
  },
  {
    id: "IR-GR-u0kMM",
    title: "休学して世界一周へ。インドネシアでボランティアしながら過ごす僕の日常。",
    date: "2026.06",
    place: "インドネシア",
    duration: "8:36",
  },
  {
    id: "SSyi9kzt4f4",
    title: "【なぜ入れた？】インドネシアの巨大スタジアムにガチ潜入。",
    date: "2026.06",
    place: "インドネシア",
    duration: "5:14",
  },
  {
    id: "0YEteYzbbxM",
    title: "招待状も面識もゼロ!? インドネシアの結婚式に潜入したら日本と違いすぎた...",
    date: "2026.06",
    place: "インドネシア",
    duration: "5:36",
  },
  {
    id: "CdgkigYcko8",
    title: "世界無形文化遺産「バティックアート」を制作。伝統工芸に隠された職人技が凄すぎた",
    date: "2026.06",
    place: "インドネシア",
    duration: "7:23",
  },
  {
    id: "incaRvEWqtg",
    title: "【大ピンチ】インドネシアの学校で「明日1時間プレゼンして」と無茶振りされた末路。",
    date: "2026.06",
    place: "インドネシア",
    duration: "11:54",
  },
  {
    id: "WXLdtkwCSPY",
    title: "【宿泊費0円】タダ宿で世界一周する男によるルームツアー",
    date: "2026.06",
    place: "インドネシア",
    duration: "6:50",
  },
  {
    id: "fzQJN6qs-x4",
    title: "【宿泊費・食費無料】「タダ飯・タダ宿」で世界一周旅行できている理由",
    date: "2026.06",
    place: "世界一周",
    duration: "6:33",
  },
  {
    id: "7pmqJf9sdIk",
    title: "ジャカルタを7時間で観光してみよう！",
    date: "2026.06",
    place: "ジャカルタ",
    duration: "14:19",
  },
  {
    id: "exr5-6Sb9h0",
    title: "【トラブル有り】貯金ほぼ0円、9ヶ月間の世界一周の旅がスタートしました。",
    displayTitleLines: ["【トラブル", "有り】", "貯金ほぼ0円、", "9ヶ月間の", "世界一周の", "旅が", "スタート", "しました。"],
    date: "2026.05",
    place: "東京から世界へ",
    duration: "5:35",
  },
  {
    id: "SS6fuQaP4bc",
    title: "東大を休学して、バックパックだけで世界一周に出る男の全持ち物。",
    date: "2026.05",
    place: "東京",
    duration: "8:52",
  },
  {
    id: "WqQ4d-KwOZg",
    title: "東大を休学して、貯金ほぼ0で世界一周を始めました。",
    displayTitleLines: ["東大を", "休学して、", "貯金ほぼ0で", "世界一周を", "始めました。"],
    date: "2026.05",
    place: "東京",
    duration: "6:43",
  },
];

/** The editorially selected film used across the cinema, Central and home. */
export const featuredFilm = films.find((film) => film.id === "WqQ4d-KwOZg")!;

// ─── 旅程 ───

export type Stop = {
  place: string;
  period: string;
  note: string;
  notePhrases?: readonly string[];
  status: "done" | "now" | "next" | "planned";
};

export const journey: Stop[] = [
  {
    place: "東京",
    period: "2026.05",
    note: "東京大学大学院を休学し、人生初の一人旅へ。",
    notePhrases: ["東京大学", "大学院を", "休学し、", "人生初の", "一人旅へ。"],
    status: "done",
  },
  {
    place: "インドネシア",
    period: "2026.06",
    note: "ジャワ島の家々に泊めてもらいながら暮らす。犠牲祭と、活火山と。",
    notePhrases: ["ジャワ島の", "家々に泊めて", "もらいながら", "暮らす。", "犠牲祭と、", "活火山と。"],
    status: "done",
  },
  {
    place: "スリランカ",
    period: "2026.07",
    note: "スリランカを移動しながら、旅と制作を続ける。",
    notePhrases: ["スリランカを", "移動しながら、", "旅と制作を", "続ける。"],
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
    notePhrases: ["旅は九ヶ月、", "続く。"],
    status: "planned",
  },
];

/** The live route state has one canonical source for the map, Central and terminal. */
export const currentJourneyStop = journey.find((stop) => stop.status === "now")!;
export const nextJourneyStop = journey.find((stop) => stop.status === "next")!;
