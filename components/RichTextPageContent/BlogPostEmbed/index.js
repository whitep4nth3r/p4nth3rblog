import Link from "next/link";
import Image from "next/image";
import PublishedDateAndReadingTime from "@components/PublishedDateAndReadingTime";
import Styles from "@styles/BlogPostEmbed.module.css";
import { Config } from "@utils/Config";

export default function BlogPostEmbed({ item, renderNativeImg }) {
  return (
    <Link href={`${Config.pageMeta.blogIndex.slug}/${item.slug}`}>
      <a className={Styles.post} aria-label={`Read ${item.title}`}>
        <span className={Styles.imgContainer}>
          {renderNativeImg && (
            <img
              src={`${item.featuredImage.url}?w=500`}
              alt={item.featuredImage.description}
              height={item.featuredImage.height}
              width={item.featuredImage.width}
            />
          )}

          {!renderNativeImg && (
            <Image
              src={`${item.featuredImage.url}?w=500`}
              alt={item.featuredImage.description}
              height={item.featuredImage.height}
              width={item.featuredImage.width}
              layout="responsive"
            />
          )}
        </span>

        <span className={Styles.inner}>
          <PublishedDateAndReadingTime
            date={item.date}
            readingTime={item.readingTime}
          />
          <h2 className={Styles.title}>{item.title}</h2>
        </span>
      </a>
    </Link>
  );
}
