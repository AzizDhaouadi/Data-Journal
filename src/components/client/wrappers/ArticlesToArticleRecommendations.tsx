import ArticlesRecToArticle from "../recombee/ArticlesRecToArticle";
import md5hashes from "../../../md5hashes.json";

export default function ArticlesToArticlesRecommendations() {
  const userId =
    window.localStorage["ajs_user_id"]?.replaceAll('"', "") ||
    window.localStorage["ajs_anonymous_id"]?.replaceAll('"', "");
  const currentWindowPathname = window.location.pathname;
  const targetItemId =
    md5hashes.catalog.items.find((item) => item.path === currentWindowPathname)
      ?.itemID || "";
  return (
    <ArticlesRecToArticle itemId={targetItemId} userId={userId} count={5} />
  );
}
