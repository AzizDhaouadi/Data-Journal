type ArticleProps = {
  article_title: string;
  article_pathname: string;
};

type ArticlesFeedProps = {
  articles: ArticleProps[];
};

export default function DefaultFeed({ articles }: ArticlesFeedProps) {
  return (
    <div className="w-full flex flex-row gap-6 flex-wrap justify-center">
      {articles.map((article, index) => {
        return article.article_title && article.article_pathname ? (
          <a
            key={index}
            href={article.article_pathname}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-80 group"
          >
            <article
              className="rounded-2xl bg-white p-8 h-48 flex flex-col justify-between 
                hover:border-blue-500 hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-1"
              style={{
                border: "2px solid #9B7FC8",
                boxShadow: "8px 8px #9B7FC8",
                cursor: "pointer",
              }}
            >
              <div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-3 leading-tight">
                  {article.article_title}
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-500 transition-colors">
                  Read article →
                </span>
              </div>
            </article>
          </a>
        ) : null;
      })}
    </div>
  );
}
