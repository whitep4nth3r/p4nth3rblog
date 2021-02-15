import { Config } from "../utils/Config";
import PageMeta from "../components/PageMeta";
import ContentfulApi from "../utils/ContentfulApi";
import RichTextPageContent from "../components/RichTextPageContent";
import MainLayout from "../layouts/main";
import RecentPostList from "../components/RecentPostList";

export default function Home(props) {
  const { pageContent, recentPosts } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.home.url}
      />
      <RichTextPageContent richTextBodyField={pageContent.body} />
      <RecentPostList posts={recentPosts} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
  );

  const recentPosts = await ContentfulApi.getRecentPostList();

  return {
    props: {
      pageContent,
      recentPosts,
    },
  };
}
