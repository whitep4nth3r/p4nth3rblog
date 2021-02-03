import Head from "next/head";
import Link from "next/link";
import ContentfulApi from "../../utils/ContentfulApi";
import BlogPost from "../../components/BlogPost";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BlogPostWrapper(props) {
  const { blogPost } = props;

  return (
    <>
      <Head>
        <title>{blogPost.title} | whitep4nth3r.codes</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={blogPost.excerpt} />

        {/* Add OpenGraph meta tags here */}
      </Head>

      <Header />
      <main>
        <nav>
          <p>Nav links</p>
          <Link href="/">Go to HOME</Link>
        </nav>

        <BlogPost blogPost={blogPost} />
      </main>

      <Footer />
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
    },
  };
}
