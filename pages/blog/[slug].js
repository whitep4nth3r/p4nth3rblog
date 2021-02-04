import ContentfulApi from "../../utils/ContentfulApi";
import BlogPost from "../../components/BlogPost";
import { Config } from "../../utils/Config";

export default function BlogPostWrapper(props) {
  const { blogPost } = props;

  return (
    <>
      <BlogPost blogPost={blogPost} />
    </>
  );
}

export async function getStaticPaths() {
  const blogPostSlugs = await ContentfulApi.getBlogPostSlugs();

  const paths = blogPostSlugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogPost = await ContentfulApi.getBlogPostBySlug(params.slug);

  return {
    props: {
      blogPost,
      title: blogPost.title,
      description: blogPost.excerpt,
      url: `${Config.pageMeta.blogIndex.url}/${blogPost.slug}`,
    },
  };
}
