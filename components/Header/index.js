import { useRouter } from "next/router";
import styles from "./Header.module.css";
import Link from "next/link";
import SocialLinks from "../SocialLinks";

const MenuLinks = [
  {
    displayName: "Home",
    path: "/",
  },
  {
    displayName: "Blog",
    path: "/blog",
  },
];

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navList}>
          {MenuLinks.map((link) => {
            const isActiveClass =
              router.pathname === link.path
                ? ` ${styles.header__navListItem__active}`
                : "";

            return (
              <li className={styles.header__navListItem + isActiveClass}>
                <Link href={link.path}>{link.displayName}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <SocialLinks />
    </header>
  );
}
