import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function DevToFollowers() {
  const { data } = useSWR("/api/devto", fetcher);
  const followers = format(data?.followers);
  const link = "https://dev.to/whitep4nth3r";
  return <MetricCard header="DEV followers" metric={followers} link={link} />;
}
