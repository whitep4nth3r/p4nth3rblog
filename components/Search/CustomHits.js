import { connectStateResults } from "react-instantsearch-dom";
import RecentPost from "@components/RecentPostList/RecentPost";
import Styles from "@styles/InstantSearch.module.css";

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  return (
    <div className={Styles.instantSearch__hits}>
      {searchResults?.hits.length === 0 && validQuery && (
        <p className={Styles.instantSearch__noResults}>
          Aw snap! No search results were found. Please try a different search.
        </p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <ol className={Styles.instantSearch__hitsList}>
          {searchResults.hits.map((hit) => {
            const isTalk = hit.watchTime;
            return (
              <li
                key={hit.objectID}
                className={Styles.instantSearch__hitsListItem}
              >
                <RecentPost item={hit} isTalk={isTalk} />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default connectStateResults(Hits);
