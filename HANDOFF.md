# CITY 01 — 引き継ぎメモ

最終更新: 2026-07-24 (JST)

## まず読むこと

- 作業ブランチは `main`。作業ツリーは clean。
- 最新コミットは `046206f Left-align the departures lead once it stacks`。
- GitHub Pages へデプロイ済み。公開URL: <https://vivapulse.jp>
- **デプロイ = `main` への push**。`.github/workflows/deploy.yml` が自動で走る。手動操作は不要。
- `git reset --hard`、`git clean`、force push、課金操作、秘密情報の取り扱いは禁止。
- 設計の正は [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md)、造形の正は [docs/ART_DIRECTION.md](./docs/ART_DIRECTION.md)。迷ったらこの2つに従う。

---

# 1. サイトの構造（三層）

| 層 | 意味 | 入口 | URL |
| --- | --- | --- | --- |
| 施設 | **つくったもの** | 地図・施設一覧 | `/places/[slug]` |
| 旅人 | **つくった人** | 地図のアバター・CENTRALの伝言板・施設一覧の先頭 | `/shosuke` |
| 寄港地 | **生きた場所** | ROUTE TERMINAL の系統図と寄港索引のみ | `/ports/[slug]` |

- 寄港地は施設ではない。**地図にも施設一覧にも出さない**。施設コードも持たない。
- 施設は9つのまま。増やすと QA と世界観の前提が崩れる。

---

# 2. 更新の手順書（ここが本体）

コンテンツはすべて `src/data/content.ts` に集約されている。**基本はこのファイルだけを編集する**。

## 2-1. 新しい映像（YouTube）を足す

1. `films` 配列の**先頭**に追加（新しい順）。

```ts
{
  id: "YOUTUBE_ID",
  title: "動画タイトル",
  date: "2026.08",
  place: "インド",        // ← 寄港地との紐付けキー。後述
  duration: "9:01",
},
```

2. **サムネイルを必ず用意する**（これを忘れると画像が壊れる。過去に事故った）。

```bash
cd public/media/cinema
curl -sS -o YOUTUBE_ID.jpg "https://i.ytimg.com/vi/YOUTUBE_ID/maxresdefault.jpg"
python3 - <<'PY'
from PIL import Image
i = "YOUTUBE_ID"
im = Image.open(f"{i}.jpg").convert("RGB")
for w in (640, 960, 1280):
    im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(
        f"{i}-{w}.webp", "WEBP", quality=82, method=6)
PY
```

- `maxresdefault.jpg` が 404 の動画がある（高解像度版が存在しない）。その場合は `hqdefault.jpg` を使い、**`content.ts` の `smallStillFilmIds` にその id を追加**する。これを入れておけば `filmStill()` が自動で 640 にフォールバックし、404 が起きない。
- 全参照の実在チェック（ビルド後に実行）:

```bash
python3 - <<'PY'
import re, os, glob
have = set(os.listdir("public/media/cinema"))
miss = {m for f in glob.glob("out/**/*.html", recursive=True)
        for m in re.findall(r'/media/cinema/([\w\-]+\.(?:webp|jpg))',
                            open(f, encoding="utf-8", errors="ignore").read())
        if m not in have}
print("欠損:", sorted(miss) or "なし")
PY
```

3. `place` が既存の寄港地の `placeAliases` に含まれていれば、**その寄港地ページに自動で載る**。VOYAGE CINEMA にも自動で載る。

## 2-2. 新しい記事（note）を足す

`articles` 配列の先頭に `{ title, href, date }` を追加するだけ。寄港地ページに載せたい場合のみ、その寄港地の `articleHrefs` に href を書く（記事は執筆地が曖昧なので自動収集しない）。

## 2-3. 次の国へ移動したとき（最重要）

### ステップ1: 旅程の状態を進める（必須）

`journey` 配列を編集する。ここが**現在地・系統図・JOURNEY DAY・CENTRALの表示すべての単一の情報源**。

