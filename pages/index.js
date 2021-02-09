import dynamic from "next/dynamic";
import { Config } from "../utils/Config";
import PageMeta from "../components/PageMeta";
import ContentfulApi from "../utils/ContentfulApi";
import RichTextPageContent from "../components/RichTextPageContent";
import MainLayout from "../layouts/main";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/TwitchPlayer"),
  {
    ssr: false,
  },
);

export default function Home(props) {
  const { pageContent } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.home.url}
      />
      <RichTextPageContent richTextBodyField={pageContent.body} />

      {/* {process.browser && <DynamicComponentWithNoSSR />}
      {!process.browser && <p>Watch on Twitch.... TODO</p>} */}
    </MainLayout>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
  );

  return {
    props: {
      pageContent,
    },
  };
}
