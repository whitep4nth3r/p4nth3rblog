import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function YouTubeSubs() {
  const { data } = useSWR("/api/youtube", fetcher);
  const subscriberCount = format(data?.subscriberCount);
  const link = "todo";
  return (
    <MetricCard
      header="YouTube subscribers"
      metric={subscriberCount}
      link={link}
    />
  );
}
