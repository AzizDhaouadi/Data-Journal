import { useState, useEffect } from "react";
import customizedHomePage from "../../../../public/lib/customizedHomePage.js";
import sendClickEvent from "../../../../public/lib/sendClickEvent.js";
import DefaultFeed from "../Default/DefaultFeed.js";

type ArticleProps = {
  article_title: string;
  article_pathname: string;
};

type customizedHomePageProps = {
  userId: string;
  count?: number;
  recommendationId?: string;
  defaultFeed: ArticleProps[];
};

export default function CustomizedUserFeed({
  userId,
  count,
  defaultFeed,
}: customizedHomePageProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendationId, setRecommendationId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomizedFeed() {
      try {
        setLoading(true);
        const userFeed = await customizedHomePage(userId, count);
        setArticles(userFeed.recomms);
        setRecommendationId(userFeed.recommId);
      } catch (err: any) {
        console.error("Error fetching customized user feed:", err);
        setError("Failed to load customized feed.");
      } finally {
        setLoading(false);
      }
    }
    fetchCustomizedFeed();
  }, [userId, count]);

  if (loading) {
    return <div>Loading customized feed...</div>;
  }

  if (error) {
    return <DefaultFeed articles={defaultFeed} />;
  }

  if (articles.length === 0) {
    return <DefaultFeed articles={defaultFeed} />;
  }

  function handleArticleRecommendationClicks(
    itemId: string,
    articleTitle: string,
    scenario: string,
  ) {
    sendClickEvent(userId, itemId, recommendationId);
    window.analytics.track("Clicked Article Recommendation", {
      article_title: articleTitle,
      scenario: scenario,
    });
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 my-5">
      <h2
        className="text-4xl font-bold dark:text-white my-8"
        style={{ color: "#f15a25" }}
      >
        Your Personalized Feed
      </h2>
      <div className="w-full flex flex-row gap-4 justify-center flex-wrap">
        {articles.map((article, index) => {
          return article.values.article_title && article.values.path ? (
            <a
              key={article.id}
              href={article.values.path}
              rel="noopener noreferrer"
              className="block w-80 group"
              onClick={() =>
                handleArticleRecommendationClicks(
                  article.id,
                  article.values.article_title,
                  "Personalized Feed",
                )
              }
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
                    {article.values.article_title}
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
    </div>
  );
}
