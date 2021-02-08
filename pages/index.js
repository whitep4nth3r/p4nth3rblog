import dynamic from "next/dynamic";
import { Config } from "../utils/Config";
import ContentfulApi from "../utils/ContentfulApi";
import RichTextPageContent from "../components/RichTextPageContent";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/TwitchPlayer"),
  {
    ssr: false,
  },
);

export default function Home(props) {
  const { pageContent } = props;

  return (
    <>
      <RichTextPageContent richTextBodyField={pageContent.body} />

      {/* {process.browser && <DynamicComponentWithNoSSR />}
      {!process.browser && <p>Watch on Twitch.... TODO</p>} */}
    </>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
  );

  return {
    props: {
      title: Config.pageMeta.home.title,
      description: Config.pageMeta.home.description,
      url: Config.pageMeta.home.url,
      pageContent,
    },
  };
}