```ts
{ place: "スリランカ", period: "2026.07", note: "…", status: "done" },  // now → done
{ place: "インド",     period: "2026.08", note: "…", status: "now"  },  // next → now
{ place: "アルバニア", period: "予定",    note: "",  status: "next" },  // planned → next
```

- `status` は `done` / `now` / `next` / `planned` の4つ。**`now` は必ず1つだけ**（`currentJourneyStop` が最初の1件を取る）。
- 日付が未確定の国は `period: "予定"` のままでよい。**架空の日付を書かない**。

### ステップ2: 寄港地ページを開港する（任意・実コンテンツがある場合のみ）

**実際に撮った映像や書いた記事が存在する国だけ**ページを作る。何もない国はページを作らない（憲法「中身のない施設を営業させない」）。系統図では自動的に非リンクのままになる。

**(a) `content.ts` の `ports` に1件追加**

```ts
{
  slug: "india",                 // URL: /ports/india
  place: "インド",                // journey の place と完全一致させる（照合キー）
  nameEn: "INDIA",
  role: "call",                  // 東京だけ "home"
  placeAliases: ["インド", "デリー", "バラナシ"],  // films.place がこれに一致する映像を自動収集
  featuredFilmId: "XXXX",        // 代表映像（任意）
  articleHrefs: [],              // 載せる記事の href（任意）
},
```

これだけで**ページ生成・系統図のリンク化・寄港索引・sitemap** がすべて自動で反映される。

**(b) 見た目を国のものにする（これを忘れるとページが無色になる）**

寄港地は「文字が読めなくても0.1秒でどこか分かる」ことが要件。2ファイルに手を入れる。

1. `src/features/ports/port.module.css` — パレットを追加

```css
.page[data-port="india"] {
  --port-bg: …;      /* ページ背景（淡色） */
  --port-ink: …;     /* 本文・見出し */
  --port-muted: …;   /* 補助テキスト（背景比 4.5:1 以上） */
  --port-line: …;    /* 罫線 */
  --port-accent-1: …; /* 入港ワイプ・滞在ボードの地色（明色文字が乗る） */
  --port-accent-2: …; /* チップ・再生ボタン（暗色文字が乗る） */
}
```

- **色は国旗から取らない。その国で実際に撮った映像のサムネイルから採る。** 抽出スクリプトは §4 に記載。
- 必ずコントラストを計算して AA 以上を確認する（§4 のスクリプト）。

2. `src/features/ports/PortVignette.tsx` — 風景を1つ追加

- シーン関数を書き、`SCENES` と `SCENE_LABELS` に slug を登録する。
- **矩形と直線ポリゴンのみ・整数座標のみ**（地図と同じ規則）。有機的な曲線を描こうとすると必ず安っぽくなる。
- 題材は**実際に行った場所だけ**。国旗・民族柄・行っていない名所は禁止。
- 主役は中央に置く（スマホでは左右がトリミングされるため）。上下端ギリギリに要素を置かない（広い画面で切れる）。

**(c) 前の国の扱い**

特に作業不要。`journey` の status を `done` にすれば、系統図・索引・ページの状態表記が自動で切り替わる。

---

# 3. 作業の進め方（重要な教訓）

## 3-1. デザインは必ず実際に見る

CSS を読んで判断すると必ず失敗する。**ヘッドレス Chrome でスクリーンショットを撮る**こと。

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 \
  --window-size=1440,2600 --screenshot=shot.png \
  "http://localhost:3000/places/city-01-central"
