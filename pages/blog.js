import Head from 'next/head'
import Link from 'next/link'
import ContentfulApi from '../utils/ContentfulApi';

export default function Blog(props) {
  const { blogPosts } = props
  return (
    <div>
      <Head>
        <title>p4nth3rblog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>p4nth3rblog BLOG</h1>

        <nav>
          <p>Nav links</p>
          <Link href="/">Go to HOME</Link>
        </nav>

        <div>
        {blogPosts.map(item => (
          <div key={item.sys.id}>
          <h2>{item.title}</h2>
          <p>{item.excerpt}</p>
          <Link href={`/blog/${item.slug}`}>Link</Link>
          </div>
        ))}

        </div>
      </main>

    </div>
  )
}

export async function getStaticProps() {
  const blogPosts = await ContentfulApi.getBlogPosts();
  
  return {
    props: {
      blogPosts
    }
  }
}
