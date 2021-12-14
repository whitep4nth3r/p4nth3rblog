import Link from "next/link";
import Image from "next/image";
import PublishedDateAndReadingTime from "@components/PublishedDateAndReadingTime";
import ItemTopicIcons from "@components/ItemsByTopic/ItemTopicIcons";
import Styles from "@styles/ItemsByTopic.module.css";
import { Config } from "@utils/Config";
import { buildStructuredDataForBlogPost } from "@utils/Tools";

export default function PostByTopic({ item }) {
  return (
    <Link href={`${Config.pageMeta.blogIndex.slug}/${item.slug}`}>
      <a className={Styles.post} aria-label={`Read ${item.title}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: buildStructuredDataForBlogPost(item, {
              isPostList: true,
            }),
          }}
        />

        <span className={Styles.imgContainer}>
          <Image
            src={`${item.featuredImage.url}?w=300`}
            alt={item.featuredImage.description}
            height={item.featuredImage.height}
            width={item.featuredImage.width}
            layout="responsive"
          />
        </span>
        <span className={Styles.inner}>
          <PublishedDateAndReadingTime
            date={item.date}
            readingTime={item.readingTime}
          />
          <h2 className={Styles.title}>{item.title}</h2>
        </span>
        <ItemTopicIcons topics={item.topicsCollection.items} />
      </a>
    </Link>
  );
}
