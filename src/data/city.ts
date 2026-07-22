export type CityPlaceKind =
  | "station"
  | "tripvlog"
  | "haku"
  | "stocka"
  | "library"
  | "broadcast"
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
  },
  {
    id: "broadcast",
    name: "旅の中央放送局",
    shortName: "TABI TV",
    district: "放送街",
    kind: "broadcast",
    x: 2.2,
    y: 7.15,
    status: "live",
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
  },
];
