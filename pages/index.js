import Head from "next/head";
import ContentfulApi from "../utils/ContentfulApi";
import SocialLinks from "../components/SocialLinks";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home(props) {
  const { socialLinks } = props;

  return (
    <>
      <Head>
        <title>Home | whitep4nth3r.codes</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="This is a test" />

        {/* Add OpenGraph meta tags here */}
      </Head>

      <Header />

      <main>This is the home page</main>
      <SocialLinks socialLinks={socialLinks} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const socialLinks = await ContentfulApi.getSocialLinks();

  return {
    props: {
      socialLinks,
    },
  };
}
