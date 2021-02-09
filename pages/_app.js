import App from "next/app";
import Head from "next/head";
import MainLayout from "../layouts/main";
import { Config } from "../utils/Config";

class MyBlogWebsite extends App {
  render() {
    const { Component, pageProps } = this.props;
    const { pageContent, url } = pageProps;

    return (
      <>
        <Head>
          <title>
            {pageContent.title} | {Config.site.title}
          </title>

          <meta name="description" content={pageContent.description} />

          <meta name="title" content={pageContent.title} />
          <meta property="og:title" content={pageContent.title} />
          <meta property="twitter:title" content={pageContent.title} />

          <meta name="description" content={pageContent.description} />
          <meta property="og:description" content={pageContent.description} />
          <meta
            property="twitter:description"
            content={pageContent.description}
          />

          <meta property="og:url" content={url} />
          <meta property="twitter:url" content={url} />

          {/* <meta property="og:image" content={image} />
          <meta property="twitter:image" content={image} /> */}

          {/* <meta property="og:image:alt" content={imageAlt} />
          <meta property="twitter:image:alt" content={imageAlt} /> */}

          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f111a" />
          <meta name="msapplication-TileColor" content="#b91d47" />
          <meta name="theme-color" content="#f11012" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </>
    );
  }
}

export default MyBlogWebsite;
