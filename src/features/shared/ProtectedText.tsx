import { Fragment, type ReactNode } from "react";

const protectedTerms = [
  "調査してきました。",
  "スタートしました。",
  "バティックアート",
  "ポートフォリオ",
  "動体視力道場",
  "全テクニック",
  "伝えたい話",
  "もったいない",
  "プロジェクト",
  "できている",
  "始めました。",
  "なりました",
  "書き出して",
  "ポイントとして",
  "カードとして",
  "vlogとして",
  "英語として",
  "映像にして",
  "文化遺産",
  "習慣化",
  "タイマー",
  "肩書き",
  "魚の目",
  "しました。",
  "きました。",
  "たぞ！！！",
  "ツアー",
  "サイト",
  "として",
  "という",
  "による",
  "直後",
  "再現",
  "方法",
  "けど、",
  "なぜ",
  "ための",
  "なく、",
] as const;

const openingMarks = new Set(["「", "『", "（", "【", "〈", "《", "〔", "［", "｛"]);
const closingMarks = new Set(["、", "。", "，", "．", "）", "」", "』", "】", "〉", "》", "〕", "］", "｝", "！", "？", "：", "；", "…", "・"]);
const allMarks = new Set([...openingMarks, ...closingMarks]);
const maxCombinedCharacters = 8;

type TextRange = {
  start: number;
  end: number;
};

function overlaps(range: TextRange, ranges: TextRange[]) {
  return ranges.some((candidate) => range.start < candidate.end && candidate.start < range.end);
}

function punctuationRanges(text: string) {
  const characters = Array.from(text);
  const offsets: number[] = [];
  let offset = 0;

  characters.forEach((character) => {
    offsets.push(offset);
    offset += character.length;
  });

  const ranges: TextRange[] = [];
  characters.forEach((character, index) => {
    const start = offsets[index];
    const end = start + character.length;

    if (openingMarks.has(character) && characters[index + 1]) {
      ranges.push({ start, end: offsets[index + 1] + characters[index + 1].length });
    }
    if (closingMarks.has(character) && characters[index - 1]) {
      ranges.push({ start: offsets[index - 1], end });
    }
  });

  return ranges
    .sort((a, b) => a.start - b.start || a.end - b.end)
    .reduce<TextRange[]>((merged, range) => {
      const previous = merged.at(-1);
      if (previous && range.start < previous.end) {
        previous.end = Math.max(previous.end, range.end);
      } else {
        merged.push({ ...range });
      }
      return merged;
    }, []);
}

function protectedRanges(text: string) {
  const punctuation = punctuationRanges(text);
  const terms: TextRange[] = [];

  [...protectedTerms]
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      let start = text.indexOf(term);
      while (start !== -1) {
        const range = { start, end: start + term.length };
        if (!overlaps(range, terms)) {
          const punctuationAtBoundary = punctuation.filter((candidate) => overlaps(range, [candidate]));
          const termAlreadyIncludesPunctuation = Array.from(term).some((character) => allMarks.has(character));

          if (termAlreadyIncludesPunctuation || punctuationAtBoundary.length === 0) {
            terms.push(range);
          } else {
            const combined = punctuationAtBoundary.reduce<TextRange>(
              (result, candidate) => ({
                start: Math.min(result.start, candidate.start),
                end: Math.max(result.end, candidate.end),
              }),
              range,
            );
            if (Array.from(text.slice(combined.start, combined.end)).length <= maxCombinedCharacters) {
              terms.push(combined);
            }
          }
        }
        start = text.indexOf(term, start + term.length);
      }
    });

  return [
    ...terms,
    ...punctuation.filter((range) => !overlaps(range, terms)),
  ].sort((a, b) => a.start - b.start || a.end - b.end);
}

/**
 * Keeps short, editorially sensitive terms intact and pairs Japanese
 * punctuation with its neighbouring character. Surrounding copy remains free
 * to reflow at narrow widths and 200% text size.
 */
export default function ProtectedText({ text }: { text: string }) {
  const ranges = protectedRanges(text);
  const parts: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (cursor < range.start) {
      parts.push(<Fragment key={`text-${cursor}`}>{text.slice(cursor, range.start)}</Fragment>);
    }
    parts.push(
      <span className="protectedTerm" key={`protected-${index}-${range.start}`}>
        {text.slice(range.start, range.end)}
      </span>,
    );
    cursor = range.end;
  });

  if (cursor < text.length) {
    parts.push(<Fragment key={`text-${cursor}`}>{text.slice(cursor)}</Fragment>);
  }

  return parts;
}
