import globalStyles from "./main.styles.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />

      <main className="mainWrapper">{children}</main>

      <Footer />

      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}
