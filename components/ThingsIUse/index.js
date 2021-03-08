import { useState } from "react";
import Image from "next/image";
import ThingsIUseStyles from "@styles/ThingsIUse.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import Check from "@components/ThingsIUse/svg/Check";
import Filter from "@components/ThingsIUse/svg/Filter";
import { slugifyString } from "@utils/Tools";
import LinkIcon from "@components/RichTextPageContent/svg/LinkIcon";

function calculateLinkTextAndAttrs(thing) {
  if (thing.customLinkText) {
    return { text: thing.customLinkText, rel: "nofollow" };
  } else if (thing.isAffiliateLink) {
    return { text: "View on Amazon", rel: "sponsored" };
  } else {
    return { text: "View website", rel: "nofollow" };
  }
}

function calculateCategories(things) {
  const categorySet = new Set();

  things.forEach((thing) => {
    thing.categories.forEach((category) => {
      categorySet.add(category);
    });
  });

  return Array.from(categorySet);
}

export default function ThingsIUse(props) {
  const { things } = props;
  const categories = calculateCategories(things);
  const [filteredCategoriesSet, setFilteredCategoriesSet] = useState(new Set());
  const [filteredThings, setFilteredThings] = useState(things);
  const [displayTotal, setDisplayTotal] = useState(things.length);

  function setCategoryFilters(category) {
    const _filteredCategoriesSet = new Set([...filteredCategoriesSet]);

    if (_filteredCategoriesSet.has(category)) {
      _filteredCategoriesSet.delete(category);
    } else {
      _filteredCategoriesSet.add(category);
    }

    setFilteredCategoriesSet(_filteredCategoriesSet);
    updateFilteredThings(_filteredCategoriesSet);
  }

  function updateFilteredThings(_filteredCategoriesSet) {
    const filteredCategoriesArray = Array.from(_filteredCategoriesSet);
    let _newFilteredThings = new Set();

    filteredCategoriesArray.forEach((cat) => {
      things.filter((thing) => {
        if (thing.categories.includes(cat)) {
          _newFilteredThings.add(thing);
        }
      });
    });

    let newFilteredThingsArray = Array.from(_newFilteredThings);

    if (newFilteredThingsArray.length === 0) {
      newFilteredThingsArray = things;
    }

    setFilteredThings(newFilteredThingsArray);
    setDisplayTotal(newFilteredThingsArray.length);
  }

  return (
    <section>
      <p className={TypographyStyles.heading__h4}>
        <span className={ThingsIUseStyles.filterIconContainer}>
          <Filter />
        </span>
        Filter results | Viewing {displayTotal} / {things.length}
      </p>
      <div className={ThingsIUseStyles.categoryButtonContainer}>
        {categories.map((category) => {
          const isSelected = filteredCategoriesSet.has(category);

          const buttonClasses = isSelected
            ? `${ThingsIUseStyles.categoryButton} ${ThingsIUseStyles.categoryButton__selected}`
            : ThingsIUseStyles.categoryButton;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilters(category)}
              className={buttonClasses}
            >
              {isSelected && (
                <span
                  className={ThingsIUseStyles.categoryButton__iconContainer}
                >
                  <Check />
                </span>
              )}
              {category}
            </button>
          );
        })}
      </div>

      <div className={ThingsIUseStyles.thingsContainer}>
        {filteredThings.map((thing) => (
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
