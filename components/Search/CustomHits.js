import { connectStateResults } from "react-instantsearch-dom";
import RecentPost from "@components/RecentPostList/RecentPost";
import Styles from "@styles/InstantSearch.module.css";

function Hits(props) {
  const { searchState, searchResults } = props;
  const validQuery = searchState.query?.length >= 3;
  console.log(searchResults);

  return (
    <div className={Styles.instantSearch__hits}>
      {searchResults?.hits && validQuery && (
        <ol className={Styles.instantSearch__hitsList}>
          {searchResults.hits.map((hit) => (
            <li
              key={hit.objectID}
              className={Styles.instantSearch__hitsListItem}
            >
              <RecentPost post={hit} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default connectStateResults(Hits);