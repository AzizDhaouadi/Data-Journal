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
    <div className="flex flex-row flex-wrap w-100 gap-4 my-5">
      <h2
        className="text-4xl font-bold dark:text-white my-8"
        style={{ color: "#f15a25" }}
      >
        Your Personalized Feed
      </h2>
      <div className="w-full flex flex-row gap-6 flex-wrap justify-center">
        {articles.map((article) => {
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
                    {article.values.article_title}
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
    </div>
  );
}
