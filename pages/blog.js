import ContentfulApi from "../utils/ContentfulApi";
import { Config } from "../utils/Config";
import PageMeta from "../components/PageMeta";
import PostList from "../components/PostList";
import RichTextPageContent from "../components/RichTextPageContent";
import MainLayout from "../layouts/main";

export default function BlogIndex(props) {
  const { postSummaries, totalPosts, pageContent, url } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.blogIndex.url}
      />
      <RichTextPageContent richTextBodyField={pageContent.body} />
      <PostList posts={postSummaries} totalPosts={totalPosts} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(1);

  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
  );

  return {
    props: {
      postSummaries,
      totalPosts,
      pageContent,
    },
  };
}
