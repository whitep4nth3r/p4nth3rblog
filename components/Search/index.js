import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import Styles from "@styles/InstantSearch.module.css";
import CustomHits from "./CustomHits";
import CustomSearchBox from "./CustomSearchBox";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

export default function Search() {
  return (
    <>
      {searchClient && (
        <div className={Styles.instantSearch}>
          <InstantSearch searchClient={searchClient} indexName="p4nth3rblog">
            <CustomSearchBox />
            <CustomHits />
          </InstantSearch>
        </div>
      )}
    </>
  );
}
