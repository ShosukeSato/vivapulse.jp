"use client";

import { useSyncExternalStore } from "react";
import { DEPARTURE_DATE } from "@/data/content";

function getDay() {
  const departure = new Date(`${DEPARTURE_DATE}T00:00:00+09:00`);
  const elapsed = Date.now() - departure.getTime();
  return Math.max(1, Math.floor(elapsed / 86400000) + 1);
}

function subscribe(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 60_000);
  return () => window.clearInterval(timer);
}

export default function DayCounter({ className = "" }: { className?: string }) {
  const day = useSyncExternalStore(subscribe, getDay, () => null);
  return <span className={className}>{day ?? "—"}</span>;
}
