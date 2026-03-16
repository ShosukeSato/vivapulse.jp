"use client";

export default function Stars() {
  const colors = [
    "bg-coral", "bg-turquoise", "bg-golden", "bg-violet",
    "bg-rose", "bg-sky", "bg-mint", "bg-orange", "bg-lemon",
  ];

  const shapes = [
    "rounded-full",
    "rounded-sm rotate-45",
    "rounded-full",
    "rounded-none rotate-12",
    "rounded-full",
  ];

  const particles = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: `${(i * 13.7 + 5) % 100}%`,
    top: `${(i * 19.3 + 3) % 100}%`,
    delay: `${(i * 0.5) % 4}s`,
    size: i % 7 === 0 ? 10 : i % 5 === 0 ? 7 : i % 3 === 0 ? 5 : 3,
    color: colors[i % colors.length],
    shape: shapes[i % shapes.length],
    duration: `${3 + (i % 4)}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.color} animate-twinkle ${p.shape}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.25,
          }}
        />
      ))}
    </div>
  );
}
