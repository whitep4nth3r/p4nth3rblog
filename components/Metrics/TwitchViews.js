import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function TwitchViews() {
  const { data } = useSWR("/api/twitch", fetcher);
  const views = format(data?.views);
  const link = "https://twitch.tv/whitep4nth3r";

  return <MetricCard header="Twitch views" metric={views} link={link} />;
}
