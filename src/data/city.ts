export type CityPlaceKind =
  | "station"
  | "tripvlog"
  | "haku"
  | "stocka"
  | "library"
  | "cinema"
  | "strategy"
  | "harbor"
  | "construction";

export type CityPlace = {
  id: string;
  /** The wayfinding code shown consistently on the map, guide and detail panels. */
  code: string;
  name: string;
  shortName: string;
  district: string;
  /** A plain-language description of where the link or map action leads. */
  destination: string;
  kind: CityPlaceKind;
  x: number;
  y: number;
  /** Offset from the building origin used by the SVG callout label. */
  labelDx: number;
  labelDy: number;
  status: "open" | "live" | "building";
  /** The CITY 01 interior route. Every place is entered through the city first. */
  path: string;
  /** The real-world destination, exposed as a CTA from the interior page. */
  externalHref?: string;
  action: string;
  summary: string;
};

export const cityPlaces: CityPlace[] = [
  {
    id: "construction",
    code: "N-01",
    name: "01 YARD",
    shortName: "01 YARD",
    district: "NORTH YARD",
    destination: "制作中のプロジェクト",
    kind: "construction",
    x: 0.7,
    y: 2.5,
    labelDx: -54,
    labelDy: -148,
    status: "building",
    path: "/places/01-yard",
    action: "施設に入る",
    summary: "小さなアプリと実験が生まれ続ける工事区画。",
  },
  {
    id: "tripvlog",
    code: "M-01",
    name: "TRIPVLOG STUDIO",
    shortName: "TRIPVLOG",
    district: "MAKERS QUAY",
    destination: "TripVlog 公式サイト",
    kind: "tripvlog",
    x: 1.5,
    y: 3.8,
    labelDx: -58,
    labelDy: -151,
    status: "open",
    path: "/places/tripvlog-studio",
    externalHref: "https://shosukesato.github.io/tripvlog-lp/",
    action: "施設に入る",
    summary: "撮るだけで旅の一日が映像になる、旅行者のための映像店。",
  },
  {
    id: "haku",
    code: "M-02",
    name: "HAKU GALLERY",
    shortName: "HAKU",
    district: "MAKERS QUAY",
    destination: "HAKU 公式サイト",
    kind: "haku",
    x: 0.9,
    y: 5.6,
    labelDx: -58,
    labelDy: -108,
    status: "open",
    path: "/places/haku-gallery",
    externalHref: "https://shosukesato.github.io/haku-lp/",
    action: "施設に入る",
    summary: "撮った一枚を作品へ変える、海辺の写真館とギャラリー。",
  },
  {
    id: "stocka",
    code: "M-03",
    name: "STOCKA LAB",
    shortName: "STOCKA",
    district: "MAKERS QUAY",
    destination: "Stocka 公式サイト",
    kind: "stocka",
    x: 5.7,
    y: 0.8,
    labelDx: 54,
    labelDy: -181,
    status: "open",
    path: "/places/stocka-lab",
    externalHref: "https://stocka-lp.vercel.app/",
    action: "施設に入る",
    summary: "翻訳を自分の英語へ変える、港を望む語学学校。",
  },
  {
    id: "station",
    code: "C-01",
    name: "CITY 01 CENTRAL",
    shortName: "CITY 01 CENTRAL",
    district: "CENTRAL",
    destination: "SHOSUKE SATO / 現在地とプロフィール",
    kind: "station",
    x: 5.9,
    y: 4.4,
    labelDx: 26,
    labelDy: -140,
    status: "live",
    path: "/places/city-01-central",
    action: "施設に入る",
    summary: "さとうしょうすけの現在地と、ここまでの旅路。",
  },
  {
    id: "cinema",
    code: "P-01",
    name: "VOYAGE CINEMA",
    shortName: "VOYAGE CINEMA",
    district: "CULTURE PROMENADE",
    destination: "YouTube / 世界一周チャンネル",
    kind: "cinema",
    x: 2.4,
    y: 7.4,
    labelDx: -78,
    labelDy: -184,
    status: "live",
    path: "/places/voyage-cinema",
    externalHref: "https://www.youtube.com/@shosuke_sato",
    action: "施設に入る",
    summary: "世界一周の最新映像を上映する、海辺のシネマコンプレックス。",
  },
  {
    id: "strategy",
    code: "C-B2",
    name: "B2 STUDIO",
    shortName: "B2 STUDIO",
    district: "CENTRAL",
    destination: "人生の作戦会議室 / 準備中",
    kind: "strategy",
    x: 7.7,
    y: 2.6,
    labelDx: 62,
    labelDy: -103,
    status: "live",
    path: "/places/b2-studio",
    action: "施設に入る",
    summary: "人生の選択と次の一手を、夜にじっくり考える小さな放送室。",
  },
  {
    id: "library",
    code: "A-01",
    name: "THE ARCHIVE",
    shortName: "THE ARCHIVE",
    district: "CULTURE PROMENADE",
    destination: "note / 220本以上の記事",
    kind: "library",
    x: 7.1,
    y: 5.2,
    labelDx: 112,
    labelDy: -142,
    status: "open",
    path: "/places/the-archive",
    externalHref: "https://note.com/shosuke240557",
    action: "施設に入る",
    summary: "旅と人生について書いた220本以上を収蔵する中央図書館。",
  },
  {
    id: "harbor",
    code: "W-01",
    name: "ROUTE TERMINAL",
    shortName: "ROUTE TERMINAL",
    district: "HARBOR EDGE",
    destination: "世界一周ルート / 現在地",
    kind: "harbor",
    x: 8.6,
    y: 7.2,
    labelDx: 87,
    labelDy: -122,
    status: "live",
    path: "/places/route-terminal",
    action: "施設に入る",
    summary: "東京から世界へ。旅が進むたびに航路が延びる中央港。",
  },
];
