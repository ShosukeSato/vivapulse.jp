type PixelIconName =
  | "map"
  | "directory"
  | "enter"
  | "close"
  | "external"
  | "play"
  | "location"
  | "search";

export default function PixelIcon({ name }: { name: PixelIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
  };

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
      {name === "map" && <><path {...common} d="M1 3l4-2 6 2 4-2v12l-4 2-6-2-4 2Z" /><path {...common} d="M5 1v12M11 3v12" /></>}
      {name === "directory" && <><path {...common} d="M2 3h12M2 8h12M2 13h12" /><path {...common} d="M2 3h1M2 8h1M2 13h1" /></>}
      {name === "enter" && <><path {...common} d="M2 8h10M8 4l4 4-4 4" /><path {...common} d="M14 2v12" /></>}
      {name === "close" && <path {...common} d="M3 3l10 10M13 3 3 13" />}
      {name === "external" && <><path {...common} d="M9 2h5v5M14 2 7 9" /><path {...common} d="M12 9v5H2V4h5" /></>}
      {name === "play" && <path d="M4 2v12l9-6Z" fill="currentColor" />}
      {name === "location" && <><path {...common} d="M8 15s5-5 5-9A5 5 0 0 0 3 6c0 4 5 9 5 9Z" /><rect x="7" y="5" width="2" height="2" fill="currentColor" /></>}
      {name === "search" && <><rect {...common} x="2" y="2" width="8" height="8" /><path {...common} d="m10 10 4 4" /></>}
    </svg>
  );
}
