import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import { useState } from "react";
import HeaderStyles from "@styles/Header.module.css";
import ButtonStyles from "@styles/Button.module.css";
import Link from "next/link";
import SocialLinks from "@components/SocialLinks";
import { useRouter } from "next/router";
import { Config } from "@utils/Config";
import Logo from "./svg/Logo";

export default function Header() {
  const { data } = useSWR("/api/twitch", fetcher);
  const isLiveOnTwitch = data?.isLiveOnTwitch;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const showSocialLinks = router.pathname !== "/";

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
      {isLiveOnTwitch && (
        <div className={HeaderStyles.header__liveContainer}>
          <a
            className={ButtonStyles.button}
            href="https://twitch.tv/whitep4nth3r"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={HeaderStyles.header__liveButtonText}>
              I'm live on Twitch now →
            </span>
          </a>
        </div>
      )}
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
          <span className={HeaderStyles.hamburger__text}>Menu</span>
        </button>

        <ul className={navLinksClasses}>
          {Config.menuLinks.map((link) => {
            const onBlogPost =
              router.pathname === Config.pageMeta.post.slug &&
              link.path === Config.pageMeta.blogIndex.slug;

            const onBlogIndexPage =
              router.pathname === Config.pageMeta.blogIndexPage.slug &&
              link.path === Config.pageMeta.blogIndex.slug;

            //TODO make this better?
            const onUsesPath =
              router.pathname.startsWith("/uses") &&
              link.path.startsWith("/uses");

            const isActive =
              onBlogPost ||
              onBlogIndexPage ||
              onUsesPath ||
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
          <li className={HeaderStyles.header__navListItem}>
            <a
              href="https://www.bonfire.com/store/p4nth3rshop/"
              className={HeaderStyles.header__navListItemLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shop whitepanther merchandise"
            >
              Merch
            </a>
          </li>
        </ul>
      </nav>

      {showSocialLinks && <SocialLinks />}
    </header>
  );
}
