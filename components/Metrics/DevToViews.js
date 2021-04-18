import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function DevToViews() {
  const { data } = useSWR("/api/devto", fetcher);
  const views = format(data?.views);
  const link = "https://dev.to/whitep4nth3r";
  return <MetricCard header="DEV views" metric={views} link={link} />;
}