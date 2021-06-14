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
     * To add a form label for a11y appropriately
     */
    const searchInput = document.querySelector(".ais-SearchBox-input");
    searchInput.id = "algolia_search";
  });

  function searchBoxOnChange(value) {
    setSearchTerm(value);
  }

  return (
    <>
      {searchClient && (
        <div className="ais-SearchHolder">
          <label className="ais-SearchLabel" htmlFor="algolia_search">
            Search blog posts
          </label>
          <InstantSearch searchClient={searchClient} indexName="p4nth3rblog">
            <SearchBox
              onChange={(e) => searchBoxOnChange(e.target.value)}
              translations={{
                submitTitle: "Submit search",
                resetTitle: "Clear search",
                placeholder: "Search blog posts",
              }}
              onReset={() => {
                searchBoxOnChange("");
              }}
              reset="Clear results"
            />
            {searchTerm.length >= 3 && <Hits hitComponent={Hit} />}
          </InstantSearch>
        </div>
      )}
    </>
  );
}
