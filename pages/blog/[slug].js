import ContentfulApi from "../../utils/ContentfulApi";
import Post from "../../components/Post";
import { Config } from "../../utils/Config";
import PageMeta from "../../components/PageMeta";
import MainLayout from "../../layouts/main";

export default function PostWrapper(props) {
  const { blogPost } = props;

  return (
    <MainLayout>
      <PageMeta
        title={blogPost.title}
        description={blogPost.excerpt}
        url={`${Config.pageMeta.blogIndex.url}/${blogPost.slug}`}
      />
      <Post blogPost={blogPost} />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const blogPostSlugs = await ContentfulApi.getBlogPostslugs();

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
    },
  };
}
