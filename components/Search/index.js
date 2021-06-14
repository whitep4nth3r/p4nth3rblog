import algoliasearch from "algoliasearch/lite";
import { useState, useEffect } from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import Topics from "@components/Topics";
import Link from "next/link";

/**
 * Styles are in main.styles.json
 */

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

const Hit = (props) => {
  return (
    <>
      <Link href={`/blog/${props.hit.slug}`}>
        <a className="ais-Hits-link">{props.hit.title}</a>
      </Link>
      <Topics topics={props.hit.topics} />
    </>
  );
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    /**
     * Cannot access the clear button onClick as it is dynamically generated
     * by the <InstantSearch /> component, so we fallback to pure JS
     */
    const clearButton = document.querySelector(".ais-SearchBox-reset");
    clearButton.addEventListener("click", () => {
      clearSearchBox();
    });
  });

  function searchBoxOnChange(value) {
    setSearchTerm(value);
  }

  function clearSearchBox() {
    setSearchTerm("");
  }

  return (
    <>
      {searchClient && (
        <div className="ais-SearchHolder">
          <InstantSearch searchClient={searchClient} indexName="p4nth3rblog">
            <SearchBox onChange={(e) => searchBoxOnChange(e.target.value)} />
            {searchTerm.length >= 3 && <Hits hitComponent={Hit} />}
          </InstantSearch>
        </div>
      )}
    </>
  );
}
