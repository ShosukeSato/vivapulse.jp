"use client";

import { useEffect } from "react";

const SELECTOR = "img[data-cinema-src][data-cinema-src-set]";

export default function CinemaProgrammeLoader() {
  useEffect(() => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(SELECTOR));
    const reveal = (image: HTMLImageElement) => {
      const source = image.dataset.cinemaSrc;
      const sourceSet = image.dataset.cinemaSrcSet;
      if (!source || !sourceSet) return;

      image.srcset = sourceSet;
      image.src = source;
      delete image.dataset.cinemaSrc;
      delete image.dataset.cinemaSrcSet;
    };

    if (!("IntersectionObserver" in window)) {
      images.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLImageElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "160px 0px" },
    );

    images.forEach((image) => observer.observe(image));
    return () => observer.disconnect();
  }, []);

  return null;
}
