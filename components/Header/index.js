import Link from "next/link";
import { HeaderContainer, NavContainer } from "./index.style";

export default function Header() {
  return (
    <HeaderContainer>
      <NavContainer>
        <Link href="/">GO TO HOME</Link>
        <Link href="/blog">GO TO BLOG</Link>
      </NavContainer>
    </HeaderContainer>
  );
}
