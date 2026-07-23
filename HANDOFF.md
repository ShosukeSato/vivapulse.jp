# CITY 01 — 引き継ぎメモ

最終更新: 2026-07-23 (JST)

## まず読むこと

- 作業ブランチは `main`。
- 作業ツリーは、引き継ぎメモを追加する前は clean だった。
- 最新コミットは `c00ab69 Refine CITY 01 interaction, typography, and worldbuilding`。
- このコミットは GitHub Pages へデプロイ済み。公開URL: <https://vivapulse.jp>
- Deploy workflow は成功済み。ただし PC地図の未コミット修正（下記）がまだ公開されていない。
- `git reset --hard`、`git clean`、force push、課金操作、秘密情報の取り扱いは禁止。

## 完了済み

- 映画館のfeatured filmを「東大を休学して、貯金ほぼ0で世界一周を始めました。」へ変更。
- 図書館のfeatured articleを「東大を休学して貯金0円で世界一周してるけど、僕には『やりたいこと』が1つもなかった」へ変更。
- ホーム下部の動画紹介もfeatured filmと同じデータを参照するよう整理。
- note / YouTube / podcast の更新負債になる固定本数表示を撤去。JOURNEY DAYは自動計算、CITY TIMEは世界観上の固定値。
- PC地図の施設ラベルを整理し、HAKU・STOCKAを含めて表示。施設同士の視認性を改善。
- スマホ地図は1回目のタップで詳細カード、2回目のタップで施設ページ。タッチ開始時の選択色・押下反応、スワイプキャンセル、カードの表示を実装。
- SHOSUKEアバターは施設一覧を開く案内人、CITY 01 CENTRALはプロフィール／現在地として役割を分離。
- Route Terminalを港・出航・航路の表現へ再設計。現在地は「スリランカ」、次の目的地は「インド」。Galaha / Ellaのような頻繁に変わる都市名は表示しない。
- 秘密の書庫、準備中の将来施設、みなとみらい／港の世界観表現を実装。
- `ProtectedText`（`src/features/shared/ProtectedText.tsx`）で、短い語・括弧・句読点を最小単位で保護する組版処理を導入。

## PC地図の改修（2026-07-23、未コミット）

サイトオーナーの指摘3点に対応した。対象は `src/features/city/CityScene.tsx` と `src/features/city/scene.ts` のみ。

### 1. ホバー時の赤い4隅フレームが施設によって見えない

原因は塗り順。ラベル帯が landmark より後に不透明な黒 rect として描かれ、ブラケットを塗り潰していた。40隅中13隅が欠損していた（`construction` BL、`tripvlog` BL・BR、`stocka` BR、`haku` BL、`station` BL・BR、`strategy` BL・BR、`library` BL、`harbor` TL・TR）。`tripvlog` BR は帯に加えて `TerminalRail` の西プラットフォームにも重ねられており、帯を動かすだけでは直らなかった。

対応: focus を `FocusLayer` として SVG 最前面の単一レイヤーへ分離した（`cityFocusPath()` を `scene.ts` に新設）。ホバー配線は `:has()` に変更。`:has()` 非対応環境でも `onPointerEnter → onSelect` により `--selected` 経由で点灯するフォールバックがある。欠損は 0/40 になった。

### 2. アバターの当たり判定が狭い / SHOSUKE の帯が反応しない

PC のヒットエリアは `76×76` の1枚のみで、ビューポート高が約733pxを下回ると 44 CSS px を割っていた（1280×720 で 42×42）。さらにアバターと帯の間の 8px の隙間は舗装 rect に当たり、踏むと選択が解除されていた。

対応: アバターとSHOSUKE帯を囲む単一の `192×148`（最悪スケール 0.558 でも 107×83 CSS px）に統合。`foreignObject` は1枚のまま＝タブストップは10で不変、`SHOSUKE` の二重読み上げも起きない。帯ホバー時はアバターのブラケットと帯の3pxアウトラインが同時に点灯する。帯には `aria-hidden` を追加（従来は `<text>SHOSUKE</text>` がボタンの `aria-label` と二重に読まれていた）。

### 3. 帯に施設コードがなく、施設名が短縮形だった

対応: `MAP_LABELS` の短縮名テーブルを削除し、`place.code` と `place.name` を直接描画する2行構成にした。これで `src/data/city.ts` と地図表記が構造的に乖離しなくなる。コードは IBM Plex Mono / `P.haze`、施設名は Hiragino Sans / `P.lightStone`。新色なし。帯の高さは64のまま、幅は全施設で従来より細くなった。

`.desktopScene svg` は `width: min(1056px, 100%)` のため実効スケールが 0.558〜0.733 しかない。ART_DIRECTION の「施設名13px以上 / コード12px以上」はレンダリング後のCSS pxで判定する必要があるため、`@media (max-width: 1439px)` でソース値を 24/20 → 26/22 に上げている。**帯のフォントサイズを下げる修正は下限を割るので禁止。**

`cinema` と `harbor` の帯は建物を47%／27%潰していたため、フレーム下辺の直下（海側）へ移設した。`harbor` の bounds も `{948,600,348,240}` に変更。

### 4. アバターのクリックで施設一覧を開く

アバターは選択カードを出すだけで行き先に繋がっていなかった。クリック／タップで施設一覧ダイアログを直接開くように変更。ボタンは `aria-haspopup="dialog"` + `aria-expanded` に変更し、`aria-label` を「街の案内人SHOSUKEに話しかけて施設一覧を開く」に更新。スマホではスワイプで誤って開かないよう `finishTouchSelection` で移動を判定する。

