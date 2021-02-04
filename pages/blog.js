import Link from "next/link";
import ContentfulApi from "../utils/ContentfulApi";
import { Config } from "../utils/Config";

export default function BlogIndex(props) {
  const { blogPosts } = props;
  return (
    <div>
      <h1>BLOG POSTS</h1>
      {blogPosts.map((item) => (
        <div key={item.sys.id}>
          <h2>{item.title}</h2>
          <p>{item.excerpt}</p>
          <Link href={`/blog/${item.slug}`}>Link</Link>
        </div>
      ))}
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
