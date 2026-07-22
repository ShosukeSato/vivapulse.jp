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
  duration: string;
};

export const channelUrl = "https://www.youtube.com/@shosuke_sato";

export const films: Video[] = [
  {
    id: "Vkf4wQSLD04",
    title: "これ、インドネシアの年越しです。",
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
    date: "2026.05",
    place: "東京 → 世界",
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
    date: "2026.05",
    place: "東京",
    duration: "6:43",
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
