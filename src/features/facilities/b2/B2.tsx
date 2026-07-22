import Link from "next/link";
import type { CityPlace } from "@/data/city";
import PixelIcon from "@/features/city/PixelIcon";
import FacilityBar from "../FacilityBar";
import styles from "./b2.module.css";

export default function B2({ place }: { place: CityPlace }) {
  return (
    <div className={styles.page}>
      <FacilityBar place={place} inverse />
      <main className={styles.room}>
        <div className={styles.level} aria-hidden="true"><span>B2</span><i /><i /><i /><i /></div>
        <section aria-labelledby="b2-title">
          <p className={styles.status}><span /> BUILDING / AUDIO NOT YET PUBLIC</p>
          <h1 id="b2-title"><span>開局</span><wbr /><span>準備中。</span></h1>
          <p className={styles.lead}>人生の選択と次の一手を、夜にじっくり考える小さな放送室をつくっています。</p>
          <div className={styles.notice}>
            <span>現在の状態</span>
            <strong>公開できる音声は、まだありません。</strong>
            <p>最初の番組を制作しています。公開の準備が整うまで、もう少しお待ちください。</p>
          </div>
          <Link className={styles.back} href="/">
            <span>街へ戻る</span><PixelIcon name="map" />
          </Link>
        </section>
      </main>
    </div>
  );
}
