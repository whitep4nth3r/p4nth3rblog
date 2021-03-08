import { useState, useEffect } from "react";
import Image from "next/image";
import ThingsIUseStyles from "@styles/ThingsIUse.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import ButtonStyles from "@styles/Button.module.css";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";

function calculateLinkText(thing) {
  //there's actually a new rel value created by Google called "sponsored"
  //for affiliate links
  if (thing.customLinkText) {
    return thing.customLinkText;
  } else if (thing.isAffiliateLink) {
    return "View on Amazon";
  } else {
    return "View website";
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

    let _newFilteredThings = [];

    filteredCategoriesArray.forEach((cat) => {
      things.filter((thing) => {
        if (thing.categories.includes(cat)) {
          _newFilteredThings.push(thing);
        }
      });
    });

    if (_newFilteredThings.length === 0) {
      _newFilteredThings = things;
    }

    setFilteredThings(_newFilteredThings);
  }

  return (
    <section>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setCategoryFilters(category)}
        >
          {filteredCategoriesSet.has(category) && <span>SELECTED</span>}
          {category}
        </button>
      ))}

      {filteredThings.map((thing) => (
        <article key={thing.sys.id}>
          <h2 className={TypographyStyles.heading__h2}>{thing.name}</h2>

          {thing.categories.map((category) => (
            <div key={category}>{category}</div>
          ))}

          <ReactMarkdown
            children={thing.description}
            renderers={ReactMarkdownRenderers(thing.description)}
          />

          {thing.link && (
            <a
              href={thing.link}
              rel="noopener noreferrer"
              className={ButtonStyles.button}
            >
              {calculateLinkText(thing)}
            </a>
          )}

          <Image
            src={thing.image.url}
            alt={thing.image.description}
            height={thing.image.height}
            width={thing.image.width}
            layout="responsive"
          />
        </article>
      ))}
    </section>
  );
}
