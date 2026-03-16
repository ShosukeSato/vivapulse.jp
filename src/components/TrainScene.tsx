"use client";

export default function TrainScene() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none h-24">
      {/* Rail track */}
      <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-ink/8" />
      <div className="absolute bottom-5 left-0 right-0 flex gap-5">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="w-4 h-0.5 bg-ink/6 shrink-0" />
        ))}
      </div>

      {/* Shinkansen - colorful */}
      <div className="animate-train absolute bottom-7">
        <svg width="140" height="24" viewBox="0 0 140 24" fill="none">
          <path d="M15 4 L125 4 Q140 4 140 12 L140 18 L0 18 L0 12 Q0 4 15 4Z" fill="#7C3AED" fillOpacity="0.35" />
          <path d="M125 4 Q145 12 125 18" fill="#7C3AED" fillOpacity="0.35" />
          {[20, 38, 56, 74, 92, 110].map((x) => (
            <rect key={x} x={x} y="7" width="10" height="5" rx="1.5" fill="#FFF8F0" fillOpacity="0.9" />
          ))}
          <rect x="0" y="14" width="35" height="2" rx="1" fill="#FF4545" fillOpacity="0.7" />
          <rect x="35" y="14" width="35" height="2" rx="1" fill="#FFB800" fillOpacity="0.7" />
          <rect x="70" y="14" width="35" height="2" rx="1" fill="#00D4AA" fillOpacity="0.7" />
          <rect x="105" y="14" width="35" height="2" rx="1" fill="#0EA5E9" fillOpacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
