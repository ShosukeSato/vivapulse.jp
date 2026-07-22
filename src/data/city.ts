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
  name: string;
  shortName: string;
  district: string;
  kind: CityPlaceKind;
  x: number;
  y: number;
  status: "open" | "live" | "building";
  href?: string;
  action: string;
  summary: string;
};

export const cityPlaces: CityPlace[] = [
  {
    id: "construction",
    name: "ゼロイチ建設区",
    shortName: "01 YARD",
    district: "北西開発区",
    kind: "construction",
    x: 0.8,
    y: 1.2,
    status: "building",
    action: "計画を見る",
    summary: "小さなアプリと実験が生まれ続ける工事区画。",
  },
  {
    id: "tripvlog",
    name: "TripVlog 映像店",
    shortName: "TRIPVLOG",
    district: "メイカーズ街",
    kind: "tripvlog",
    x: 2.05,
    y: 2.45,
    status: "open",
    href: "https://shosukesato.github.io/tripvlog-lp/",
    action: "公式サイトへ",
    summary: "撮るだけで旅の一日が映像になる、旅行者のための映像店。",
  },
  {
    id: "haku",
    name: "HAKU 写真館",
    shortName: "HAKU",
    district: "メイカーズ街",
    kind: "haku",
    x: 1.35,
    y: 5.8,
    status: "open",
    href: "https://shosukesato.github.io/haku-lp/",
    action: "公式サイトへ",
    summary: "撮った一枚を作品へ変える、海辺の写真館とギャラリー。",
  },
  {
    id: "stocka",
    name: "Stocka 語学学校",
    shortName: "STOCKA",
    district: "メイカーズ街",
    kind: "stocka",
    x: 5.85,
    y: 1.45,
    status: "open",
    href: "https://stocka-lp.vercel.app/",
    action: "公式サイトへ",
    summary: "翻訳を自分の英語へ変える、港を望む語学学校。",
  },
  {
    id: "station",
    name: "現在地中央駅",
    shortName: "NOW ST.",
    district: "中央区",
    kind: "station",
    x: 4.45,
    y: 4.45,
    status: "live",
    action: "駅に入る",
    summary: "さとうしょうすけの現在地と、ここまでの旅路。",
  },
  {
    id: "cinema",
    name: "旅の中央映画館",
    shortName: "TABI CINEMA",
    district: "シアター街",
    kind: "cinema",
    x: 3.2,
    y: 8.15,
    status: "live",
    href: "https://www.youtube.com/@shosuke_sato",
    action: "上映作品を観る",
    summary: "世界一周の最新映像を上映する、海辺のシネマコンプレックス。",
  },
  {
    id: "strategy",
    name: "人生の作戦会議室",
    shortName: "B2 / RADIO",
    district: "市役所地下二階",
    kind: "strategy",
    x: 7.1,
    y: 2.75,
    status: "live",
    action: "地下へ降りる",
    summary: "人生の選択を話し合う、市役所地下二階の秘密放送室。",
  },
  {
    id: "library",
    name: "途中市立図書館",
    shortName: "220+ NOTES",
    district: "記録街",
    kind: "library",
    x: 6.65,
    y: 5.8,
    status: "open",
    href: "https://note.com/shosuke240557",
    action: "図書館に入る",
    summary: "旅と人生について書いた220本以上を収蔵する中央図書館。",
  },
  {
    id: "harbor",
    name: "世界一周港",
    shortName: "WORLD PORT",
    district: "臨海区",
    kind: "harbor",
    x: 8.15,
    y: 7.8,
    status: "live",
    action: "航路を見る",
    summary: "東京から世界へ。旅が進むたびに航路が延びる中央港。",
  },
];
