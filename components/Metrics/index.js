import GitHubStars from "@components/Metrics/GitHubStars";
import GitHubFollowers from "@components/Metrics/GitHubFollowers";
import TwitchFollowers from "@components/Metrics/TwitchFollowers";
import TwitchViews from "@components/Metrics/TwitchViews";
import YouTubeSubs from "@components/Metrics/YouTubeSubs";
import YouTubeViews from "@components/Metrics/YouTubeViews";
import DevToViews from "@components/Metrics/DevToViews";
import DevToFollowers from "@components/Metrics/DevToFollowers";
import Styles from "@styles/MetricStyles.module.css";

export default function Metrics() {
  return (
    <div className={Styles.metricsGrid}>
      <TwitchFollowers />
      <TwitchViews />
      <DevToFollowers />
      <DevToViews />
      <GitHubFollowers />
      <GitHubStars />
      <YouTubeSubs />
      <YouTubeViews />
    </div>
  );
}
