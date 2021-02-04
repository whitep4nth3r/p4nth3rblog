import ContentfulApi from "../utils/ContentfulApi";
import SocialLinks from "../components/SocialLinks";
import { Config } from "../utils/Config";

export default function Home(props) {
  const { socialLinks } = props;

  return (
    <>
      <h1>HOME</h1>

      <SocialLinks socialLinks={socialLinks} />
    </>
  );
}

export async function getStaticProps() {
  const socialLinks = await ContentfulApi.getSocialLinks();

  return {
    props: {
      socialLinks,
      title: Config.pageMeta.home.title,
      description: Config.pageMeta.home.description,
      url: Config.pageMeta.home.url,
    },
  };
}
