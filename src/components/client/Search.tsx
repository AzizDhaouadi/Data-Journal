import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

const projectID = import.meta.env.PUBLIC_ALGOLIA_PROJECT_ID;
const key = import.meta.env.PUBLIC_ALGOLIA_API_KEY;

console.log(import.meta.env);

const searchClient = algoliasearch(projectID, key);

function Hit({ hit }: any) {
  return (
    <article>
      <a
        href={hit.path}
        className="hover:text-teal-800 underline decoration-dashed underline-offset-4"
      >
        {hit.article_title}
      </a>

      <p className="text-zinc-500 text-1xl mb-4 text-sm line-clamp-2 text-wrap">
        {hit.publication_date}
      </p>
    </article>
  );
}

export default function SearchComponent() {
  return (
    <InstantSearch searchClient={searchClient} indexName="articlesIndex">
      <div className="relative flex flex-col gap-5 my-5">
        <SearchBox
          classNames={{
            root: "relative w-full max-w-lg",
            input:
              "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
          placeholder="Search articles..."
        />
      </div>
      <h2
        className="text-2xl text-left font-bold my-2 leading-relaxed"
        style={{ color: "#311c3b" }}
      >
        Results
      </h2>
      <Hits
        hitComponent={Hit}
        classNames={{
          root: "flex flex-col mb-10", // Makes <ol> behave like a grid
          list: "flex flex-col gap-9 mb-10", // Adjusts <li> behavior
          item: "", // Styles each <li>
        }}
      />
    </InstantSearch>
  );
}
