import ContentfulApi from "../utils/ContentfulApi";
import { Config } from "../utils/Config";
import PostList from "../components/PostList";

export default function BlogIndex(props) {
  const { blogPosts } = props;
  return (
    <div>
      <h1>BLOG POSTS</h1>

      <PostList blogPosts={blogPosts} />
    </div>
  );
}

export async function getStaticProps() {
  const blogPosts = await ContentfulApi.getBlogPosts();

  return {
    props: {
      blogPosts,
      title: Config.pageMeta.blogIndex.title,
      description: Config.pageMeta.blogIndex.description,
      url: Config.pageMeta.blogIndex.url,
    },
  };
}
