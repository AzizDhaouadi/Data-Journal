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
    <div className="flex flex-col gap-5 justify-center items-center mx-10">
      {articles.map((article: any) =>
        article.values.article_title && article.values.article_title ? (
          <div
            key={article.id}
            className="bg-white rounded-lg w-full overflow-hidden cursor-pointer hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-1 group"
            style={{
              border: "2px solid #9B7FC8",
              cursor: "pointer",
              boxShadow: "8px 8px #9B7FC8",
              transition: "transform .2s ease, box-shadow .2s ease",
            }}
          >
            <div className="p-5">
              <a
                href={article.values.path}
                className="group-hover:text-blue-600 transition-colors"
                onClick={() =>
                  handleArticleRecommendationClicks(
                    article.values.article_title,
                    "People Also Read",
                  )
                }
              >
                <h3
                  className="text-lg font-semibold 
                  text-gray-900 group-hover:text-blue-600 transition-colors 
                  mt-2 mb-2 line-clamp-2"
                >
                  {article.values.article_title}
                </h3>
              </a>
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
}
