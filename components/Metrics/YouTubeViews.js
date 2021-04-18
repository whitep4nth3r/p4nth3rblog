import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function YouTubeViews() {
  const { data } = useSWR("/api/youtube", fetcher);
  const viewCount = format(data?.viewCount);
  const link = "todo";
  return <MetricCard header="YouTube views" metric={viewCount} link={link} />;
}
