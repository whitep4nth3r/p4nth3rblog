import GitHubStars from "@components/Metrics/GitHubStars";
import GitHubFollowers from "@components/Metrics/GitHubFollowers";
import TwitchFollowers from "@components/Metrics/TwitchFollowers";
import TwitchViews from "@components/Metrics/TwitchViews";
import TwitterFollowers from "@components/Metrics/TwitterFollowers";
import YouTubeSubs from "@components/Metrics/YouTubeSubs";
import YouTubeViews from "@components/Metrics/YouTubeViews";
import Styles from "@styles/MetricStyles.module.css";

export default function Metrics() {
  return (
    <>
      <p className={Styles.metrics__title}>Updating in real time</p>
      <div className={Styles.metricsGrid}>
        <TwitchFollowers />
        <TwitchViews />
        <YouTubeSubs />
        <YouTubeViews />
        <GitHubFollowers />
        <GitHubStars />
        <TwitterFollowers />
      </div>
    </>
  );
}
