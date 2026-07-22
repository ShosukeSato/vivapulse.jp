"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import styles from "./place.module.css";

export type ArchiveNote = {
  title: string;
  href: string;
  date: string;
};

const bookColors = ["#215e78", "#b84b3a", "#946119", "#2d7462", "#67477e", "#3f6fb4", "#87483d"];
const PAGE_SIZE = 24;

function colorFor(href: string) {
  const hash = Array.from(href).reduce((total, character) => total + (character.codePointAt(0) ?? 0), 0);
  return bookColors[hash % bookColors.length];
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 14 14 6M8 6h6v6" />
    </svg>
  );
}

export default function ArchiveCatalogue({ notes }: { notes: ArchiveNote[] }) {
  const years = useMemo(
    () => Array.from(new Set(notes.map((note) => note.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a)),
    [notes],
  );
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [viewMode, setViewMode] = useState<"shelf" | "index">("shelf");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ja");

    return notes.filter((note) => {
      const matchesYear = selectedYear === "ALL" || note.date.startsWith(selectedYear);
      const matchesQuery = !normalizedQuery || note.title.toLocaleLowerCase("ja").includes(normalizedQuery);
      return matchesYear && matchesQuery;
    });
  }, [notes, query, selectedYear]);

  const shelfGroups = useMemo(
    () => years
      .map((year) => ({ year, notes: filteredNotes.filter((note) => note.date.startsWith(year)) }))
      .filter((group) => group.notes.length > 0),
    [filteredNotes, years],
  );
  const visibleNotes = filteredNotes.slice(0, visibleCount);

  const updateQuery = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const updateYear = (year: string) => {
    setSelectedYear(year);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <div className={styles.archiveControls}>
        <label className={styles.archiveSearch}>
          <span>CATALOGUE SEARCH</span>
          <span className={styles.searchField}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="m13 13 4 4" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="本のタイトルを探す"
            />
          </span>
        </label>
        <div className={styles.yearFilters} aria-label="発行年で絞り込む">
          {["ALL", ...years].map((year) => (
            <button
              type="button"
              className={selectedYear === year ? styles.yearFilterActive : undefined}
              aria-pressed={selectedYear === year}
              onClick={() => updateYear(year)}
              key={year}
            >
              {year}
            </button>
          ))}
        </div>
        <div className={styles.archiveViewSwitch} aria-label="蔵書の表示方法">
          <button type="button" aria-pressed={viewMode === "shelf"} onClick={() => setViewMode("shelf")}>
            BOOKSHELF
          </button>
          <button type="button" aria-pressed={viewMode === "index"} onClick={() => setViewMode("index")}>
            INDEX
          </button>
        </div>
        <p className={styles.archiveResult} aria-live="polite">
          <strong>{String(filteredNotes.length).padStart(3, "0")}</strong>
          <span>BOOKS FOUND</span>
        </p>
      </div>

      {shelfGroups.length === 0 && (
        <div className={styles.archiveEmpty}>
          <span>NO BOOKS FOUND</span>
          <p>別の言葉か年代で探してみてください。</p>
        </div>
      )}

      {shelfGroups.length > 0 && viewMode === "shelf" && (
        <div className={styles.shelfCollection}>
          {shelfGroups.map((group) => (
            <div className={styles.bookshelf} key={group.year}>
              <div className={styles.shelfHeading}>
                <strong>{group.year}</strong>
                <span>{group.notes.length} BOOKS · 横にスライド</span>
              </div>
              <div className={styles.bookRow} aria-label={`${group.year}年の蔵書`}>
                {group.notes.map((article, index) => {
                  return (
                    <a
                      className={styles.book}
                      href={article.href}
                      key={article.href}
                      style={{ "--book": colorFor(article.href), "--book-order": index } as CSSProperties}
                      title={article.title}
                      aria-label={`${article.title}（${article.date.replace("-", ".")}）をnoteで読む`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{article.date.replace("-", ".")}</span>
                      <strong>{article.title}</strong>
                      <small>SHOSUKE SATO</small>
                    </a>
                  );
                })}
              </div>
              <div className={styles.shelf} aria-hidden="true">
                <i>CITY 01 ARCHIVE</i><i>{group.year}</i><i>{String(group.notes.length).padStart(3, "0")}</i>
              </div>
            </div>
          ))}
        </div>
      )}

      {visibleNotes.length > 0 && viewMode === "index" && (
        <div className={styles.catalogueBlock}>
          <div className={styles.catalogueHeading}>
            <span>LIBRARY INDEX</span>
            <p>{visibleNotes.length} / {filteredNotes.length}</p>
          </div>
          <div className={styles.catalogueGrid}>
            {visibleNotes.map((article) => {
              const absoluteIndex = notes.findIndex((note) => note.href === article.href);
              return (
                <a className={styles.catalogueCard} href={article.href} key={article.href} target="_blank" rel="noreferrer">
                  <span>{String(absoluteIndex + 1).padStart(3, "0")}</span>
                  <div><small>{article.date.replace("-", ".")}</small><strong>{article.title}</strong></div>
                  <ArrowIcon />
                </a>
              );
            })}
          </div>
          {visibleNotes.length < filteredNotes.length && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
            >
              <span>さらに本棚をひらく</span>
              <small>SHOW {Math.min(PAGE_SIZE, filteredNotes.length - visibleNotes.length)} MORE</small>
            </button>
          )}
        </div>
      )}
    </>
  );
}
