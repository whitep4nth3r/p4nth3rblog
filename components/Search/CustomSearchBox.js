import { connectSearchBox } from "react-instantsearch-dom";
import { getRandomEntry } from "@whitep4nth3r/get-random-entry";
import Styles from "@styles/InstantSearch.module.css";

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

function SearchBox({ refine }) {
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
        placeholder={getRandomEntry(placeholders)}
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);
