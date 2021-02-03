import Head from 'next/head'
import Link from 'next/link'
import ContentfulApi from '../../utils/ContentfulApi';
import BlogPost from '../../components/BlogPost';

export default function BlogPostWrapper(props) {
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

        <BlogPost blogPost={blogPost} />
       
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