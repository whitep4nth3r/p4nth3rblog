import TwitchPlayer from "../components/TwitchPlayer";
import { Config } from "../utils/Config";

export default function Home() {
  return (
    <>
      <h1>Build stuff, learn things, love what you do.</h1>

      <TwitchPlayer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: Config.pageMeta.home.title,
      description: Config.pageMeta.home.description,
      url: Config.pageMeta.home.url,
    },
  };
}
