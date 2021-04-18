import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function TwitchFollowers() {
  const { data } = useSWR("/api/twitch", fetcher);
  const followers = format(data?.followers);
  const link = "https://twitch.tv/whitep4nth3r";

  return (
    <MetricCard header="Twitch followers" metric={followers} link={link} />
  );
}
