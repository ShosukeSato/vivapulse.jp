import Link from "next/link";
import type { CityPlace } from "@/data/city";
import PixelIcon from "@/features/city/PixelIcon";
import styles from "./facility-shell.module.css";

export default function FacilityBar({ place, inverse = false }: { place: CityPlace; inverse?: boolean }) {
  return (
    <header className={`${styles.bar}${inverse ? ` ${styles.inverse}` : ""}`}>
      <Link className={styles.back} href="/">
        <PixelIcon name="map" /><span>街へ戻る</span>
      </Link>
      <Link className={styles.cityMark} href="/" aria-label="CITY 01 ホーム">
        <i aria-hidden="true"><b /><b /><b /><b /></i>
        <strong>CITY 01</strong>
      </Link>
      <div className={styles.locator}>
        <span>{place.name}</span><b>{place.code}</b>
      </div>
    </header>
  );
}
