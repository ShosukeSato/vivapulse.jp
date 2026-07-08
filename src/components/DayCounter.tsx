"use client";

import { useEffect, useState } from "react";
import { DEPARTURE_DATE } from "@/data/content";

export default function DayCounter({ className = "" }: { className?: string }) {
  const [day, setDay] = useState<number | null>(null);

  useEffect(() => {
    const departure = new Date(`${DEPARTURE_DATE}T00:00:00+09:00`);
    const elapsed = Date.now() - departure.getTime();
    setDay(Math.max(1, Math.floor(elapsed / 86400000) + 1));
  }, []);

  return <span className={className}>{day === null ? "—" : day}</span>;
}
