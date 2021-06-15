import { connectSearchBox } from "react-instantsearch-dom";
import Styles from "@styles/InstantSearch.module.css";

function SearchBox({ currentRefinement, isSearchStalled, refine }) {
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
        placeholder="javascript tutorials"
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);
