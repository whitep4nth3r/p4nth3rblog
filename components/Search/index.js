import algoliasearch from "algoliasearch/lite";
import { useState, useEffect } from "react";
import {
  InstantSearch,
  // SearchBox,
  // Hits,
  connectSearchBox,
  connectHits,
} from "react-instantsearch-dom";
import Topics from "@components/Topics";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import PublishedDateAndReadingTime from "@components/Post/PublishedDateAndReadingTime";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

const Hits = ({ currentRefinement, hits }) => {
  // this is always undefined
  console.log(currentRefinement);
  return (
    <div className="ais-Hits">
      {hits && (
        <ol className="ais-Hits-list">
          {hits.map((hit) => (
            <li key={hit.objectID} className="ais-Hits-item">
              <PublishedDateAndReadingTime
                date={hit.date}
                readingTime={hit.readingTime}
              />
              <Link href={`/blog/${hit.slug}`}>
                <a className="ais-Hits-link">{hit.title}</a>
              </Link>
              <Topics topics={hit.topics} />
              <div className="ais-Hits-excerpt">
                <ReactMarkdown
                  children={hit.excerpt}
                  renderers={ReactMarkdownRenderers(hit.excerpt)}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

const CustomHits = connectHits(Hits);

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search" className="ais-SearchBox-form">
    <label className="ais-SearchLabel" htmlFor="algolia_search">
      Search articles
    </label>
    <input
      className="ais-SearchBox-input"
      id="algolia_search"
      type="search"
      placeholder="javascript tutorials"
      onChange={(event) => {
        event.currentTarget.value.split("").length > 2 &&
          refine(event.currentTarget.value);
      }}
    />
    <button className="ais-SearchBox-reset" onClick={() => refine("")}>
      Clear results{" "}
    </button>
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default function Search() {
  return (
    <>
      {searchClient && (
        <div className="ais-SearchHolder">
          <InstantSearch searchClient={searchClient} indexName="p4nth3rblog">
            <CustomSearchBox />
            <CustomHits />
          </InstantSearch>
        </div>
      )}
    </>
  );
}
