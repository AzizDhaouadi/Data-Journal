import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

const searchClient = algoliasearch('NUO1HZDYXK', 'a0d18a8346dbfba3827ff542bda42dbb');

function Hit({ hit }: any) {
    return (
        <article>
            <a
                href={hit.path}
                className="hover:text-teal-800 underline decoration-dashed underline-offset-4"
            >
                {hit.article_title}
            </a>

            <p className="text-zinc-500 text-1xl mb-4 text-sm line-clamp-2 text-wrap">{hit.publication_date}</p>

        </article>
    )
}


export default function SearchComponent() {
    return (
        <InstantSearch searchClient={searchClient} indexName="articlesIndex">
            <div className="relative my-5">
                <SearchBox classNames={{
                    root: "relative w-full max-w-lg",
                    input: "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500",
                    submitIcon: "hidden",
                    resetIcon: "hidden",
                }} placeholder="Search articles..." />
            </div>
            <section className="flex flex-col gap-3 mb-10 mx-auto">
                <h2 className='text-2xl text-purple-500 text-left font-bold my-2 leading-relaxed'>Results:</h2>
                <Hits hitComponent={Hit} />
            </section>
        </InstantSearch>
    );
}
