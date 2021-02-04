import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navList}>
          <li className={styles.header__navListItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.header__navListItem}>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
