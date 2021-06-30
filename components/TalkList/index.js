import Link from "next/link";
import Image from "next/image";
import Topics from "@components/Topics";
import Pagination from "@components/Pagination";
import ContentListStyles from "@styles/ContentList.module.css";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import TalkStyles from "@styles/Talk.module.css";
import { Config } from "@utils/Config";

export default function TalkList(props) {
  const { talks, currentPage, totalPages } = props;
  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
    <>
      <ol className={ContentListStyles.contentList}>
        {talks.map((talk) => (
          <li key={talk.sys.id}>
            <article className={ContentListStyles.contentList__post}>
              <Link href={`${Config.pageMeta.talksIndex.slug}/${talk.slug}`}>
                <a className={ContentListStyles.contentList__titleLink}>
                  <h2 className={ContentListStyles.contentList__title}>
                    {talk.title}
                  </h2>
                </a>
              </Link>

              <div className={TalkStyles.talk__speakerDeck__img}>
                <Image
                  src={talk.speakerDeckLink.image.url}
                  alt={talk.speakerDeckLink.image.description}
                  height={talk.speakerDeckLink.image.height}
                  width={talk.speakerDeckLink.image.width}
                  layout="responsive"
                />
              </div>

              <Topics topics={talk.topicsCollection.items} />
              <div className={ContentListStyles.contentList__excerpt}>
                <ReactMarkdown
                  children={talk.excerpt}
                  renderers={ReactMarkdownRenderers(talk.excerpt)}
                />
              </div>
              <Link href={`/talks/${talk.slug}`}>
                <a
                  className={ContentListStyles.contentList__readMoreLink}
                  aria-label={`View ${talk.title}`}
                >
                  View talk →
                </a>
              </Link>
            </article>
          </li>
        ))}
      </ol>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </>
  );
}
