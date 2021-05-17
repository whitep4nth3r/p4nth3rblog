import ContentfulApi from "@contentful/Api";
import ContentfulBlogPost from "@contentful/BlogPost";
import Post from "@components/Post";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";

export default function PostWrapper(props) {
  const { post, preview } = props;

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={post.title}
        description={post.excerpt}
        url={`${Config.pageMeta.blogIndex.url}/${post.slug}`}
        canonical={post.externalUrl ? post.externalUrl : false}
      />

      <ContentWrapper>
        <Post post={post} />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const blogPostSlugs = await ContentfulBlogPost.getAllSlugs();

  const paths = blogPostSlugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await ContentfulBlogPost.getBySlug(params.slug, {
    preview: preview,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      post,
    },
  };
}
