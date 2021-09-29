import ContentfulBlogPost from "@contentful/BlogPost";
import Post from "@components/Post";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";

// add useRouter
import { useRouter } from "next/router";

export default function PostWrapper(props) {
  const { post, preview } = props;

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...because we used fallback: true </div>;
  }

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
  // just generate one slug
  const blogPostSlugs = ["why-i-love-polywork-as-a-developer-advocate"];

  const paths = blogPostSlugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: true, // switch fallback to true
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
