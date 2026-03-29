type ArticleProps = {
  article_title: string;
  article_pathname: string;
};

type ArticlesFeedProps = {
  articles: ArticleProps[];
};

export default function DefaultFeed({ articles }: ArticlesFeedProps) {
  return (
    <div className="w-full flex flex-row gap-4 justify-center flex-wrap">
      {articles.map((article, index) => {
        return article.article_title && article.article_pathname ? (
          <a
            key={article.article_title}
            href={article.article_pathname}
            rel="noopener noreferrer"
            className="block w-80 group"
          >
            <article
              className="
          relative h-52 p-6 bg-white border border-zinc-200
          flex flex-col justify-between
          transition-all duration-200
          hover:border-zinc-900 hover:bg-zinc-50
          group rounded-xl
        "
            >
              {/* Index number */}
              <span className="font-dm-mono text-xs text-zinc-300 tabular-nums group-hover:text-[#E8522A]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-4">
                <h2
                  className="
              font-manrope font-bold text-base text-zinc-900 leading-snug line-clamp-3
              group-hover:text-zinc-900 transition-colors
            "
                >
                  {article.article_title}
                </h2>

                <span
                  className="
              font-dm-mono text-xs font-medium text-zinc-400
              flex items-center gap-1.5
              group-hover:text-[#E8522A] transition-colors duration-200
            "
                >
                  Read article
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </article>
          </a>
        ) : null;
      })}
    </div>
  );
}
