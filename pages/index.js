import Head from 'next/head';
import Link from 'next/link';
import ContentfulApi from '../utils/ContentfulApi';
import SocialLinks from '../components/SocialLinks';

export default function Home(props) {

  return (
    <div>
      <Head>
        <title>p4nth3rblog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>p4nth3rblog</h1>

        <nav>
          <p>Nav links</p>
          <Link href="/blog">GO TO BLOG</Link>
        </nav>

        <SocialLinks socialLinks={props.socialLinks.data.socialLinkCollection.items} />

      </main>

    </div>
  )
}

export async function getStaticProps() {
  const socialLinks = await ContentfulApi.getSocialLinks();

  return {
    props: {
      socialLinks
    }
  }
}
