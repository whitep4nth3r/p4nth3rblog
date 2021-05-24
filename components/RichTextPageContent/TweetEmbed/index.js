import { Tweet } from "react-twitter-widgets";
import Styles from "@styles/RichTextPageContent.module.css";

export default function TweetEmbed({ tweetId }) {
  return (
    <div className={Styles.page__tweet}>
      <Tweet tweetId={tweetId} options={{ theme: "dark" }} />
    </div>
  );
}
