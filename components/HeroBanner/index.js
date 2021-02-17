import Image from "next/image";
import Link from "next/link";
import HeroBannerStyles from "./HeroBanner.module.css";

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
    <div
      className={HeroBannerStyles.container}
      style={{ backgroundImage: `url(${image.url})` }}
    >
      {headline && <h1>{headline}</h1>}
      {subHeading && <h2>{subHeading}</h2>}
      {internalLink && ctaText && (
        <Link href={internalLink}>
          <a>{ctaText}</a>
        </Link>
      )}
      {externalLink && ctaText && (
        <a href={externalLink} rel="noopener noreferrer" target="_blank">
          {ctaText}
        </a>
      )}
      {/* <Image
        src={image.url}
        // height={image.height}
        // width={image.width}
        alt={image.description}
        layout="fill"
      /> */}
    </div>
  );
}
