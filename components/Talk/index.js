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

      <VideoEmbed
        embedUrl={talk.recording.embedUrl}
        title={talk.recording.title}
      />
      <h2 className={TypographyStyles.heading__h2}>Talk transcript</h2>
      <RichTextPageContent
        richTextBodyField={talk.transcript}
        renderH2Links={true}
      />
    </article>
  );
}
