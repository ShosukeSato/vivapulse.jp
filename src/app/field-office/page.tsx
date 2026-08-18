"use client";

import { FormEvent, useState } from "react";

type Language = "en" | "ja";

const copy = {
  en: {
    nav: [["Approach", "approach"], ["Work", "work"], ["How it works", "remote"], ["About", "about"]],
    hero: {
      eyebrow: "INDEPENDENT WEB PRACTICE / WORKING WORLDWIDE",
      title: <>Good businesses<br />deserve to be understood.</>,
      lead: "I find what makes a local business worth choosing, then turn it into a website people can understand and trust.",
      action: "Get a free first look",
      work: "See the work",
      note: "Research, words, design and code — one continuous process.",
      proofLabel: "ONE REAL PROJECT / FOUR CONNECTED TASKS",
      proofAlt: "The redesigned Beyond Nomad Hostel website",
      proofSteps: [["01", "Audit", "Wrong and missing information"], ["02", "Confirm", "Owner answers and place photos"], ["03", "Rebuild", "Words, structure, design and code"], ["04", "Measure", "24.7 MB → 110 KB"]],
    },
    principle: {
      label: "01 / THE POINT",
      title: "Looking good is only part of the job.",
      intro: "Customers need the right facts. Owners often hold the best details without realising it. I bring those together and make the next step clear.",
      outcomes: ["Get found", "Make sense", "Feel worth choosing"],
    },
    approach: {
      label: "02 / APPROACH",
      title: "Research first. Design second.",
      intro: "The shape of the site comes from the business—not from a template.",
      steps: [
        ["01", "Research", "Site, maps, social pages, reviews and nearby alternatives.", "RESEARCH NOTE"],
        ["02", "Listen", "We talk. You show me the place. I check what is true.", "OWNER INTERVIEW"],
        ["03", "Make", "I shape the story, structure, design and code.", "PAGE STRUCTURE"],
        ["04", "Learn", "After launch, we watch the actions that matter.", "MEASUREMENT PLAN"],
      ],
    },
    work: {
      label: "03 / CASE STUDY",
      place: "ELLA, SRI LANKA",
      title: "Beyond Nomad Hostel",
      status: "Redesign complete / awaiting owner approval",
      statement: "When the information is wrong, a beautiful website still cannot help someone choose.",
      visualCaption: "The new website, alongside the real place and rooms it needs to represent.",
      imageAlts: [
        "The redesigned Beyond Nomad Hostel home page",
        "Guests sitting on the Beyond Nomad terrace overlooking the hills",
        "A dog outside the neighbouring private-room building",
        "A dorm bed with curtains, light and a power socket",
      ],
      problemLabel: "What was getting in the way",
      problem: "Room details were unclear, the map pin was wrong, and much of the actual hostel experience was missing online.",
      foundLabel: "What the research uncovered",
      found: ["Bathrooms in every dorm", "Private rooms next door", "Family dinners and yoga", "Twelve local activities"],
      changedLabel: "What changed",
      changed: ["Twelve focused pages", "Corrected rooms and location", "A clearer booking path", "24.7 MB reduced to 110 KB"],
      resultLabel: "STATUS, HONESTLY",
      result: "The redesign is complete and the technical gains are measured. Booking results stay blank until the site is approved, published and observed.",
      preview: "View preview",
      previewState: "PREVIEW · NOT YET LIVE",
      proofTitle: "One problem, one piece of evidence, one change.",
      proofRows: [
        ["ROOMS", "Room details were unclear.", "Owner-confirmed room information and labelled photos.", "Rewrote and reorganised the room pages."],
        ["LOCATION", "The map pin was wrong.", "The correct location was checked with the owner.", "Corrected the location and arrival guidance."],
        ["EXPERIENCES", "Much of the hostel experience was missing.", "Twelve confirmed local activities.", "Built a dedicated activities section."],
      ],
      proofLabels: ["Problem", "Evidence", "Change"],
      photoCaptions: ["The terrace: the real setting the website needs to represent.", "The neighbouring building: evidence for where the private rooms are.", "A dorm bed: the actual curtain, light and socket details shown to guests."],
      technicalLabel: "MEASURED ON THE HOME PAGE / FIRST PAINT",
      technicalFrom: "24.7 MB",
      technicalTo: "110 KB",
      technicalResult: "225× lighter",
    },
    ushguli: {
      label: "04 / CASE STUDY",
      place: "USHGULI, GEORGIA",
      title: "Guesthouse Gamarjoba",
      status: "Public preview / awaiting owner response",
      statement: "A website can disappear quietly when ownership and handover are not designed.",
      preview: "View preview",
      previewState: "PREVIEW · NOT YET LIVE",
      imageAlt: "Guesthouse Gamarjoba public preview home page",
      imageCaption: "The current noindex preview, built around verified information and honest gaps.",
      findings: [
        ["WHAT WE FOUND", "The old domain had expired and the previous email no longer worked."],
        ["WHAT WE DECIDED", "A static, zero-JavaScript site in a guesthouse-owned account, so the next handover is simpler."],
        ["WHAT STAYS BLANK", "Contact details, room facts and missing photographs remain unguessed until Mamuka confirms them."],
      ],
      metrics: [["59 KiB", "INITIAL TRANSFER"], ["0", "JAVASCRIPT"], ["100", "ACCESSIBILITY"]],
      resultLabel: "CURRENT STATUS",
      result: "The preview is available, but the enquiry path is not complete. Owner confirmation, a working contact route and real room photographs are still required before launch.",
    },
    remote: {
      label: "05 / REMOTE, NOT DISTANT",
      title: "Far away doesn’t have to mean hands-off.",
      intro: "Conversation, a guided smartphone survey and careful desk research bring the place into the project.",
      steps: [
        ["01", "Look around", "Public presence and context"],
        ["02", "Talk", "A real conversation online"],
        ["03", "See the place", "Photos and video from your phone"],
        ["04", "Find the difference", "The details worth remembering"],
        ["05", "Build", "A site around real decisions"],
        ["06", "Watch", "Enquiries, bookings and useful clicks"],
      ],
    },
    get: {
      label: "06 / WHAT STAYS WITH YOU",
      title: "Not just pages. A clearer business online.",
      items: [
        ["Words with evidence", "Useful details are sourced, checked and written in plain language.", "SOURCE LEDGER"],
        ["A site made for this business", "Structure and design follow the customer journey, not a generic template.", "WEBSITE"],
        ["A way to keep learning", "Measurement and handover make the launch a starting point, not the end.", "MEASUREMENT + HANDOVER"],
      ],
    },
    about: {
      label: "07 / ABOUT",
      title: "Hi, I’m Shosuke.",
      body: "I travel, make apps and films, write, and build websites. Working across different forms has taught me to notice the small details that give a place its character—and to make them clear to someone seeing it for the first time.",
      aside: "You work directly with the person doing the research, writing, design and build.",
      roles: ["Research", "Writing", "Design", "Build"],
    },
    audit: {
      label: "08 / A FREE FIRST LOOK",
      title: "Want a second pair of eyes?",
      intro: "Send the links you already have. I’ll reply with three to five specific things I notice—no automated score and no obligation to continue.",
      fields: { business: "Business name", website: "Website URL", instagram: "Instagram URL", maps: "Google Maps URL", email: "Your email", notes: "What would you most like to improve?" },
      optional: "optional",
      submit: "Prepare the email",
      privacy: "Nothing is uploaded or stored here. This button opens a draft in your email app, and you decide whether to send it.",
      status: "Your email app should open with a draft. Nothing has been sent by this website.",
      direct: "Or email directly",
    },
    footer: "INDEPENDENT WEB PRACTICE / SHOSUKE SATO",
  },
  ja: {
    nav: [["考え方", "approach"], ["制作事例", "work"], ["進め方", "remote"], ["自己紹介", "about"]],
    hero: {
      eyebrow: "個人で営むWEB制作室 / 海外からのご相談にも対応",
      title: <>いい仕事が、<br />ちゃんと伝わり、<br />選ばれるために。</>,
      lead: "まだ言葉になっていない魅力まで丁寧に拾い、初めて知る人にも伝わるWebサイトをつくります。",
      action: "無料でサイトを見てもらう",
      work: "制作事例を見る",
      note: "調査から文章、デザイン、実装まで、すべて一人で担当します。",
      proofLabel: "一つの案件で、ここまで担当します",
      proofAlt: "Beyond Nomad Hostelの新しいWebサイト",
      proofSteps: [["01", "調べる", "間違っていた情報、足りなかった情報"], ["02", "確かめる", "オーナーの回答と現地写真"], ["03", "つくり直す", "文章、構成、デザイン、実装"], ["04", "測る", "24.7 MB → 110 KB"]],
    },
    principle: {
      label: "01 / 大切にしていること",
      title: "見た目を整えるだけでは、足りません。",
      intro: "お客さんが判断に必要な情報と、事業を営む本人もまだ言葉にできていない魅力。その両方を見つけ、安心して選べる形にします。",
      outcomes: ["見つけてもらう", "きちんと伝える", "安心して選んでもらう"],
    },
    approach: {
      label: "02 / つくり方",
      title: "まず調べる。デザインはそのあと。",
      intro: "先にテンプレートを当てはめません。その事業を知るところから、必要なサイトの形を考えます。",
      steps: [
        ["01", "調べる", "公式サイトや地図、SNS、レビュー、周辺の競合まで確認します。", "調査ノート"],
        ["02", "話を聞く", "オンラインでじっくり話し、写真や動画で現場を見せてもらいます。", "オーナーへの聞き取り"],
        ["03", "かたちにする", "文章、構成、デザイン、実装を、ばらばらにせず一つにつなげます。", "ページ構成"],
        ["04", "公開後を確かめる", "問い合わせや予約など、事業にとって大切な変化を追います。", "計測計画"],
      ],
    },
    work: {
      label: "03 / 制作事例",
      place: "スリランカ・エッラ",
      title: "Beyond Nomad Hostel",
      status: "リデザイン完了 / オーナー確認中",
      statement: "情報が間違っていれば、どれだけきれいなサイトでも、安心して選ぶことはできません。",
      visualCaption: "新しいサイトと、そこで伝えるべき実際の場所・客室。",
      imageAlts: [
        "Beyond Nomad Hostelの新しいトップページ",
        "山を望むBeyond Nomadのテラスに座る宿泊者",
        "個室がある隣接棟の前を歩く犬",
        "カーテン、照明、コンセントが付いたドミトリーのベッド",
      ],
      problemLabel: "うまく伝わっていなかったこと",
      problem: "旧サイトには、客室の説明や地図など、実際とは違う情報や足りない情報がありました。",
      foundLabel: "調べて分かったこと",
      found: ["全ドミトリーに専用バスルーム", "隣の建物に個室", "食事会とヨガ", "12種類のローカル体験"],
      changedLabel: "新しくしたこと",
      changed: ["目的別の12ページ", "客室と位置情報を修正", "予約までの流れを整理", "24.7 MBを110 KBへ軽量化"],
      resultLabel: "いま言えること",
      result: "新しいサイトは完成し、表示の軽さも実測できています。一方、予約や問い合わせへの効果はまだ分かりません。公開後に数字を確認できるまで、成果としては掲載しません。",
      preview: "公開前プレビューを見る",
      previewState: "プレビュー · まだ本番サイトではありません",
      proofTitle: "何が問題で、何を確かめ、どう直したのか。",
      proofRows: [
        ["客室", "客室の違いや設備が、サイトを見てもよく分かりませんでした。", "オーナーに確認した客室情報と、説明の付いた現地写真。", "客室ごとの情報を修正し、選びやすい順番に整理しました。"],
        ["場所", "地図のピンが、実際とは違う場所を示していました。", "正しい場所をオーナーに確認。", "地図と到着案内を正しい情報に直しました。"],
        ["体験", "宿でできることの多くが、サイトに載っていませんでした。", "実際に案内できる12種類のローカル体験。", "滞在中にできることをまとめたページを新設しました。"],
      ],
      proofLabels: ["問題", "確認した根拠", "変更"],
      photoCaptions: ["テラス：この宿で過ごす時間を伝える、実際の風景。", "隣接棟：個室がどの建物にあるかを確かめるための写真。", "ドミトリー：カーテン、照明、コンセントを確認できる客室写真。"],
      technicalLabel: "トップページを最初に開いたときの通信量 / 実測値",
      technicalFrom: "24.7 MB",
      technicalTo: "110 KB",
      technicalResult: "約225分の1まで軽量化",
    },
    ushguli: {
      label: "04 / 制作事例",
      place: "ジョージア・ウシュグリ",
      title: "Guesthouse Gamarjoba",
      status: "公開前プレビューあり / オーナー返信待ち",
      statement: "公開したあとも、宿の人が自分たちで持ち続けられるサイトにする。",
      preview: "公開前プレビューを見る",
      previewState: "プレビュー · まだ本番サイトではありません",
      imageAlt: "Guesthouse Gamarjobaの公開プレビューのトップページ",
      imageCaption: "確認できたことだけを掲載し、まだ分からない部分は空けたままにした公開前プレビュー。",
      findings: [
        ["調査で分かったこと", "以前のドメインはすでに失効し、掲載されていたメールアドレスにも届かない状態でした。"],
        ["長く持てるつくり方", "次に引き継ぐ人が困らないよう、宿側のアカウントで管理できる、軽くて単純なサイトにしました。"],
        ["分からないことは書かない", "連絡先や客室情報、足りない写真は、Mamukaさんの確認が取れるまで推測で埋めません。"],
      ],
      metrics: [["59 KiB", "初回転送量"], ["0", "JAVASCRIPT"], ["100", "アクセシビリティ"]],
      resultLabel: "現在地",
      result: "公開前プレビューまでは完成しています。ただし、まだ宿へ問い合わせる手段がありません。公開するには、オーナーの確認、現在使える連絡先、実際の客室写真が必要です。",
    },
    remote: {
      label: "05 / 海外の仕事の進め方",
      title: "現地へ行けなくても、現場を知る方法はあります。",
      intro: "事業を営む方との会話、スマホで撮ってもらう写真や動画、公開情報の調査を組み合わせて進めます。",
      steps: [
        ["01", "公開情報を調べる", "サイト、地図、SNS、レビューを確認"],
        ["02", "本人に聞く", "オンラインで仕事や場所について話す"],
        ["03", "現場を見せてもらう", "スマホの写真と動画で細部を確認"],
        ["04", "その事業らしさを見つける", "選ばれる理由になる違いを整理"],
        ["05", "サイトにする", "お客さんが判断する順番から設計"],
        ["06", "公開後に確かめる", "問い合わせや予約の変化を追う"],
      ],
    },
    get: {
      label: "06 / お渡しするもの",
      title: "Webページだけでなく、伝え方そのものを整えます。",
      items: [
        ["確かめた事実から書いた文章", "大切な情報を一つずつ確認し、初めて知る人にも分かる言葉で書きます。", "情報の出所と確認事項"],
        ["その事業に合わせたWebサイト", "既製の型にはめず、お客さんが知りたい順番に合わせて設計します。", "WEBサイト"],
        ["公開後も育てられる資料", "見るべき数字と更新に必要な情報を残し、つくって終わりにしません。", "計測方法と引き継ぎ資料"],
      ],
    },
    about: {
      label: "07 / 自己紹介",
      title: "さとうしょうすけです。",
      body: "旅をしながら、アプリをつくり、映像を撮り、文章を書いています。場所や仕事の魅力は、本人にとって当たり前すぎて見えなくなっていることがあります。そうした小さな違いを見つけ、初めて知る人にも伝わる形にするのが、僕の仕事です。",
      aside: "相談する相手と、実際に手を動かす人は同じです。調査から文章、デザイン、実装まで、すべて僕が担当します。",
      roles: ["調査", "文章", "デザイン", "実装"],
    },
    audit: {
      label: "08 / 無料のWebサイト診断",
      title: "まずは、いまのサイトを見せてください。",
      intro: "公開中のサイトやSNSを拝見し、気になった点を3〜5件、具体的にお返しします。自動採点ではありません。そのまま制作を依頼する必要もありません。",
      fields: { business: "事業名", website: "WebサイトURL", instagram: "Instagram URL", maps: "Google Maps URL", email: "返信先メールアドレス", notes: "いちばん気になっていること" },
      optional: "任意",
      submit: "メールの下書きを開く",
      privacy: "入力した内容が、このサイトに送信・保存されることはありません。ボタンを押すとメールの下書きが開きます。内容を確認してから送信してください。",
      status: "メールの下書きを開きました。この時点では、まだ送信されていません。",
      direct: "直接メールする",
    },
    footer: "さとうしょうすけが個人で営むWeb制作室",
  },
} as const;

