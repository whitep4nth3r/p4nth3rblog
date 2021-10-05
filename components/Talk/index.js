import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Topics from "@components/Topics";
import RichTextPageContent from "@components/RichTextPageContent";
import VideoEmbed from "@components/VideoEmbed";
import PublishedDateAndReadingTime from "@components/PublishedDateAndReadingTime";
import Image from "next/image";
import Styles from "@styles/Talk.module.css";

export default function Talk(props) {
  const { talk } = props;

  return (
    <article className={RichTextPageContentStyles.page}>
      <Topics topics={talk.topicsCollection.items} />
      <h1 className={TypographyStyles.heading__h1}>{talk.title}</h1>
      <PublishedDateAndReadingTime
        date={talk.date}
        readingTime={talk.watchTime}
        isTalk={true}
      />

      <h2 className={TypographyStyles.heading__h2}>Slides</h2>

      <div className={Styles.talk__speakerDeck__img}>
        <Image
          src={talk.speakerDeckLink.image.url}
          alt={talk.speakerDeckLink.image.description}
          height={talk.speakerDeckLink.image.height}
          width={talk.speakerDeckLink.image.width}
          layout="responsive"
        />
      </div>
      <a
        className={`${Styles.talk__speakerDeck__link} ${TypographyStyles.inlineLink}`}
        href={talk.speakerDeckLink.link}
        target="_blank"
      >
        View on Speaker Deck
      </a>

      <hr className={RichTextPageContentStyles.page__hr} />

      <h2 className={TypographyStyles.heading__h2}>Recording</h2>

      <VideoEmbed
        embedUrl={talk.recording.embedUrl}
        title={talk.recording.title}
      />

      <hr className={RichTextPageContentStyles.page__hr} />

      <h2 className={TypographyStyles.heading__h2}>Abstract</h2>

      <RichTextPageContent
        richTextBodyField={talk.abstract}
        renderH2Links={false}
      />

      <hr className={RichTextPageContentStyles.page__hr} />

      <h2 className={TypographyStyles.heading__h2}>Transcript</h2>
      <RichTextPageContent
        richTextBodyField={talk.transcript}
        renderH2Links={true}
      />
    </article>
  );
}
