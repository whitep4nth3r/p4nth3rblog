import useSWR from "swr";
import { useState, useEffect, useRef } from "react";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function YouTubeViews() {
  const [hasUpdated, setHasUpdated] = useState(false);
  const { data } = useSWR("/api/youtube", fetcher);
  const viewCount = format(data?.viewCount);
  const dataCache = useRef(data?.viewCount);
  const link = "https://www.youtube.com/whitep4nth3r";

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
      header="YouTube views"
      metric={viewCount}
      link={link}
      hasUpdated={hasUpdated}
    />
  );
}
