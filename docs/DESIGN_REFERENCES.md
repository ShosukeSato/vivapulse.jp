# CITY 01 — デザイン / UI / UX の根拠

最終確認日: 2026-07-23

この文書は、CITY 01の設計判断を「好み」だけで終わらせず、一次資料・公的ガイドライン・原著者によるヒューリスティクスと、実装判断、公開前検査を接続するための記録である。

- サイトが何を約束するか: [DESIGN_PHILOSOPHY.md](../DESIGN_PHILOSOPHY.md)
- どの造形規則でつくるか: [ART_DIRECTION.md](./ART_DIRECTION.md)
- 何を満たせば公開できるか: [QA.md](./QA.md)
- なぜその判断をしたか: 本文書

## 資料の扱い

資料ごとの役割を混同しない。

- **WCAG 2.2**は、アクセシビリティの検証可能な最低要件として使う。目標はAAである。
- **WAI-ARIA APG**は、標準的な複合UIを実装・検査するときのパターンとして使う。
- **ISO 9241-210**は、人間中心設計を一度きりの装飾工程にしないためのプロセス上の参照枠とする。本プロジェクトはISO適合を表明しない。
- **GOV.UK、デジタル庁、Apple**は、明快さ、包摂性、可読性、操作快適性を判断する実務上の基準として使う。
- **Nielsen Norman Groupの10ヒューリスティクス**は、原著者が明記する通り規格ではなく、UIを点検するための広い経験則として使う。
- CITY 01固有の32-bit表現、18:42の色、24pxタイル、施設別演出は外部資料が命じたものではない。ユーザー目的を満たすためのアートディレクション上の選択である。

## 「オシャレ」を検査可能にする

美しさを単一の作風や装飾量とは定義しない。CITY 01では、次の六つが同時に成立した状態を「オシャレ」「プロがつくった」「細部まで意図がある」と扱う。

1. **焦点** — 各画面で最初に見るものと次の行動が一つに絞られている
2. **整合** — 投影、光、線、色、文字、余白、操作状態に矛盾がない
3. **節度** — 装飾は場所・状態・内容を伝えるものだけに限定されている
4. **固有性** — 施設名を隠しても、実内容と情報構造から館の違いが分かる
5. **真正性** — 架空のUIやデータではなく、実在する作品と活動が中心にある
6. **利用品質** — 読める、迷わない、入力方法や画面幅を変えても目的を達成できる

