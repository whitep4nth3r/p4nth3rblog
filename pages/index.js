import ContentfulApi from "../utils/ContentfulApi";
import SocialLinks from "../components/SocialLinks";
import TwitchPlayer from "../components/TwitchPlayer";
import { Config } from "../utils/Config";

export default function Home(props) {
  const { socialLinks } = props;

  return (
    <>
      <h1>Build stuff, learn things, love what you do.</h1>
      <SocialLinks socialLinks={socialLinks} />
      <TwitchPlayer />
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
