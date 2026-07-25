# TRIPVLOG 宝探しイベント（2026-07-25 〜 2026-08-01）撤去手順

**これは短期イベント（1週間・SNS告知）の一時的な追加です。**
オファーコードが **2026-08-01 に失効** したら、以下のとおり**跡形なく撤去**してください。
サイトの通常構成に戻すだけで、恒久的な変更は残りません。

## 何を追加したか

CITY 01 のポートフォリオに「宝探し」を仕込んだ。
- **入口**：中央駅の伝言板（STATION NOTE）に、ロジャー調のヒント一言（薄いヒント：「どこかに置いてきた」）。
- **宝**：街の外・**インドネシア寄港地ページ**（`/ports/indonesia`）の**火山(ブローモ)の火口をタップ**すると、
  `TripVlog Pro 永久無料コード（TREASUREOFBROMO）` の引き換えカードが出る。
- **報酬**：買い切りプランのカスタムオファーコード。先着500・2026-08-01失効・過去購入者は対象外。
  引き換えURL：`https://apps.apple.com/redeem?ctx=offercodes&id=6779697639&code=TREASUREOFBROMO`

## 触ったファイル（4箇所）

| ファイル | 変更 |
|---|---|
| `src/features/ports/IndonesiaTreasure.tsx` | **新規**（火口タップ＋引き換えカード。イベント固有値もここ） |
| `src/features/ports/treasure.module.css` | **新規**（上記専用スタイル） |
| `src/features/ports/Port.tsx` | 追記（import 1行＋インドネシアだけ vignette を分岐して `<IndonesiaTreasure />` を重ねる） |
| `src/features/facilities/central/Central.tsx` | 伝言板 h2 の文言を差し替え（元の文言はコメントに保存） |

すべて `TRIPVLOG 宝探しイベント` というコメント印を付けてある。

## 撤去手順

1. **新規2ファイルを削除**
   - `src/features/ports/IndonesiaTreasure.tsx`
   - `src/features/ports/treasure.module.css`

2. **`src/features/ports/Port.tsx` を戻す**
   - `import IndonesiaTreasure from "./IndonesiaTreasure";`（とその上のコメント）を削除。
   - `{port.slug === "indonesia" ? ( ... ) : ( ... )}` の分岐ブロックを、元の1行に戻す：
     ```tsx
     <PortVignette slug={port.slug} />
     ```

3. **`src/features/facilities/central/Central.tsx` の伝言板を戻す**
   - `id="note-title"` の `<h2>` を、コメントに保存してある元の伝言に戻す：
     ```tsx
     <h2 id="note-title">
       <span className={styles.noteSentence}>
         <SemanticText phrases={["「世界の", "どこかに", "います。"]} />
       </span>
       <span className={styles.noteSentence}>
         <SemanticText phrases={["連絡は", "いつでも。」"]} />
       </span>
     </h2>
     ```
   - 追加した `TRIPVLOG 宝探しイベント` のコメントも削除。

4. **このファイル `docs/TREASURE_EVENT.md` を削除。**

5. `npm run build` が通ることを確認して完了。

## App Store Connect 側（任意）

- オファー「TREASURE」/ コード `TREASUREOFBROMO` は失効後そのままでも害はないが、整理するなら
  App Store Connect → TripVlog → サブスク/買い切り → オファーコードで無効化・削除してよい。