```

余白やベースラインのズレは、PIL でピクセルを直接測ると確実に詰められる（文字の下端行を検出して差分を取る）。CENTRALヘッダーの調整はこの方法で 1px まで追い込んだ。

## 3-2. 開発サーバーのCSSキャッシュに注意

Next の CSS チャンク名は**内容ではなくファイルパスから決まる**ため、CSS を書き換えても URL が変わらず、ブラウザが古い CSS を使い続ける。「HTMLは新しいのに見た目が古い」状態になる。

- 対策: 開発サーバー再起動 + `rm -rf .next/cache`、ブラウザは Cmd+Shift+R。
- 本番でも GitHub Pages は HTML に `max-age=600` を付ける。確認は `?v=2` のようにクエリを変えると確実（数字を毎回変える）。

## 3-3. 検証コマンド

```bash
npx tsc --noEmit && npm run lint && npm run build
```

公開前は 320 / 390 / 820 / 1300 / 1440px を確認する（CENTRALヘッダーと寄港地の帯はこの境界で挙動が変わる）。

---

# 4. 色を決めるときのスクリプト

**実サムネイルから支配色を抽出**（インドネシアはこれで決めた。17枚中40%が土色だった）:

```python
from PIL import Image
import colorsys, os
ids = ["FILM_ID", ...]
buckets = {}
for i in ids:
    im = Image.open(f"public/media/cinema/{i}.jpg").convert("RGB").resize((80, 45))
    for r, g, b in im.getdata():
        h, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
        if s < .25 or v < .12: continue
        d = buckets.setdefault(int(h*24) % 24, [0, 0, 0, 0])
        d[0] += r; d[1] += g; d[2] += b; d[3] += 1
tot = sum(v[3] for v in buckets.values())
for n, k, r, g, b in sorted(((v[3]/tot, k, *[c//v[3] for c in v[:3]])
                             for k, v in buckets.items()), reverse=True)[:8]:
    print(f"{n*100:5.1f}%  #{r:02X}{g:02X}{b:02X}")
```

**コントラスト比の検算**:

```python
def lin(c):
    c /= 255
    return c/12.92 if c <= .04045 else ((c+.055)/1.055)**2.4
def L(h):
    h = h.lstrip('#'); r, g, b = (int(h[i:i+2], 16) for i in (0, 2, 4))
    return .2126*lin(r) + .7152*lin(g) + .0722*lin(b)
def cr(a, b):
    x, y = sorted((L(a), L(b)), reverse=True)
    return (x + .05) / (y + .05)
```

---

# 5. 触るときに壊しやすい箇所

- **CENTRAL の出発案内ヘッダー**（`central.module.css`）。見出しは1行に収まる前提で、説明文と高さを揃えている。見出しのフォントサイズを上げると2行になり、右側に大きな空洞が復活する。挙動は幅で3段階（1300px以上=説明文1行 / 821–1299px=一文一行・右端揃え / 820px以下=縦積み・左揃え）。
- **`.departuresLead` の `margin-bottom: -5px`** は横並び時のベースライン補正。実測値なので、フォントサイズを変えたら測り直す。
- **地図（`CityScene.tsx`）のフォーカス枠は3px**。ART_DIRECTION も3pxで整合済み（2pxに戻さない）。
- **`filmStill()` を経由せずにサムネイルのパスを直書きしない**。サイズ欠損で404になる。
- **Central の氏名 h1 は2分割**（`さとう` / `しょうすけ`）。3分割に戻すと変な位置で折れる。
- **B2 の帯の左24pxが CENTRAL の判定に入る**件と **`station` の影が bounds を24px超える**件は、オーナー判断で**対応不要**（2026-07-24 確定）。
- 語中改行（禁則処理）も**対応不要**で確定済み。ブロッカー扱いしない。

---

# 6. 直近の変更（2026-07-24）

- 旅人SHOSUKE化。アバター → `/shosuke`。CENTRAL は中央駅ハブへ（伝言板でプロフィールへ繋ぐ）。
- `/shosuke` 新設（人生路線図 LIFE LINE / 職歴7件 / みなとみらい＝街の原風景 / 連絡先）。
- 世界地図を廃止し **Beck式航路系統図**へ。旅程を12停泊地に拡張。PORT LOG は寄港索引に減量。
- `/ports/{tokyo,indonesia,sri-lanka}` 新設。国別パレット＋ピクセル風景。入港ワイプ 520ms。
- 欠落していた `IR-GR-u0kMM` のサムネイルを復旧し、VOYAGE CINEMA の除外フィルタを撤去。
- CENTRAL 出発案内ヘッダーのレイアウトを実測ベースで再設計。
