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
  /** Sign amber for facility codes; kept off warmLight so it never reads as a city light. */
  signAmber: "#E3B851",
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
  "diary",
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
  /** Visible focus frame around the landmark. */
  bounds: CitySceneBounds;
  /** Compact interaction area for the phone preview; 198 units keeps 44 CSS px at 320px. */
  hitBounds?: CitySceneBounds;
  /** Desktop interaction area; encloses the artwork and its name plate. */
  desktopHitBounds?: CitySceneBounds;
  label: CitySceneLabel;
};

/** Corner brackets only, so the landmark stays readable inside the frame. */
export function cityFocusPath({ x, y, width, height }: CitySceneBounds, arm = 14) {
  return (
    `M${x} ${y + arm}V${y}H${x + arm}` +
    ` M${x + width - arm} ${y}H${x + width}V${y + arm}` +
    ` M${x} ${y + height - arm}V${y + height}H${x + arm}` +
    ` M${x + width - arm} ${y + height}H${x + width}V${y + height - arm}`
  );
}

/**
 * Interaction bounds and labels are kept apart from the semantic place data.
 * All values are integer source pixels in the 24px CITY 01 tile system.
 */
export const CITY_SCENE_PLACEMENTS = {
  construction: {
    bounds: { x: 48, y: 48, width: 312, height: 216 },
    desktopHitBounds: { x: 48, y: 48, width: 312, height: 244 },
    label: { x: 48, y: 228, width: 168 },
  },
  diary: {
    bounds: { x: 744, y: 48, width: 264, height: 216 },
    desktopHitBounds: { x: 720, y: 48, width: 312, height: 244 },
    label: { x: 744, y: 228, width: 288 },
  },
  tripvlog: {
    bounds: { x: 420, y: 48, width: 240, height: 216 },
    desktopHitBounds: { x: 384, y: 48, width: 300, height: 244 },
    label: { x: 384, y: 228, width: 300 },
  },
  stocka: {
    bounds: { x: 1032, y: 48, width: 336, height: 216 },
    desktopHitBounds: { x: 1032, y: 48, width: 336, height: 244 },
    label: { x: 1068, y: 228, width: 216 },
  },
  haku: {
    bounds: { x: 48, y: 336, width: 336, height: 216 },
    desktopHitBounds: { x: 48, y: 336, width: 336, height: 244 },
    label: { x: 48, y: 516, width: 252 },
  },
  station: {
    bounds: { x: 480, y: 312, width: 372, height: 240 },
    hitBounds: { x: 480, y: 312, width: 348, height: 240 },
    desktopHitBounds: { x: 480, y: 312, width: 372, height: 268 },
    label: { x: 480, y: 516, width: 300 },
  },
  strategy: {
    bounds: { x: 864, y: 384, width: 120, height: 168 },
    hitBounds: { x: 828, y: 354, width: 204, height: 198 },
    /** Starts at 852 so CENTRAL keeps its own east tower; B2 yields its plate's left 24px. */
    desktopHitBounds: { x: 852, y: 384, width: 180, height: 196 },
    label: { x: 828, y: 516, width: 204 },
  },
  library: {
    bounds: { x: 1032, y: 336, width: 336, height: 216 },
    hitBounds: { x: 1032, y: 336, width: 336, height: 216 },
    desktopHitBounds: { x: 1032, y: 336, width: 336, height: 244 },
    label: { x: 1068, y: 516, width: 240 },
  },
  cinema: {
    bounds: { x: 192, y: 588, width: 336, height: 132 },
    hitBounds: { x: 168, y: 552, width: 360, height: 198 },
    desktopHitBounds: { x: 192, y: 580, width: 336, height: 216 },
    label: { x: 192, y: 732, width: 264 },
  },
  harbor: {
    bounds: { x: 948, y: 600, width: 348, height: 240 },
    desktopHitBounds: { x: 948, y: 600, width: 348, height: 328 },
    label: { x: 984, y: 864, width: 288 },
  },
} as const satisfies Record<CityScenePlaceId, CityScenePlacement>;
