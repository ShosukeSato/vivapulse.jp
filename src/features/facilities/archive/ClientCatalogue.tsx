"use client";

import { useMemo, useState } from "react";
import PixelIcon from "@/features/city/PixelIcon";
import ProtectedText from "@/features/shared/ProtectedText";
import styles from "./archive.module.css";

export type ArchiveNote = {
  title: string;
  href: string;
  date: string;
};

type Theme = "すべて" | "旅・世界" | "個人開発" | "読書・学び" | "暮らし・思考";

const PAGE_SIZE = 36;
const themes: Theme[] = ["すべて", "旅・世界", "個人開発", "読書・学び", "暮らし・思考"];

const journeyWords = /旅|世界一周|海外|インド|スリランカ|ジャワ|留学|旅行|観光|宿|航空|国境|外国|ボランティア/;
const makingWords = /個人開発|開発|アプリ|AI|生成AI|プログラ|コード|Web|データ|機械学習|サービス|エンジニア|デプロイ|収益/iu;
const learningWords = /本|読書|学習|勉強|英語|大学|東大|教育|研究|数学|物理|知識|言語|受験|部活/;

function themeFor(title: string): Exclude<Theme, "すべて"> {
  if (journeyWords.test(title)) return "旅・世界";
  if (makingWords.test(title)) return "個人開発";
  if (learningWords.test(title)) return "読書・学び";
  return "暮らし・思考";
}

export default function ClientCatalogue({ notes }: { notes: ArchiveNote[] }) {
  const years = useMemo(
    () => Array.from(new Set(notes.map((note) => note.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a)),
    [notes],
  );
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("すべて");
  const [theme, setTheme] = useState<Theme>("すべて");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ja");
    return notes.filter((note) => {
      const matchesQuery = !needle || note.title.toLocaleLowerCase("ja").includes(needle);
      const matchesYear = year === "すべて" || note.date.startsWith(year);
      const matchesTheme = theme === "すべて" || themeFor(note.title) === theme;
      return matchesQuery && matchesYear && matchesTheme;
    });
  }, [notes, query, theme, year]);

  const updateQuery = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const updateYear = (value: string) => {
    setYear(value);
    setVisibleCount(PAGE_SIZE);
  };

  const updateTheme = (value: Theme) => {
    setTheme(value);
    setVisibleCount(PAGE_SIZE);
  };

  const clearFilters = () => {
    setQuery("");
    setYear("すべて");
    setTheme("すべて");
    setVisibleCount(PAGE_SIZE);
  };

  const visible = filtered.slice(0, visibleCount);
  const filtersActive = query.trim() !== "" || year !== "すべて" || theme !== "すべて";

  return (
    <div className={styles.index}>
      <div className={styles.controls}>
        <label className={styles.search}>
          <span>題名から探す</span>
          <span className={styles.searchField}>
            <PixelIcon name="search" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="例：世界一周、個人開発"
            />
          </span>
        </label>

        <label className={styles.yearSelect}>
          <span>発行年</span>
          <select value={year} onChange={(event) => updateYear(event.target.value)}>
            <option value="すべて">すべての年</option>
            {years.map((item) => <option value={item} key={item}>{item}年</option>)}
          </select>
        </label>

        <div className={styles.themeFilter}>
          <span id="archive-theme-label">テーマ（題名のキーワードから分類）</span>
          <div role="group" aria-labelledby="archive-theme-label">
            {themes.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={theme === item}
                onClick={() => updateTheme(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.result} aria-live="polite">
          <strong>
            {filtersActive
              ? <span className={styles.resultTitleUnit}>絞り込み中</span>
              : (
                  <>
                    <span className={styles.resultTitleUnit}>公開</span>
                    <wbr />
                    <span className={styles.resultTitleUnit}>目録</span>
                  </>
                )}
          </strong>
          <span>{filtered.length > 0 ? "文章を表示しています" : "一致する文章はありません"}</span>
        </div>
      </div>

      {visible.length > 0 ? (
        <div className={styles.ledger}>
          <div className={styles.ledgerHead} aria-hidden="true">
            <span>年月</span><span>テーマ</span><span>題名</span><span>外部リンク</span>
          </div>
          <ol>
            {visible.map((note) => (
              <li key={note.href}>
                <a href={note.href} target="_blank" rel="noreferrer">
                  <time dateTime={note.date}>{note.date.replace("-", ".")}</time>
                  <span className={styles.theme}>{themeFor(note.title)}</span>
                  <strong><ProtectedText text={note.title} /></strong>
                  <span className={styles.open}><span>読む</span><PixelIcon name="external" /></span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>一致する文章はありません。</strong>
          <p>題名の言葉、発行年、テーマを変えて探してください。</p>
          <button type="button" onClick={clearFilters}>絞り込みを解除</button>
        </div>
      )}

      {visible.length < filtered.length && (
        <button className={styles.more} type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
          <span>さらに表示</span>
          <small>MORE</small>
        </button>
      )}
    </div>
  );
}
