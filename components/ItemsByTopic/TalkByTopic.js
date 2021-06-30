import Link from "next/link";
import Image from "next/image";
import PublishedDateAndReadingTime from "@components/PublishedDateAndReadingTime";
import Styles from "@styles/ItemsByTopic.module.css";
import { Config } from "@utils/Config";

export default function TalkByTopic({ item }) {
  return (
    <Link href={`${Config.pageMeta.talksIndex.slug}/${item.slug}`}>
      <a className={Styles.post} aria-label={`Read ${item.title}`}>
        <span className={Styles.imgContainer}>
          <Image
            src={`${item.speakerDeckLink.image.url}?w=300`}
            alt={item.speakerDeckLink.image.description}
            height={item.speakerDeckLink.image.height}
            width={item.speakerDeckLink.image.width}
            layout="responsive"
          />
        </span>

        <span className={Styles.inner}>
          <PublishedDateAndReadingTime
            date={item.date}
            readingTime={item.watchTime}
            isTalk={true}
          />
          <h2 className={Styles.title}>{item.title}</h2>
        </span>
      </a>
    </Link>
  );
}
