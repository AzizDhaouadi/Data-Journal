import CustomizedUserFeed from "../recombee/CustomizedUserFeed";

export default function CustomizedFeed({
  defaultFeed,
}: {
  defaultFeed: any[];
}) {
  let userId = window.localStorage["ajs_user_id"]?.replaceAll('"', "");
  if (userId === undefined || userId === null || userId === "null") {
    userId = window.localStorage["ajs_anonymous_id"]?.replaceAll('"', "");
  }
  console.log(
    "CustomizedFeed userId 1:",
    window.localStorage["ajs_user_id"]?.replaceAll('"', ""),
  );
  console.log(
    "CustomizedFeed userId 2:",
    window.localStorage["ajs_anonymous_id"]?.replaceAll('"', ""),
  );
  return <CustomizedUserFeed defaultFeed={defaultFeed} userId={userId} />;
}
