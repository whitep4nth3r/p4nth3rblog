import ContentfulApi from "../utils/ContentfulApi";
import { Config } from "../utils/Config";
import PageMeta from "../components/PageMeta";
import PostList from "../components/PostList";
import RichTextPageContent from "../components/RichTextPageContent";
import MainLayout from "../layouts/main";

export default function BlogIndex(props) {
  const { blogPosts, totalBlogPosts, pageContent, url } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.blogIndex.url}
      />
      <RichTextPageContent richTextBodyField={pageContent.body} />
      <PostList blogPosts={blogPosts} totalBlogPosts={totalBlogPosts} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  const blogPosts = await ContentfulApi.getBlogPosts();
  const totalBlogPosts = await ContentfulApi.getTotalBlogPostsNumber();
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
  );

  return {
    props: {
      blogPosts,
      totalBlogPosts,
      pageContent,
    },
  };
}
