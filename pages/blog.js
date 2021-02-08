import ContentfulApi from "../utils/ContentfulApi";
import { Config } from "../utils/Config";
import PostList from "../components/PostList";
import RichTextPageContent from "../components/RichTextPageContent";

export default function BlogIndex(props) {
  const { blogPosts, pageContent } = props;
  return (
    <>
      <RichTextPageContent richTextBodyField={pageContent.body} />
      <PostList blogPosts={blogPosts} />
    </>
  );
}

export async function getStaticProps() {
  const blogPosts = await ContentfulApi.getBlogPosts();
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
  );

  return {
    props: {
      blogPosts,
      title: Config.pageMeta.blogIndex.title,
      description: Config.pageMeta.blogIndex.description,
      url: Config.pageMeta.blogIndex.url,
      pageContent,
    },
  };
}
