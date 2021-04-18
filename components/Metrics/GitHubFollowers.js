import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function GitHubFollowers() {
  const { data } = useSWR("/api/github", fetcher);
  const followers = format(data?.followers);
  const link = "https://github.com/whitep4nth3r";

  return (
    <MetricCard header="GitHub followers" metric={followers} link={link} />
  );
}
