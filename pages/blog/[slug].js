import Head from 'next/head'
import Link from 'next/link'
import ContentfulApi from '../../utils/ContentfulApi';

export default function BlogPost(props) {
  const { blogPost } = props;

  return (
    <div>
      <Head>
        <title>p4nth3rblog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>p4nth3rblog BLOG POST</h1>

        <nav>
          <p>Nav links</p>
          <Link href="/">Go to HOME</Link>
        </nav>

        <div>

          <p>THIS IS A BLOG POST PAGE</p>
          <h2>{blogPost.title}</h2>

        </div>
      </main>

    </div>
  )
}

export async function getStaticPaths() {
  const blogPostSlugs = await ContentfulApi.getBlogPostSlugs();

  const paths = blogPostSlugs.map(slug => {
    return { params: { slug } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const blogPost = await ContentfulApi.getBlogPostBySlug(params.slug);

  return {
    props: {
      blogPost
    }
  }
}