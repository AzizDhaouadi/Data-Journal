import CustomizedUserFeed from "../recombee/CustomizedUserFeed";

export default function CustomizedFeed({
  defaultFeed,
}: {
  defaultFeed: any[];
}) {
  const userId =
    window.localStorage["ajs_user_id"]?.replaceAll('"', "") ||
    window.localStorage["ajs_anonymous_id"]?.replaceAll('"', "");

  return <CustomizedUserFeed defaultFeed={defaultFeed} userId={userId} />;
}
