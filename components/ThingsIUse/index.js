import Link from "next/link";
import Image from "next/image";
import ThingsIUseStyles from "@styles/ThingsIUse.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import { slugifyString } from "@utils/Tools";
import LinkIcon from "@components/RichTextPageContent/svg/LinkIcon";

function calculateLinkTextAndAttrs(thing) {
  if (thing.customLinkText) {
    return {
      text: thing.customLinkText,
      rel: "nofollow",
    };
  } else if (thing.isAffiliateLink) {
    return {
      text: `View ${thing.name} on Amazon*`,
      rel: "sponsored",
    };
  } else {
    return {
      text: `View ${thing.name} website`,
      rel: "nofollow",
    };
  }
}

export default function ThingsIUse(props) {
  const { things, filter, categories } = props;

  return (
    <section>
      <p className={TypographyStyles.heading__h4}>
        Viewing {things.length} {filter} things
      </p>
      <div className={ThingsIUseStyles.categoryButtonContainer}>
        {categories.map((category) => {
          const isSelected = filter === category;

          const buttonClasses = isSelected
            ? `${ThingsIUseStyles.categoryButton} ${ThingsIUseStyles.categoryButton__selected}`
            : ThingsIUseStyles.categoryButton;

          return (
            <Link href={`/uses/${category}`} key={category} scroll={false}>
              <a className={buttonClasses}>{category}</a>
            </Link>
          );
        })}
      </div>

      <div className={ThingsIUseStyles.thingsContainer}>
        {things.map((thing) => (
          <article key={thing.sys.id} className={ThingsIUseStyles.thing}>
            <div className={ThingsIUseStyles.thing__header}>
              <div className={ThingsIUseStyles.thing__imageContainer}>
                <Image
                  src={thing.image.url}
                  alt={thing.image.description}
                  height={thing.image.height}
                  width={thing.image.width}
                  layout="responsive"
                />
              </div>
              <div>
                <div className={ThingsIUseStyles.thing__nameContainer}>
                  <h2
                    className={ThingsIUseStyles.thing__name}
                    id={`${slugifyString(thing.name)}`}
                  >
                    {thing.name}
                  </h2>
                  <a
                    className={`${RichTextPageContentStyles.page__headerLink} ${TypographyStyles.inlineLink}`}
                    href={`#${slugifyString(thing.name)}`}
                    aria-label={thing.name}
                  >
                    <LinkIcon />
                  </a>
                </div>

                <div className={ThingsIUseStyles.thing__categories}>
                  {thing.categories.map((category) => (
                    <span
                      className={ThingsIUseStyles.thing__categories__cat}
                      key={category}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={ThingsIUseStyles.thing__descriptionContainer}>
              <ReactMarkdown
                children={thing.description}
                renderers={ReactMarkdownRenderers(thing.description)}
              />
            </div>
            {thing.link && (
              <a
                href={thing.link}
                target="_blank"
                rel={calculateLinkTextAndAttrs(thing).rel}
                className={ThingsIUseStyles.thing__link}
              >
                {calculateLinkTextAndAttrs(thing).text}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
