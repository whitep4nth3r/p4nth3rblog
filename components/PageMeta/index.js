import Head from "next/head";
import { Config } from "@utils/Config";

export default function PageMeta(props) {
  const { title, description, url, canonical } = props;
  return (
    <Head>
      <title>
        {title} | {Config.site.title}
      </title>

      <meta name="description" content={description} />

      <meta name="title" content={`${title} | {Config.site.title}`} />

      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />

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
        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;700&amp;display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
