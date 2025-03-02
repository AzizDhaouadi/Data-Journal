import { useState } from "react";


export default function PostsWithPagination({ pagePosts }: any) {
    const startIndex = 0;
    const [endIndex, setEndIndex] = useState(5);
    let paginatedPosts = pagePosts.slice(startIndex, endIndex);

    function handleUpdatePaginatedPosts() {
        setEndIndex((prev) => prev + 5);
    }

    return (
        <>
            <section className="flex flex-col gap-9 mb-10 mx-auto" style={{ width: "70rem" }}>
                {
                    paginatedPosts.map((post: any) => {
                        return (
                            <article key={post.slug}>
                                <h2 className="text-1xl">
                                    <a
                                        className="hover:text-teal-800 underline decoration-dashed underline-offset-4"
                                        href={`/${post.slug}/`}
                                    >
                                        {post.data.title}
                                    </a>
                                </h2>
                                <i className="text-sm">
                                    {new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }).format(new Date(post.data.date))}
                                </i>
                                <p className="text-zinc-500 text-1xl mb-4 text-sm line-clamp-2 text-wrap">
                                    {post.body}
                                </p>
                            </article>
                        );
                    })
                }
            </section>

            <section className="my-7 flex flex-row justify-center">
                <button className="underline decoration-dashed underline-offset-4 text-2xl dark:text-white hover:text-teal-800" onClick={handleUpdatePaginatedPosts}>
                    {endIndex >= pagePosts.length - 1 ? "No more posts" : "Show more"}
                </button>
            </section>
        </>
    )
}