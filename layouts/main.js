import Header from "../components/Header";
import Footer from "../components/Footer";

import { MainWrapper } from "./main.style";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />

      <MainWrapper>{children}</MainWrapper>

      <Footer />
    </>
  );
}
