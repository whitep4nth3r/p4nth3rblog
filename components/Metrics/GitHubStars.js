import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import MetricCard from "@components/Metrics/MetricCard";

export default function GitHubStars() {
  const { data } = useSWR("/api/github", fetcher);
  const stars = data?.stars;
  const link = "https://github.com/whitep4nth3r";

  return <MetricCard header="GitHub stars" metric={stars} link={link} />;
}