const contactEmail = "shosuke240557@gmail.com";
const city01Url = "/";
const caseStudyUrls = {
  beyondNomad: {
    previewUrl: "https://shosukesato.github.io/beyondnomad-preview/",
    productionUrl: undefined,
  },
  gamarjoba: {
    previewUrl: "https://gamarjoba-ushguli.github.io/",
    productionUrl: undefined,
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [formStatus, setFormStatus] = useState("");
  const text = copy[language];

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const labels = text.audit.fields;
    const lines = [
      [labels.business, data.get("business")], [labels.website, data.get("website")],
      [labels.instagram, data.get("instagram")], [labels.maps, data.get("maps")],
      [labels.email, data.get("email")], [labels.notes, data.get("notes")],
    ].map(([label, value]) => `${label}: ${String(value ?? "").trim() || "—"}`);
    const subject = language === "en" ? "Website first-look request" : "Webサイト相談のお願い";
    const body = language === "en"
      ? `Hello Shosuke,\n\nI would like to ask for a first look at my online presence.\n\n${lines.join("\n")}\n\nThank you.`
      : `しょうすけさん\n\nいまのWebサイトとオンライン上の情報を一度見てほしいです。\n\n${lines.join("\n")}\n\nよろしくお願いします。`;
    setFormStatus(text.audit.status);
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="site-shell" lang={language} id="top">
      <header className="site-header">
        <div className="header-identity">
          <a className="city-return" href={city01Url} aria-label={language === "en" ? "Return to CITY 01" : "CITY 01へ戻る"}><span aria-hidden="true">←</span> CITY 01</a>
          <a className="brand" href="#top" aria-label="Shosuke Sato Field Office home"><span><strong>SHOSUKE SATO</strong><small>FIELD OFFICE / WEB PRACTICE</small></span></a>
        </div>
        <nav aria-label={language === "en" ? "Main navigation" : "主要ナビゲーション"}>{text.nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="language-switch" role="group" aria-label={language === "en" ? "Language" : "言語"}>
          <button type="button" aria-pressed={language === "en"} onClick={() => { setLanguage("en"); setFormStatus(""); }}>EN</button>
          <button type="button" aria-pressed={language === "ja"} onClick={() => { setLanguage("ja"); setFormStatus(""); }}>日本語</button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{text.hero.eyebrow}</p>
          <h1 id="hero-title">{text.hero.title}</h1>
          <p className="hero-lead">{text.hero.lead}</p>
          <div className="hero-actions"><a className="button button-primary" href="#audit">{text.hero.action}<span aria-hidden="true">→</span></a><a className="text-link" href="#work">{text.hero.work}<span aria-hidden="true">↘</span></a></div>
          <p className="hero-note">{text.hero.note}</p>
        </div>
        <aside className="hero-proof" aria-label={text.hero.proofLabel}>
          <p>{text.hero.proofLabel}</p>
          <a href={caseStudyUrls.beyondNomad.previewUrl} target="_blank" rel="noreferrer" aria-label={`${text.work.preview}: ${text.work.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/field-office/images/beyond-nomad-site.png" alt={text.hero.proofAlt} width="1440" height="900" fetchPriority="high" />
          </a>
          <ol>{text.hero.proofSteps.map(([number, title, detail]) => <li key={number}><span>{number}</span><strong>{title}</strong><small>{detail}</small></li>)}</ol>
        </aside>
      </section>

      <section className="principle section" id="approach" aria-labelledby="principle-title">
        <div className="section-label">{text.principle.label}</div>
        <div className="principle-main"><h2 id="principle-title">{text.principle.title}</h2><p>{text.principle.intro}</p></div>
        <ol className="outcome-line">{text.principle.outcomes.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol>
      </section>

      <section className="approach section section-dark" aria-labelledby="approach-title">
        <div className="section-label">{text.approach.label}</div>
        <div className="section-heading"><h2 id="approach-title">{text.approach.title}</h2><p>{text.approach.intro}</p></div>
        <ol className="approach-grid">{text.approach.steps.map(([number, title, body, artifact]) => <li key={number}><span>{number}</span><p className="artifact-label">{artifact}</p><h3>{title}</h3><p>{body}</p></li>)}</ol>
      </section>

      <section className="case-study section" id="work" aria-labelledby="work-title">
        <div className="section-label">{text.work.label}</div>
        <header className="case-header"><div><p>{text.work.place}</p><h2 id="work-title">{text.work.title}</h2></div><span className="status-badge">{text.work.status}</span></header>
        <div className="case-preview-row"><span>{text.work.previewState}</span><a href={caseStudyUrls.beyondNomad.previewUrl} target="_blank" rel="noreferrer">{text.work.preview} ↗</a></div>
        <a className="case-screen" href={caseStudyUrls.beyondNomad.previewUrl} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/field-office/images/beyond-nomad-site.png" alt={text.work.imageAlts[0]} width="1440" height="900" loading="lazy" decoding="async" />
        </a>
        <p className="case-statement">{text.work.statement}</p>
        <h3 className="evidence-title">{text.work.proofTitle}</h3>
        <div className="evidence-table">{text.work.proofRows.map(([topic, problem, evidence, change]) => <article key={topic}><h4>{topic}</h4><dl><div><dt>{text.work.proofLabels[0]}</dt><dd>{problem}</dd></div><div><dt>{text.work.proofLabels[1]}</dt><dd>{evidence}</dd></div><div><dt>{text.work.proofLabels[2]}</dt><dd>{change}</dd></div></dl></article>)}</div>
        <div className="proof-photos">
          {["/field-office/images/beyond-nomad-terrace.webp", "/field-office/images/beyond-nomad-deck.webp", "/field-office/images/beyond-nomad-dorm.webp"].map((src, index) => (
            <figure key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={text.work.imageAlts[index + 1]} width={index === 1 ? 960 : 1280} height={index === 1 ? 1280 : 853} loading="lazy" decoding="async" />
              <figcaption><span>0{index + 1}</span>{text.work.photoCaptions[index]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="technical-proof"><p>{text.work.technicalLabel}</p><div><span>{text.work.technicalFrom}</span><i aria-hidden="true">→</i><strong>{text.work.technicalTo}</strong></div><b>{text.work.technicalResult}</b></div>
        <div className="claim-box"><span>{text.work.resultLabel}</span><p>{text.work.result}</p></div>
      </section>

      <section className="case-study ushguli-case section" aria-labelledby="ushguli-title">
        <div className="section-label">{text.ushguli.label}</div>
        <header className="case-header"><div><p>{text.ushguli.place}</p><h2 id="ushguli-title">{text.ushguli.title}</h2></div><span className="status-badge">{text.ushguli.status}</span></header>
        <div className="case-preview-row"><span>{text.ushguli.previewState}</span><a href={caseStudyUrls.gamarjoba.previewUrl} target="_blank" rel="noreferrer">{text.ushguli.preview} ↗</a></div>
        <a className="case-screen gamarjoba-screen" href={caseStudyUrls.gamarjoba.previewUrl} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/field-office/images/gamarjoba-site.png" alt={text.ushguli.imageAlt} width="1440" height="1000" loading="lazy" decoding="async" />
          <span>{text.ushguli.imageCaption}</span>
        </a>
        <p className="case-statement">{text.ushguli.statement}</p>
        <div className="gamarjoba-findings">{text.ushguli.findings.map(([label, body]) => <article key={label}><h3>{label}</h3><p>{body}</p></article>)}</div>
        <dl className="case-metrics">{text.ushguli.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className="claim-box"><span>{text.ushguli.resultLabel}</span><p>{text.ushguli.result}</p></div>
      </section>

      <section className="remote section" id="remote" aria-labelledby="remote-title">
        <div className="section-label">{text.remote.label}</div>
        <div className="section-heading"><h2 id="remote-title">{text.remote.title}</h2><p>{text.remote.intro}</p></div>
        <ol className="remote-route">{text.remote.steps.map(([number, title, body]) => <li key={number}><span>{number}</span><i aria-hidden="true" /><h3>{title}</h3><p>{body}</p></li>)}</ol>
      </section>

      <section className="deliverables section section-blue" aria-labelledby="get-title">
        <div className="section-label">{text.get.label}</div>
        <div className="section-heading"><h2 id="get-title">{text.get.title}</h2></div>
        <div className="deliverable-grid">{text.get.items.map(([title, body, artifact], index) => <article key={title}><span>0{index + 1}</span><b>{artifact}</b><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <div className="section-label">{text.about.label}</div>
        <div className="about-grid"><div><h2 id="about-title">{text.about.title}</h2><p>{text.about.body}</p></div><aside><span>ONE PERSON / ONE LINE</span><ol>{text.about.roles.map((role, index) => <li key={role}><i>0{index + 1}</i>{role}</li>)}</ol><p>{text.about.aside}</p></aside></div>
      </section>

      <section className="audit section section-dark" id="audit" aria-labelledby="audit-title">
        <div className="section-label">{text.audit.label}</div>
        <div className="audit-grid">
          <div className="audit-intro"><h2 id="audit-title">{text.audit.title}</h2><p>{text.audit.intro}</p></div>
          <form onSubmit={prepareEmail}>
            <label>{text.audit.fields.business}<input required name="business" autoComplete="organization" /></label>
            <label>{text.audit.fields.website}<input required name="website" type="url" inputMode="url" placeholder="https://" /></label>
            <label>{text.audit.fields.instagram} <small>({text.audit.optional})</small><input name="instagram" type="url" inputMode="url" placeholder="https://" /></label>
            <label>{text.audit.fields.maps} <small>({text.audit.optional})</small><input name="maps" type="url" inputMode="url" placeholder="https://" /></label>
            <label>{text.audit.fields.email}<input required name="email" type="email" autoComplete="email" /></label>
            <label>{text.audit.fields.notes} <small>({text.audit.optional})</small><textarea name="notes" rows={4} /></label>
            <button className="button button-primary" type="submit">{text.audit.submit}<span aria-hidden="true">→</span></button>
            <p className="privacy-note">{text.audit.privacy}</p>{formStatus && <p className="form-status" role="status">{formStatus}</p>}
            <p className="direct-email">{text.audit.direct}: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </form>
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span><strong>SHOSUKE SATO</strong><small>FIELD OFFICE / WEB PRACTICE</small></span></a><p>{text.footer}</p><a href="#top">TOP ↑</a></footer>
    </main>
  );
}

