import { useRouter } from "next/router";
import styles from "./Header.module.css";
import Link from "next/link";
import SocialLinks from "../SocialLinks";
import { Config } from "../../utils/Config";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navList}>
          {Config.menuLinks.map((link) => {
            const isActiveClass =
              (router.pathname === Config.pageMeta.blogPost.slug &&
                link.path === Config.pageMeta.blogIndex.slug) ||
              router.pathname === link.path
                ? ` ${styles.header__navListItem__active}`
                : "";

            return (
              <li
                key={link.displayName}
                className={styles.header__navListItem + isActiveClass}
              >
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
