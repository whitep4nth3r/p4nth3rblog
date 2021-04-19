import useSWR from "swr";
import { useState, useEffect, useRef } from "react";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function GitHubStars() {
  const [hasUpdated, setHasUpdated] = useState(false);
  const { data } = useSWR("/api/github", fetcher);
  const stars = format(data?.stars);
  const dataCache = useRef(data?.stars);
  const link = "https://github.com/whitep4nth3r";

  useEffect(() => {
    if (data?.followers !== dataCache.current) {
      dataCache.current = data?.followers;
      setHasUpdated(true);

      setTimeout(() => {
        setHasUpdated(false);
      }, 3000);
    }
    return () => {
      setHasUpdated(false);
    };
  }, [data]);

  return (
    <MetricCard
      header="GitHub stars"
      metric={stars}
      link={link}
      hasUpdated={hasUpdated}
    />
  );
}
