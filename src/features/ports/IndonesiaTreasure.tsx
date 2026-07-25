"use client";

/*
 * ─────────────────────────────────────────────────────────────────────────
 *  TRIPVLOG 宝探しイベント（2026-07-25 〜 2026-08-01・短期・SNS告知）
 *
 *  街の外・インドネシア寄港地に隠した「TripVlog Pro 永久無料コード」。
 *  火山(ブローモ)の火口をタップすると、引き換えコードが出る。
 *  火口の当たり判定は、背景 PortVignette と同じ viewBox / preserveAspectRatio
 *  のオーバーレイSVGなので、どの画面幅でも必ず火口に一致する。
 *
 *  ★ コード失効(2026-08-01)後は、このファイルごと削除してよい。
 *    完全な撤去手順は docs/TREASURE_EVENT.md を参照。
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useRef, useState } from "react";
import PixelIcon from "@/features/city/PixelIcon";
import styles from "./treasure.module.css";

// ▼ イベント固有の値（差し替えるならここだけ）
const TREASURE_CODE = "TREASUREOFBROMO";
const APP_APPLE_ID = "6779697639";
const REDEEM_URL = `https://apps.apple.com/redeem?ctx=offercodes&id=${APP_APPLE_ID}&code=${TREASURE_CODE}`;

export default function IndonesiaTreasure() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openTreasure = useCallback(() => setOpen(true), []);
  const closeTreasure = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTreasure();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeTreasure]);

  return (
    <>
      {/* 火口の上に重ねる透明な当たり判定。背景 vignette と同じ 0 0 1200 320 / slice。 */}
      <svg
        className={styles.hotspotLayer}
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden={open ? true : undefined}
      >
        <rect
          className={styles.hotspot}
          x="480"
          y="30"
          width="240"
          height="135"
          role="button"
          tabIndex={0}
          aria-label="火口を覗く"
          onClick={openTreasure}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openTreasure();
            }
          }}
        />
      </svg>

      {open && (
        <div className={styles.overlay} onClick={closeTreasure}>
          <div
            className={styles.chest}
            role="dialog"
            aria-modal="true"
            aria-labelledby="treasure-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={closeTreasure}
              aria-label="閉じる"
            >
              <PixelIcon name="close" />
            </button>

            <p className={styles.kicker}><PixelIcon name="location" /> X MARKS THE SPOT</p>
            <h2 id="treasure-title">
              見つけたな。
              <br />
              ここに、置いてきた。
            </h2>
            <p className={styles.lead}>TripVlog Pro を永久に開く鍵だ。持っていけ。</p>

            <div className={styles.codeRow}>
              <span className={styles.codeLabel}>CODE</span>
              <code className={styles.code}>{TREASURE_CODE}</code>
            </div>

            <a className={styles.redeem} href={REDEEM_URL} target="_blank" rel="noreferrer">
              <span>コードを使う（App Storeへ）</span>
              <PixelIcon name="external" />
            </a>

            <p className={styles.usage}>
              上の「コードを使う」を<b>タップするだけ</b>。このコードが入った状態で
              App Storeの引き換え画面がひらきます。うまくいかない時は、App Storeの「コードを使う」に
              上のコードを手入力してください。
            </p>

            <p className={styles.pledge}>
              <b>海賊の掟</b>：宝の<b>在り処は秘密</b>に。見つけたことの拡散は大歓迎、
              でも“どこにあったか”だけは、次に探す仲間のために内緒にしてくれ。
              そしてこの鍵で旅を撮って、<b className={styles.tag}>#TripVlogで撮ってみた</b> を付けて動画を投稿してくれ！
            </p>

            <p className={styles.note}>
              ※TripVlogはiPhone（iOS）アプリです。引き換えにはiPhoneが必要です。
              先着500名・2026年8月1日まで。過去にPro購入済みの方は対象外です。
            </p>
          </div>
        </div>
      )}
    </>
  );
}
