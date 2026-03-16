"use client";

export default function WorldMap() {
  return (
    <svg
      viewBox="0 0 1200 600"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Grid lines */}
      {[100, 150, 200, 250, 300, 350, 400, 450, 500].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#7C3AED" strokeWidth="0.3" opacity="0.12" />
      ))}
      {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#00D4AA" strokeWidth="0.3" opacity="0.12" />
      ))}

      {/* ===== NORTH AMERICA ===== */}
      <path
        d="M80,120 L95,105 L120,95 L145,85 L170,80 L200,82 L225,78 L250,82
           L270,90 L285,100 L295,88 L310,85 L330,90 L340,100 L335,112 L325,120
           L315,130 L305,125 L290,128 L285,140 L280,155 L275,170 L268,178
           L260,185 L248,190 L235,200 L225,210 L218,220 L210,235 L200,245
           L195,260 L190,275 L185,282 L175,285 L165,280 L160,270 L155,258
           L148,248 L140,240 L135,228 L128,215 L120,205 L110,195 L100,185
           L92,175 L85,162 L80,150 L78,138Z"
        stroke="#7C3AED"
        strokeWidth="1.5"
        fill="#7C3AED"
        fillOpacity="0.10"
      />
      {/* Central America */}
      <path
        d="M175,285 L185,282 L190,290 L198,295 L205,302 L210,310 L215,318
           L218,325 L212,330 L205,328 L198,322 L192,315 L185,308 L180,300 L175,292Z"
        stroke="#7C3AED"
        strokeWidth="1"
        fill="#7C3AED"
        fillOpacity="0.08"
      />
      {/* Greenland */}
      <path
        d="M290,55 L310,48 L335,50 L350,58 L355,68 L348,78 L335,82 L318,80 L305,75 L295,68 L290,60Z"
        stroke="#0EA5E9"
        strokeWidth="1"
        fill="#0EA5E9"
        fillOpacity="0.08"
      />

      {/* ===== SOUTH AMERICA ===== */}
      <path
        d="M218,325 L235,318 L255,315 L270,320 L282,330 L290,342 L295,358
           L298,375 L300,392 L298,410 L294,425 L288,440 L280,455 L270,465
           L258,472 L248,475 L240,470 L235,458 L232,445 L230,430 L228,415
           L225,400 L222,385 L218,370 L215,355 L212,340Z"
        stroke="#00D4AA"
        strokeWidth="1.5"
        fill="#00D4AA"
        fillOpacity="0.10"
      />

      {/* ===== EUROPE ===== */}
      <path
        d="M480,85 L495,78 L510,80 L525,75 L540,78 L555,82 L568,88 L575,95
           L580,105 L578,115 L570,122 L560,128 L548,132 L540,138 L535,145
           L528,150 L518,148 L510,142 L502,138 L495,132 L490,125 L485,118
           L482,108 L480,98Z"
        stroke="#0EA5E9"
        strokeWidth="1.5"
        fill="#0EA5E9"
        fillOpacity="0.10"
      />
      {/* Scandinavia */}
      <path
        d="M510,55 L520,48 L535,50 L545,55 L548,65 L545,75 L540,78 L525,75 L515,70 L510,62Z"
        stroke="#0EA5E9"
        strokeWidth="1"
        fill="#0EA5E9"
        fillOpacity="0.08"
      />
      {/* UK */}
      <path
        d="M460,90 L468,85 L475,88 L478,95 L475,105 L468,108 L462,102 L460,95Z"
        stroke="#0EA5E9"
        strokeWidth="1"
        fill="#0EA5E9"
        fillOpacity="0.10"
      />

      {/* ===== AFRICA ===== */}
      <path
        d="M498,195 L515,188 L535,185 L555,190 L570,198 L582,210 L590,225
           L595,242 L598,260 L600,280 L598,300 L594,318 L588,335 L580,350
           L570,362 L558,372 L545,378 L532,380 L520,375 L510,365 L502,352
           L496,338 L492,322 L490,305 L488,288 L488,270 L490,252 L492,235
           L494,218 L496,205Z"
        stroke="#F97316"
        strokeWidth="1.5"
        fill="#F97316"
        fillOpacity="0.10"
      />
      {/* Madagascar */}
      <path
        d="M612,340 L618,335 L622,342 L620,355 L615,362 L610,358 L610,348Z"
        stroke="#F97316"
        strokeWidth="1"
        fill="#F97316"
        fillOpacity="0.08"
      />

      {/* ===== ASIA (mainland) ===== */}
      <path
        d="M580,105 L610,95 L640,88 L670,82 L700,78 L730,75 L760,78 L790,82
           L820,88 L850,95 L875,105 L895,118 L910,132 L918,148 L920,165
           L915,180 L905,192 L895,200 L880,205 L870,215 L858,225 L845,232
           L830,235 L815,230 L800,225 L785,218 L770,215 L755,210 L740,205
           L725,198 L710,192 L695,185 L680,178 L665,172 L650,168 L635,162
           L620,155 L608,148 L598,140 L590,130 L585,118Z"
        stroke="#F43F5E"
        strokeWidth="1.5"
        fill="#F43F5E"
        fillOpacity="0.08"
      />
      {/* India */}
      <path
        d="M725,198 L740,205 L748,218 L752,232 L755,248 L752,265 L745,278
           L735,288 L725,292 L718,285 L712,272 L710,258 L712,242 L715,228 L720,215Z"
        stroke="#F43F5E"
        strokeWidth="1"
        fill="#F43F5E"
        fillOpacity="0.10"
      />
      {/* Southeast Asia */}
      <path
        d="M830,235 L845,232 L855,240 L862,252 L865,265 L860,278 L852,288
           L840,292 L830,288 L822,278 L818,265 L820,252 L825,242Z"
        stroke="#F43F5E"
        strokeWidth="1"
        fill="#F43F5E"
        fillOpacity="0.08"
      />
      {/* Middle East */}
      <path
        d="M598,140 L620,155 L635,162 L645,172 L642,185 L635,195 L625,200
           L615,198 L605,192 L598,182 L595,170 L595,155Z"
        stroke="#FFB800"
        strokeWidth="1"
        fill="#FFB800"
        fillOpacity="0.08"
      />

      {/* ===== JAPAN ===== */}
      <path
        d="M930,118 L935,125 L938,135 L940,148 L942,160 L940,172 L936,182
           L930,188 L925,180 L922,168 L920,155 L920,142 L922,132 L926,124Z"
        stroke="#FF4545"
        strokeWidth="2.5"
        fill="#FF4545"
        fillOpacity="0.25"
      />
      {/* Hokkaido */}
      <path
        d="M935,108 L942,105 L948,110 L946,118 L940,120 L935,115Z"
        stroke="#FF4545"
        strokeWidth="2"
        fill="#FF4545"
        fillOpacity="0.20"
      />

      {/* ===== AUSTRALIA ===== */}
      <path
        d="M880,370 L910,358 L940,355 L968,360 L988,372 L1000,388 L1005,405
           L1002,422 L995,438 L982,448 L968,455 L950,458 L935,455 L920,448
           L908,438 L898,425 L892,410 L888,395 L882,382Z"
        stroke="#FFB800"
        strokeWidth="1.5"
        fill="#FFB800"
        fillOpacity="0.10"
      />
      {/* New Zealand */}
      <path
        d="M1045,420 L1050,415 L1055,420 L1055,435 L1050,445 L1045,440 L1043,430Z"
        stroke="#FFB800"
        strokeWidth="1"
        fill="#FFB800"
        fillOpacity="0.10"
      />

      {/* ===== INDONESIA / ARCHIPELAGO ===== */}
      <path
        d="M840,300 L860,295 L880,298 L900,302 L920,308 L935,315 L928,322 L915,318 L898,315 L880,312 L862,308 L845,305Z"
        stroke="#10B981"
        strokeWidth="1"
        fill="#10B981"
        fillOpacity="0.08"
      />

      {/* ===== Flight paths ===== */}
      {/* Tokyo to New York */}
      <path
        d="M935 148 Q700 25 200 180"
        className="flight-path"
        stroke="#FF4545"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Tokyo to London */}
      <path
        d="M930 135 Q750 55 510 90"
        className="flight-path-2"
        stroke="#7C3AED"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Tokyo to Sydney */}
      <path
        d="M935 175 Q960 290 960 370"
        className="flight-path-2"
        stroke="#FFB800"
        strokeWidth="2"
        fill="none"
        style={{ animationDelay: "2s" }}
      />
      {/* Tokyo to Sao Paulo */}
      <path
        d="M930 155 Q600 450 270 400"
        className="flight-path-2"
        stroke="#00D4AA"
        strokeWidth="1.5"
        fill="none"
        style={{ animationDelay: "3s" }}
      />

      {/* City dots */}
      <circle cx="935" cy="148" r="6" fill="#FF4545" className="pulse-dot" />
      <circle cx="200" cy="180" r="5" fill="#7C3AED" className="pulse-dot" style={{ animationDelay: "0.5s" }} />
      <circle cx="510" cy="90" r="5" fill="#0EA5E9" className="pulse-dot" style={{ animationDelay: "1s" }} />
      <circle cx="960" cy="370" r="5" fill="#FFB800" className="pulse-dot" style={{ animationDelay: "1.5s" }} />
      <circle cx="270" cy="400" r="4" fill="#00D4AA" className="pulse-dot" style={{ animationDelay: "2s" }} />
      <circle cx="545" cy="220" r="4" fill="#F97316" className="pulse-dot" style={{ animationDelay: "2.5s" }} />

      {/* City labels */}
      <text x="935" y="135" fill="#FF4545" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">TOKYO</text>
      <text x="200" y="170" fill="#7C3AED" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">NEW YORK</text>
      <text x="510" y="78" fill="#0EA5E9" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">LONDON</text>
      <text x="960" y="358" fill="#FFB800" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">SYDNEY</text>
      <text x="270" y="415" fill="#00D4AA" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">SÃO PAULO</text>
      <text x="545" y="210" fill="#F97316" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">NAIROBI</text>
    </svg>
  );
}
