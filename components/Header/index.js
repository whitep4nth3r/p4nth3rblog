import { useRouter } from "next/router";
import styles from "./Header.module.css";
import Link from "next/link";
import SocialLinks from "../SocialLinks";
import { Config } from "../../utils/Config";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav} role="navigation">
        <ul className={styles.header__navList}>
          {Config.menuLinks.map((link) => {
            const isActive =
              (router.pathname === Config.pageMeta.post.slug &&
                link.path === Config.pageMeta.blogIndex.slug) ||
              router.pathname === link.path;

            const isActiveClass = isActive
              ? ` ${styles.header__navListItem__active}`
              : "";

            return (
              <li
                key={link.displayName}
                className={styles.header__navListItem + isActiveClass}
              >
                <Link href={link.path}>
                  <a className={styles.header__navListItemLink}>
                    {link.displayName}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <SocialLinks />
    </header>
  );
}
