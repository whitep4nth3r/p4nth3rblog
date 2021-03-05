import { useState } from "react";
import HeaderStyles from "@styles/Header.module.css";
import Link from "next/link";
import SocialLinks from "@components/SocialLinks";
import { useRouter } from "next/router";
import { Config } from "@utils/Config";
import Logo from "./svg/Logo";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const hamburgerClasses = menuOpen
    ? `${HeaderStyles.hamburger} ${HeaderStyles.is__open}`
    : `${HeaderStyles.hamburger}`;

  const navLinksClasses = menuOpen
    ? `${HeaderStyles.header__navList}`
    : `${HeaderStyles.header__navList} ${HeaderStyles.header__navList__hide}`;

  return (
    <header className={HeaderStyles.header}>
      <div className={HeaderStyles.header__logoContainer}>
        <Link href="/">
          <a
            className={HeaderStyles.header__logoContainerLink}
            aria-label="Navigate to home page"
          >
            <Logo />
          </a>
        </Link>
      </div>

      <nav className={HeaderStyles.header__nav} role="navigation">
        <button
          className={hamburgerClasses}
          onClick={() => toggleMenu()}
          aria-expanded={menuOpen}
          aria-label="Menu Toggle"
          aria-controls="headerLinks"
          type="button"
        >
          <span className={HeaderStyles.hamburger__box}>
            <span className={HeaderStyles.hamburger__inner}></span>
          </span>
        </button>

        <ul className={navLinksClasses}>
          {Config.menuLinks.map((link) => {
            const isActive =
              (router.pathname === Config.pageMeta.post.slug &&
                link.path === Config.pageMeta.blogIndex.slug) ||
              router.pathname === link.path;

            const isActiveClass = isActive
              ? ` ${HeaderStyles.header__navListItem__active}`
              : "";

            return (
              <li
                key={link.displayName}
                className={HeaderStyles.header__navListItem + isActiveClass}
              >
                <Link href={link.path}>
                  <a className={HeaderStyles.header__navListItemLink}>
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
