"use client";

export default function FlyingPlane() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main plane flying right */}
      <div className="absolute top-[12%] animate-fly-across">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-coral drop-shadow-lg">
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="currentColor"
          />
        </svg>
      </div>
      {/* Smaller plane flying left */}
      <div className="absolute top-[55%] animate-fly-across-reverse">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-violet drop-shadow-md">
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="currentColor"
          />
        </svg>
      </div>
      {/* Third plane flying right */}
      <div className="absolute top-[35%]" style={{ animation: "fly-across 22s linear infinite 8s" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-golden/70">
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
