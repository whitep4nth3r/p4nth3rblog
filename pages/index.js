import dynamic from "next/dynamic";
import { Config } from "../utils/Config";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/TwitchPlayer"),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <>
      <h1>Build stuff, learn things, love what you do.</h1>
      {/* {process.browser && <DynamicComponentWithNoSSR />}
      {!process.browser && <p>Watch on Twitch.... TODO</p>} */}
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      title: Config.pageMeta.home.title,
      description: Config.pageMeta.home.description,
      url: Config.pageMeta.home.url,
    },
  };
}
