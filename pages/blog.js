import ContentfulApi from "../utils/ContentfulApi";
import { Config } from "../utils/Config";
import PostList from "../components/PostList";
import RichTextPageContent from "../components/RichTextPageContent";

export default function BlogIndex(props) {
  const { blogPosts, totalBlogPosts, pageContent } = props;

  return (
    <>
      <RichTextPageContent richTextBodyField={pageContent.body} />
      <PostList blogPosts={blogPosts} totalBlogPosts={totalBlogPosts} />
    </>
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
      url: Config.pageMeta.blogIndex.url,
      pageContent,
    },
  };
}