これは主観を消すためではなく、主観的な印象を観察可能な品質へ分解するための定義である。最終的な印象は、[QAの無誘導ユーザーテスト](./QA.md#human-test)で確認する。

## 原則 → CITY 01の判断 → QA

| 原則と根拠 | CITY 01での判断 | 公開前に確認する証拠 |
| --- | --- | --- |
| **人の目的から始め、実利用で反復する**。ISO 9241-210はライフサイクル全体の人間中心設計を扱い、GOV.UKはユーザーニーズ、データ、反復を設計原則に置く。[[R1]](#r1-iso-9241-2102019) [[R2]](#r2-govuk-government-design-principles) | 「RPGを見せる」ではなく、「さとうしょうすけと実作品を理解し、見たい施設へ行く」を中心課題にする。コードだけで承認せず、スクリーンショットと観察で反復する。 | 5秒で人物・活動・次の行動が分かる。4幅・各状態のスクリーンショットを審査し、5人の無誘導テストを行う。 |
| **システムではなく利用者の言葉と現実世界に合わせる**。NN/gは、内部用語を避け、自然な順序と現実の慣習に沿うことを求める。[[R3]](#r3-nielsen-norman-group-10-usability-heuristics) | 都市コードより本人名と平易な内容説明を先に出す。館内では演出より実作品を先に見せる。意味のない英大文字、座標、ゼロ埋め番号を足さない。 | 「何のページか分からない」状態がない。実作品が装飾的メタファーより先に現れ、リンク名から遷移先が分かる。 |
| **状態を見せ、事実を装わない**。NN/gの「Visibility of system status」は、現在状態と操作結果を適切な時間で伝える原則である。[[R3]](#r3-nielsen-norman-group-10-usability-heuristics) | 選択中の施設、現在地、営業・制作状態を明示する。B2は実音声がない間は「開局準備中」とし、`ON AIR`、架空時刻、架空波形を表示しない。 | 選択・フォーカス・閉館状態を撮影する。偽データ、プレースホルダー、利用不能な`LIVE`表示が一つもない。 |
| **思い出させず、見れば分かるようにする。到達方法を一つにしない**。NN/gの「Recognition rather than recall」「Flexibility」、WCAG 2.4.5が根拠。[[R3]](#r3-nielsen-norman-group-10-usability-heuristics) [[R4]](#r4-wcag-22) | 地図の読み方や施設コードを記憶させない。探索用マップと通常のHTML施設一覧を同じ情報への二つの入口として用意する。 | 地図を使わず全施設へ行ける。キーボードだけでも同じ到達と主要操作ができる。 |
| **一貫させるが、均一化しない**。GOV.UKは「Be consistent, not uniform」、NN/gは一貫性と標準慣習を掲げる。[[R2]](#r2-govuk-government-design-principles) [[R3]](#r3-nielsen-norman-group-10-usability-heuristics) | City Bar、戻る導線、アイコン、フォーカス言語は共有する。一方、映画館、書庫、港、スタジオ等は実内容に合わせて情報構造、密度、素材、主要行動を変える。 | 9館を名前なしで並べても違いが分かる。同じヒーロー、3カード、CTAを色だけ変えたページがない。 |
| **不要な要素を主目的と競合させない**。NN/gの「Aesthetic and minimalist design」と、GOV.UKの「Do the hard work to make it simple」が根拠。[[R2]](#r2-govuk-government-design-principles) [[R3]](#r3-nielsen-norman-group-10-usability-heuristics) | 雰囲気だけのブラー、ガラスカード、粒子、オーロラ、巨大記号、ゲーム数値を使わない。各ビューポートの焦点は一つにし、装飾には場所か状態を伝える役割を持たせる。 | 一つの明確な焦点がある。ART_DIRECTIONの拒否条件がゼロで、主要内容やCTAと競う装飾がない。 |
| **文字は変更・拡大されても読め、内容として存在する**。WCAG 1.4.4、1.4.5、1.4.10、1.4.12と、デジタル庁のタイポグラフィ指針が根拠。[[R4]](#r4-wcag-22) [[R6]](#r6-デジタル庁デザインシステム) | 本文は16–18px、行高1.75–1.9、和文本文幅28–38字を基準とする。情報を画像文字にせず、OSの日本語書体と実テキストを使い、320pxと200%拡大で再配置できるようにする。 | 320px、200%テキストズーム、フォント変更相当で欠落・重なり・横スクロールがない。本文、補助ラベル、意味単位の改行を実画面で確認する。 |
| **色・コントラスト・形のどれか一つだけに依存しない**。WCAG 1.4.1、1.4.3、1.4.11が根拠。[[R4]](#r4-wcag-22) | パレットの美観より文字・UIの識別を優先する。状態は色だけでなく、文言、輪郭、アイコン、位置の組合せで伝える。 | WCAG 2.2 AAコントラスト、グレースケール、forced-colorsを確認する。色だけで意味が失われる箇所がない。 |
| **キーボードフォーカスを見失わせず、モーダルには入口と出口をつくる**。WCAG 2.1.1、2.4.3、2.4.7、2.4.11とWAI-ARIA APGのDialog Patternが根拠。[[R4]](#r4-wcag-22) [[R5]](#r5-wai-aria-authoring-practices-guide) | 原則としてネイティブリンクとボタンを使い、可視フォーカスを共通化する。モーダルを使う場合は内部にフォーカスを保ち、`Escape`と明示ボタンで閉じ、起動元へ戻す。 | 全操作をキーボードで通し、視覚順とフォーカス順を比較する。開閉後にフォーカスが消失・背面移動しない。 |
| **押しやすさは適合最低値より余裕を持たせる**。WCAG 2.5.8のAA最低値は24×24 CSS px（例外あり）。Apple HIGは主要なボタンのヒット領域に44×44ptを一般則として示す。[[R4]](#r4-wcag-22) [[R7]](#r7-apple-human-interface-guidelines) | Appleの論理ポイントをWeb規格値と同一視はせず、CITY 01独自のより厳しい基準として主要操作を44×44 CSS px以上にする。 | 主要コントロールの実測値が44px以上で、隣接ターゲットの誤操作を招く密集がない。 |
| **動きは補助であり、利用条件にしない**。WCAG 2.2.2、2.3.3とAppleのReduce Motion指針が根拠。[[R4]](#r4-wcag-22) [[R7]](#r7-apple-human-interface-guidelines) | 環境アニメーションは同時3つ以内。強制START、長い入館演出、ナビゲーション遅延を置かない。`prefers-reduced-motion`では反復運動と移動演出を止める。 | 通常・reduced motionの両方で、同じ情報と操作へ到達できる。自動運動を止めても状態が理解できる。 |
| **速さと視覚的安定も体験品質である**。Core Web Vitalsは読み込み、応答、視覚的安定をユーザー中心の測定値として扱う。[[R8]](#r8-web-vitals) | 大きなビジュアルを理由に初期表示を犠牲にせず、画像寸法を確保してレイアウト移動を防ぐ。 | LCP 2.5秒未満、CLS 0.1未満を目標にする。ラボ測定は回帰検知であり、将来は実ユーザー計測で補う。 |

## 数値の出所を混同しない

| 数値 | 扱い |
| --- | --- |
| コントラスト比、200%テキスト拡大、320 CSS px相当のreflow、24×24 CSS pxターゲット | WCAG 2.2の検証可能な基準。例外と適合レベルは原文で確認する。 |
| 44×44 CSS pxターゲット | Appleの44×44ptヒット領域を参考にしたCITY 01のプロジェクト基準。WCAGが44pxを要求している、とは記述しない。 |
| 本文16–18px、行高1.75–1.9、和文28–38字 | デジタル庁の可読性指針も参照したCITY 01固有の編集・造形基準。WCAGの必須値ではない。 |
| 24pxタイル、20–24色、18:42、アニメーションの時間 | 世界の一貫性を保つアートディレクション基準。アクセシビリティ規格の値ではない。 |
| LCP 2.5秒、CLS 0.1 | GoogleのCore Web Vitalsにある「良好」の推奨閾値。可能ならモバイル・デスクトップ別の75パーセンタイルで評価する。 |
| QA 95/100、5人中4人 | 本プロジェクトの公開ゲート。統計的な普遍性ではなく、途中品質を公開しないための運用基準。 |

## アートディレクターのレビュー質問

各レビューでは、好みを述べる前に次を順に確認する。

1. 初見の人は、人物、活動、次の行動を説明なしで理解できるか
2. 最初に出会うのは実作品か、それとも実作品を隠すメタファーか
3. その装飾は場所、状態、階層、操作のいずれを伝えているか
4. 施設名と色を外しても、その館らしさが残るか
5. 地図、マウス、色、音、アニメーションのどれかを使えなくても目的を達成できるか
6. 320px、200%テキストズーム、キーボード、reduced motionで破綻しないか
7. 実在しない情報を「それらしく」補っていないか
8. lintとbuildの成功ではなく、実スクリーンショットと人の反応で承認したか

## 参照資料

### R1. ISO 9241-210:2019

- ISO, [Ergonomics of human-system interaction — Part 210: Human-centred design for interactive systems](https://www.iso.org/standard/77520.html)
- 2019年版。ISO公式ページでは2025年に再確認され、現行とされている。本文は有償規格のため、公開概要を参照し、適合は表明しない。

### R2. GOV.UK Government Design Principles

- Government Digital Service, [Government Design Principles](https://www.gov.uk/guidance/government-design-principles)
- 主に「Start with user needs」「Design with data」「Do the hard work to make it simple」「Iterate. Then iterate again」「This is for everyone」「Be consistent, not uniform」を参照した。

### R3. Nielsen Norman Group: 10 Usability Heuristics

- Jakob Nielsen, [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/)
- 1994年公開、2024年更新。原文が述べる通り、個別の適合規則ではなくヒューリスティクスとして使用する。

### R4. WCAG 2.2

- W3C Recommendation, [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- 実装時はW3Cの [How to Meet WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) と各達成基準のUnderstanding文書も併読する。
- 特に参照する達成基準: [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG22/#contrast-minimum)、[1.4.4 Resize Text](https://www.w3.org/TR/WCAG22/#resize-text)、[1.4.10 Reflow](https://www.w3.org/TR/WCAG22/#reflow)、[1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast)、[1.4.12 Text Spacing](https://www.w3.org/TR/WCAG22/#text-spacing)、[2.1.1 Keyboard](https://www.w3.org/TR/WCAG22/#keyboard)、[2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG22/#pause-stop-hide)、[2.4.5 Multiple Ways](https://www.w3.org/TR/WCAG22/#multiple-ways)、[2.4.7 Focus Visible](https://www.w3.org/TR/WCAG22/#focus-visible)、[2.4.11 Focus Not Obscured](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum)、[2.5.8 Target Size](https://www.w3.org/TR/WCAG22/#target-size-minimum)。

### R5. WAI-ARIA Authoring Practices Guide

- W3C WAI, [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- ダイアログ内のTab移動、`Escape`、初期フォーカス、終了時のフォーカス復帰、名前付けを参照する。APGのコード例を使うだけでWCAG適合になるわけではない。

### R6. デジタル庁デザインシステム

- デジタル庁, [デジタル庁デザインシステム](https://design.digital.go.jp/dads/)
- デジタル庁, [タイポグラフィ（アクセシビリティ）](https://design.digital.go.jp/dads/foundations/typography/accessibility/)
- フォント変更、200%以上の拡大、レスポンシブな再配置、文字画像の回避、行高、和文を含む行長の考え方を、日本語UIの実務資料として参照した。

### R7. Apple Human Interface Guidelines

- Apple, [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- Apple, [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Webの適合規格としてではなく、入力方法を問わない操作快適性、44×44ptのヒット領域、明示的な操作状態、Reduce Motionの実務的な参照として使う。

### R8. Web Vitals

- Google, [Web Vitals](https://web.dev/articles/vitals)
- LCP、INP、CLSは変わり得る指標であるため、公開前に現行定義を再確認する。QAでは現時点のLCP・CLS目標を採用している。

## 更新ルール

- WCAG、プラットフォーム指針、Core Web Vitalsの版が変わったときは、URLだけでなくCITY 01の判断とQA項目も同時に見直す。
- 新しい装飾や操作を追加する場合は、先に本文書のどの原則を満たすか説明する。説明できないものは実装しない。
- ユーザーテストで「AIっぽい」「何を押すか分からない」「全部同じ」が一件でも出た場合、個人の好みとして処理せず、該当する原則と画面を記録して再設計する。
