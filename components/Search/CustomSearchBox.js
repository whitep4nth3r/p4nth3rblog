import { connectSearchBox } from "react-instantsearch-dom";
import { useEffect, useState } from "react";
import Styles from "@styles/InstantSearch.module.css";
import { getRandomEntry } from "@whitep4nth3r/get-random-entry";

const placeholders = [
  "web accessibility",
  "css tips",
  "graphql",
  "jamstack",
  "javascript tutorial",
  "next.js",
  "nodejs",
  "serverless functions",
  "twitch streaming",
];

function SearchBox({ currentRefinement, isSearchStalled, refine }) {
  const [placeholder, setPlaceholder] = useState(getRandomEntry(placeholders));

  useEffect(() => {
    setPlaceholder(getRandomEntry(placeholders));
    return () => {};
  }, [setPlaceholder]);

  return (
    <form
      noValidate
      action=""
      role="search"
      className={Styles.instantSearch__form}
    >
      <label className={Styles.instantSearch__label} htmlFor="algolia_search">
        Search articles
      </label>
      <input
        className={Styles.instantSearch__input}
        id="algolia_search"
        type="search"
        placeholder={placeholder}
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);
