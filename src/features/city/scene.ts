export const CITY_SCENE_WIDTH = 1440;
export const CITY_SCENE_HEIGHT = 1100;
export const CITY_SCENE_VIEW_BOX = `0 0 ${CITY_SCENE_WIDTH} ${CITY_SCENE_HEIGHT}`;

export const CITY_SCENE_PALETTE = {
  blackDepth: "#081923",
  outline: "#102B3B",
  deepWater: "#14536A",
  water: "#1F748A",
  waterHighlight: "#5CB3BF",
  sky: "#7FAEC3",
  haze: "#C5D9D8",
  lightStone: "#E5E1D4",
  midStone: "#B8BCB2",
  stoneShadow: "#7B8887",
  lightGlass: "#ABD1D2",
  glass: "#6FA1AD",
  glassShadow: "#366B78",
  foliage: "#3F705A",
  foliageLight: "#75A06D",
  warmLight: "#F3C85E",
  lightCore: "#FFE5A3",
  selection: "#ED6A55",
  brick: "#A75543",
  asphalt: "#334A52",
  tripVlogBlue: "#267FA3",
  hakuWhite: "#F6F2EA",
  stockaGreen: "#4F8B70",
} as const;

export const CITY_SCENE_ORDER = [
  "construction",
  "tripvlog",
  "stocka",
  "haku",
  "station",
  "strategy",
  "library",
  "cinema",
  "harbor",
] as const;

export type CityScenePlaceId = (typeof CITY_SCENE_ORDER)[number];

export type CitySceneBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CitySceneLabel = {
  x: number;
  y: number;
  width: number;
};

export type CityScenePlacement = {
  bounds: CitySceneBounds;
  label: CitySceneLabel;
};

/**
 * Interaction bounds and labels are kept apart from the semantic place data.
 * All values are integer source pixels in the 24px CITY 01 tile system.
 */
export const CITY_SCENE_PLACEMENTS = {
  construction: {
    bounds: { x: 48, y: 48, width: 312, height: 216 },
    label: { x: 48, y: 228, width: 264 },
  },
  tripvlog: {
    bounds: { x: 420, y: 48, width: 240, height: 216 },
    label: { x: 408, y: 228, width: 264 },
  },
  stocka: {
    bounds: { x: 1032, y: 48, width: 336, height: 216 },
    label: { x: 1068, y: 228, width: 300 },
  },
  haku: {
    bounds: { x: 48, y: 336, width: 336, height: 216 },
    label: { x: 48, y: 516, width: 264 },
  },
  station: {
    bounds: { x: 480, y: 312, width: 384, height: 240 },
    label: { x: 480, y: 516, width: 288 },
  },
  strategy: {
    bounds: { x: 852, y: 384, width: 132, height: 168 },
    label: { x: 780, y: 516, width: 180 },
  },
  library: {
    bounds: { x: 936, y: 336, width: 336, height: 216 },
    label: { x: 972, y: 516, width: 276 },
  },
  cinema: {
    bounds: { x: 168, y: 588, width: 360, height: 132 },
    label: { x: 144, y: 612, width: 300 },
  },
  harbor: {
    bounds: { x: 936, y: 576, width: 360, height: 264 },
    label: { x: 984, y: 612, width: 288 },
  },
} as const satisfies Record<CityScenePlaceId, CityScenePlacement>;
