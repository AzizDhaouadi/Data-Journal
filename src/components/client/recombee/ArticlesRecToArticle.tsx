import { useState, useEffect } from "react";
import getItemRecommendations from "../../../../public/lib/recommendItemsToItem.js";
import sendClickEvent from "../../../../public/lib/sendClickEvent.js";

type articleRecsProps = {
  itemId: string;
  userId: string;
  count?: number;
};

export default function ArticlesRecToArticle({
  itemId,
  userId,
  count = 5,
}: articleRecsProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendationId, setRecommendationId] = useState<string | null>(null);
  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const recommendations = await getItemRecommendations(
          itemId,
          userId,
          count,
        );
        if (recommendations && recommendations.recomms.length > 0) {
          setArticles(recommendations.recomms);
          setRecommendationId(recommendations.recommId);
          console.log("Fetched recommendations:", recommendations);
        }
      } catch (err: any) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [itemId, userId, count]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (articles.length === 0) {
    return <div>No recommendations available</div>;
  }

  function handleArticleRecommendationClicks(
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
    <div className="w-80 mx-auto flex flex-row gap-4 justify-center flex-wrap">
      {articles.map((article: any) =>
        article.values.article_title && article.values.path ? (
          <a
            key={article.id}
            href={article.values.path}
            onClick={() =>
              handleArticleRecommendationClicks(
                article.values.article_title,
                "People Also Read",
              )
            }
            className="group no-underline flex items-start justify-between gap-3 p-4 bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors duration-150
          group rounded-xl"
          >
            <h3 className="font-manrope font-bold text-sm text-zinc-900 leading-snug line-clamp-2">
              {article.values.article_title}
            </h3>
          </a>
        ) : null,
      )}
    </div>
  );
}
