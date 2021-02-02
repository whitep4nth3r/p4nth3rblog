import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
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
