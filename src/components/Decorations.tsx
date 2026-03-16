"use client";

/* Polaroid-style photo frame with REAL photo or abstract art */
export function Polaroid({
  className = "",
  rotate = 0,
  color1 = "#FF4545",
  color2 = "#7C3AED",
  color3 = "#FFB800",
  label = "",
  src = "",
}: {
  className?: string;
  rotate?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  label?: string;
  src?: string;
}) {
  return (
    <div
      className={`bg-white p-2 pb-8 shadow-lg shadow-black/10 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-full aspect-[4/3] relative overflow-hidden bg-cream-dark">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={label || "photo"} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <svg viewBox="0 0 200 150" className="w-full h-full">
            <rect width="200" height="150" fill={color1} opacity="0.15" />
            <circle cx="60" cy="50" r="45" fill={color1} opacity="0.5" />
            <circle cx="150" cy="80" r="55" fill={color2} opacity="0.4" />
            <circle cx="100" cy="120" r="35" fill={color3} opacity="0.6" />
            <path d="M0 100 Q50 60 100 90 T200 80 L200 150 L0 150Z" fill={color2} opacity="0.3" />
            <path d="M0 120 Q80 80 160 110 T200 100 L200 150 L0 150Z" fill={color1} opacity="0.25" />
          </svg>
        )}
      </div>
      {label && (
        <p className="text-center text-[10px] font-mono font-bold text-ink-muted mt-2 tracking-wider">{label}</p>
      )}
    </div>
  );
}

/* Photo card — for note/YouTube thumbnails */
export function PhotoCard({
  className = "",
  rotate = 0,
  src,
  label = "",
  href = "",
  color = "#FF4545",
}: {
  className?: string;
  rotate?: number;
  src: string;
  label?: string;
  href?: string;
  color?: string;
}) {
  const inner = (
    <div
      className={`bg-white rounded-xl shadow-lg shadow-black/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-full aspect-[16/9] relative overflow-hidden bg-cream-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label || "content"} className="w-full h-full object-cover" loading="lazy" />
      </div>
      {label && (
        <div className="p-2.5 border-t-3" style={{ borderColor: color }}>
          <p className="text-[10px] font-bold text-ink leading-tight line-clamp-2">{label}</p>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

/* Postcard element */
export function Postcard({
  className = "",
  rotate = 0,
  city = "TOKYO",
  color = "#FF4545",
  src = "",
}: {
  className?: string;
  rotate?: number;
  city?: string;
  color?: string;
  src?: string;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg shadow-black/10 overflow-hidden ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative">
        {src ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={city} className="w-full aspect-[5/3] object-cover" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-[10px] font-extrabold tracking-[0.2em] text-white">{city}</p>
            </div>
          </div>
        ) : (
          <>
            <svg viewBox="0 0 240 140" className="w-full">
              <defs>
                <linearGradient id={`sky-${city}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect width="240" height="140" fill={`url(#sky-${city})`} />
              <rect x="15" y="60" width="25" height="80" fill={color} opacity="0.4" rx="2" />
              <rect x="45" y="40" width="20" height="100" fill={color} opacity="0.5" rx="2" />
              <rect x="70" y="55" width="30" height="85" fill={color} opacity="0.35" rx="2" />
              <rect x="105" y="30" width="18" height="110" fill={color} opacity="0.55" rx="2" />
              <rect x="128" y="50" width="28" height="90" fill={color} opacity="0.4" rx="2" />
              <rect x="162" y="65" width="22" height="75" fill={color} opacity="0.45" rx="2" />
              <rect x="190" y="45" width="20" height="95" fill={color} opacity="0.5" rx="2" />
              <rect x="215" y="70" width="25" height="70" fill={color} opacity="0.35" rx="2" />
              <circle cx="190" cy="30" r="18" fill={color} opacity="0.3" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/80 backdrop-blur-sm">
              <p className="text-xs font-extrabold tracking-[0.2em]" style={{ color }}>{city}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* Travel sticker */
export function Sticker({
  className = "",
  rotate = 0,
  text = "",
  color = "#FF4545",
  shape = "circle",
}: {
  className?: string;
  rotate?: number;
  text?: string;
  color?: string;
  shape?: "circle" | "rect" | "diamond";
}) {
  const shapeClass = shape === "circle"
    ? "rounded-full aspect-square"
    : shape === "diamond"
    ? "rounded-lg aspect-square rotate-45"
    : "rounded-lg";

  return (
    <div
      className={`flex items-center justify-center font-extrabold text-white text-center leading-tight shadow-lg ${shapeClass} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color,
        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
      }}
    >
      <span className={shape === "diamond" ? "-rotate-45 text-[9px] tracking-wider" : "text-[10px] tracking-wider"}>
        {text}
      </span>
    </div>
  );
}

/* Washi tape strip */
export function WashiTape({
  className = "",
  rotate = 0,
  color = "#FFB800",
}: {
  className?: string;
  rotate?: number;
  color?: string;
}) {
  return (
    <div
      className={`h-6 rounded-sm ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color,
        opacity: 0.35,
      }}
    />
  );
}

/* Passport stamp (more detailed) */
export function PassportStamp({
  className = "",
  rotate = 0,
  text = "TOKYO",
  subtext = "JAPAN",
  date = "2025.03",
  color = "#FF4545",
}: {
  className?: string;
  rotate?: number;
  text?: string;
  subtext?: string;
  date?: string;
  color?: string;
}) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="3" opacity="0.7" />
        <circle cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
        <text x="60" y="48" fill={color} fontSize="14" textAnchor="middle" fontFamily="monospace" fontWeight="bold" opacity="0.8">
          {text}
        </text>
        <line x1="25" y1="56" x2="95" y2="56" stroke={color} strokeWidth="1" opacity="0.4" />
        <text x="60" y="72" fill={color} fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.6">
          {subtext}
        </text>
        <text x="60" y="88" fill={color} fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.5">
          {date}
        </text>
        <text x="28" y="38" fill={color} fontSize="8" opacity="0.5">★</text>
        <text x="85" y="38" fill={color} fontSize="8" opacity="0.5">★</text>
      </svg>
    </div>
  );
}