**左下の `placeInspector`（CITY GUIDE / SHOSUKE）は出したままにすること。** 変わったのはクリックの行き先だけで、ホバー時の情報表示は施設と同じく維持する。一度これを消して差し戻した経緯がある。

### 5. 施設とアバターの枠を同格に

施設は `selectedId` で点灯を保持し、アバターは hover のみで点灯していたため、施設に乗せた後アバターへ移すと**両方の枠が同時に出ていた**。アバターの `onPointerEnter` で `selectedId` を `GUIDE_ID` にするようにし、施設とアバターが同じ選択機構を共有するようにした。これで常にどちらか一方だけが点灯し、左下のパネルも同じ仕組みで切り替わる。SHOSUKE帯を囲むアウトライン（`city-scene__guide-plate`）は、施設側に相当するものがなく扱いが非対称になるため撤去した。帯は当たり判定には含まれたままで、乗せるとアバターの枠が点灯する。

### コードの色

`P.signAmber #E3B851` を新設し、施設コードに適用（従来は `P.haze`）。`P.warmLight #F3C85E` をそのまま使わないのは、`PromenadeLamp` の灯体が同じ hex の 15×10px 矩形で、コード文字と同サイズ・同色になり「9個の街灯」に見えるため。地 `#081923` に対し 9.58:1（AAA）。施設名 `#E5E1D4` との輝度差 1.43倍で主従は保たれる。`#FFE5A3` は名称と 1.06倍で同格になるため使用不可。アクセントバーは `P.selection` のまま（focusブラケットと同色で帯を結ぶ接続点のため）。「案内人」は `P.haze` のまま（琥珀は施設コードの意味色であり、コードを持たないSHOSUKEに与えると存在しないコードを示唆するため）。パレットは23色でART_DIRECTIONの上限24以内。

### 追補（同日）

- Central の氏名 h1 は `さとう`／`しょうすけ` の2分割（改行点は1箇所のみ）。3分割に戻すと `しょう` の後で折れるので戻さないこと。
- スマホのアバターは施設と同じ2段階: 1タップ目でカード（CITY GUIDE / SHOSUKE）、2タップ目またはカードの「施設一覧を開く」で一覧が開く。PCはホバーでパネル、クリックで一覧のまま。
- 地図右上の緑地帯は `y=0..516` に拡張（最上段の木が水色の上に生えていたため）。

### 検証済み

`npx tsc --noEmit` / `npm run lint` / `npm run build`（16ページ）すべて成功。ビルド成果物 `out/index.html` に対する幾何・構造検証で、塗り順（focus層が全帯・アバターより後）、PC10領域の総当たり45ペアで重なり0、帯同士の重なり0、各ヒット領域が自分のフレームと帯を内包、最悪スケールでの44 CSS px 下限、9施設の帯текстの収まりを確認した。スマホ側の `hitBounds`（198×198）と1タップ選択→2タップ遷移は未変更。

### 残課題

- **B2 の帯の左24pxが CENTRAL の判定に入る。** `strategy` の帯は `B2 STUDIO` を収めるのに204px必要だが、`station` のアート右端864と `library` の左端1032の間は168pxしかない。CENTRAL の東塔（828〜852）を CENTRAL 側に返すことを優先し、帯左端24px（実効約13 CSS px、うち文字にかかるのは約2 CSS px）を譲る判断をした。
- **ブラウザでの目視確認が未実施。** Chrome拡張が未接続だったため、幾何計算とビルド成果物の構造検証までしか行えていない。実機での見た目・ホバー挙動は次回に確認すること。
- focus のストロークは3pxだが ART_DIRECTION Motion は「two-pixel」と規定。既存の乖離で、今回は視認性優先で3pxに統一した（帯のアウトラインも3px）。ドキュメント側を3pxに改訂するか実装を2pxに落とすかの決着が必要。
- `station` の `CastShadow` が x=876 まで伸び、`bounds` 右端852を24pxはみ出している。

## 再開手順

1. `git status --short` と `git diff --check` を確認し、既存変更を保持する。
2. `ProtectedText.tsx` と Cinema / Archive の実際のタイトル描画箇所を確認する。
3. 320px / 390px / 1440px の通常表示・文字200%で、上記語中改行と句読点孤立を再監査する。全体をnowrapにせず、短い意味単位だけを保護する。
4. `npx tsc --noEmit`、`npm run lint`、`npm run build` を実行する。
5. Pages互換の確認では、Next exportの同名RSCディレクトリを誤って読む単純なPython server (port 3100)を使わない。拡張子なしURLを対応する `.html`へ解決するサーバーを使い、各施設の `document.title` と固有見出しをassertする。
6. スマホ地図で、各施設を1回目に選択、2回目に正しい施設URLへ遷移することを確認する。スワイプは選択・遷移しないことも確認する。
7. 修正が必要ならコミットし、GitHub Pages workflowの成功を確認してから公開URLを再確認する。

## 主要な検証済み事実

- TypeScript / ESLint / production build は `c00ab69` 時点で成功。
- 本番Pagesで全9施設のHTML応答とタイトルを確認済み。
- 本番Pagesのスマホ実機相当テスト: 320px / 390pxで HAKU の1→2タップ遷移成功。
- 48pxスワイプでは選択・カード表示・遷移なし。
- アートディレクター: RELEASE PASS（公開停止級の視覚・世界観問題なし）。
- レスポンシブ／UX担当: RELEASE PASS。
- 編集ゲート: 語中改行の残存によりBLOCK。次回の最優先作業。
