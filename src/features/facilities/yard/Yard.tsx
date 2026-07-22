import Link from "next/link";
import type { CityPlace } from "@/data/city";
import { otherApps } from "@/data/content";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import styles from "./yard.module.css";

function platformFor(href: string) {
  return href.includes("apps.apple.com") ? "iOS APP" : "WEB PROJECT";
}

export default function Yard({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#project-ledger">制作台帳へ移動</a>
      <FacilityBar place={place} />

      <main>
        <header className={styles.header}>
          <div className={styles.sign} aria-hidden="true"><span>01</span><i /><i /></div>
          <div className={styles.title}>
            <p>01 YARD / 制作区画</p>
            <h1><span>小さな発明の</span><span>制作台帳。</span></h1>
          </div>
          <p className={styles.intro}>
            <span className="semanticPhrase semanticUnit">必要から</span><wbr />
            <span className="semanticPhrase semanticUnit">生まれた、</span><wbr />
            <span className="semanticPhrase semanticUnit">小さなアプリと</span><wbr />
            <span className="semanticPhrase semanticUnit">実験の</span><wbr />
            <span className="semanticPhrase semanticUnit">制作区画です。</span><wbr />
            <span className="semanticPhrase semanticUnit">公開中の</span><wbr />
            <span className="semanticPhrase semanticUnit">{otherApps.length}件を、</span><wbr />
            <span className="semanticPhrase semanticUnit">制作台帳として</span><wbr />
            <span className="semanticPhrase semanticUnit">一覧できます。</span>
          </p>
        </header>

        <section className={styles.ledger} id="project-ledger" aria-labelledby="ledger-title">
          <div className={styles.ledgerHead}>
            <div><span>BUILT HERE</span><h2 id="ledger-title"><span>公開</span><span>プロジェクト</span></h2></div>
            <strong>{String(otherApps.length).padStart(2, "0")} PROJECTS</strong>
          </div>

          <ol>
            {otherApps.map((project, index) => (
              <li key={project.name}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.project}>
                    <small><span>{platformFor(project.href)}</span><span>公開中</span><span>個人制作</span></small>
                    <strong>{project.name}</strong>
                  </span>
                  <span className={styles.open}>公開先を開く <PixelIcon name="external" /></span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <footer className={styles.note}>
          <span>YARD NOTE</span>
          <p>必要なものがなければ、まず小さくつくる。街は、その積み重ねで広がっていきます。</p>
          <Link href="/">街へ戻る <PixelIcon name="map" /></Link>
        </footer>
      </main>
    </div>
  );
}
