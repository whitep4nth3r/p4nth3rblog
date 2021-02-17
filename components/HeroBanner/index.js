import Image from "next/image";
import Link from "next/link";
import HeroBannerStyles from "./HeroBanner.module.css";
import ButtonStyles from "@styles/Button.module.css";

export default function HeroBanner(props) {
  const {
    headline,
    subHeading,
    ctaText,
    internalLink,
    externalLink,
    image,
  } = props.data;

  return (
    <section
      className={HeroBannerStyles.heroBanner}
      style={{ backgroundImage: `url(${image.url})` }} //todo - optimise with contentful api
    >
      <div className={HeroBannerStyles.heroBanner__overlay}></div>
      <div className={HeroBannerStyles.heroBanner__inner}>
        <div className={HeroBannerStyles.heroBanner__textContainer}>
          {headline && (
            <h1 className={HeroBannerStyles.heroBanner__headline}>
              {headline}
            </h1>
          )}
          {subHeading && (
            <h2 className={HeroBannerStyles.heroBanner__subheading}>
              {subHeading}
            </h2>
          )}
        </div>
        {internalLink && ctaText && (
          <div className={HeroBannerStyles.heroBanner__ctaContainer}>
            <Link href={internalLink}>
              <a className={ButtonStyles.button}>{ctaText}</a>
            </Link>
          </div>
        )}
        {externalLink && ctaText && (
          <div className={HeroBannerStyles.heroBanner__ctaContainer}>
            <a
              href={externalLink}
              className={ButtonStyles.button}
              rel="noopener noreferrer"
              target="_blank"
            >
              {ctaText}
            </a>
          </div>
        )}
        {/* <Image
        src={image.url}
        // height={image.height}
        // width={image.width}
        alt={image.description}
        layout="fill"
      /> */}
      </div>
    </section>
  );
}
