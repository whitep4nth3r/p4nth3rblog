import Head from "next/head";
import Link from "next/link";
import ContentfulApi from "../utils/ContentfulApi";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogIndex(props) {
  const { blogPosts } = props;
  return (
    <>
      <Head>
        <title>Blog | whitep4nth3r.codes</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="This is a test" />

        {/* Add OpenGraph meta tags here */}
      </Head>

      <Header />

      <main>
        {blogPosts.map((item) => (
          <div key={item.sys.id}>
            <h2>{item.title}</h2>
            <p>{item.excerpt}</p>
            <Link href={`/blog/${item.slug}`}>Link</Link>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const blogPosts = await ContentfulApi.getBlogPosts();

  return {
    props: {
      blogPosts,
    },
  };
}
