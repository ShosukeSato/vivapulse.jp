"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface BoardingPassProps {
  destination: string;
  flight: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon: ReactNode;
  gate: string;
  accentColor?: string;
  rotate?: number;
}

const tagColors = [
  "bg-coral/15 text-coral",
  "bg-turquoise/15 text-turquoise",
  "bg-violet/15 text-violet",
  "bg-golden/15 text-golden",
  "bg-rose/15 text-rose",
  "bg-sky/15 text-sky",
];

export default function BoardingPass({
  destination,
  flight,
  title,
  description,
  tags,
  href,
  icon,
  gate,
  accentColor = "text-coral",
  rotate = 0,
}: BoardingPassProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`boarding-pass block rounded-2xl p-6 group ${
        visible ? "animate-boarding" : "opacity-0 translate-x-[60px]"
      }`}
      style={{
        ["--card-rotate" as string]: `${rotate}deg`,
        transform: visible ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-1 font-bold">
            Boarding Pass
          </p>
          <p className="text-xs text-ink-muted font-mono">{flight}</p>
        </div>
        <div className={`${accentColor} opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110 duration-300`}>
          {icon}
        </div>
      </div>

      {/* Destination */}
      <div className="mb-4">
        <p className="text-2xl font-extrabold text-ink">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${accentColor} font-mono font-bold tracking-wider`}>{destination}</span>
          <svg className="w-3 h-3 text-ink-muted" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-ink-light leading-relaxed mb-4">
        {description}
      </p>

      {/* Dotted separator */}
      <div className="border-t-2 border-dashed border-cream-dark my-4" />

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold font-mono ${tagColors[i % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-right">
          <p className="text-[9px] text-ink-muted uppercase font-bold">Gate</p>
          <p className={`text-sm font-mono font-extrabold ${accentColor}`}>{gate}</p>
        </div>
      </div>
    </a>
  );
}
