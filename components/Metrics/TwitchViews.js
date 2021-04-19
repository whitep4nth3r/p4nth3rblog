import useSWR from "swr";
import { useState, useEffect, useRef } from "react";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function TwitchViews() {
  const [hasUpdated, setHasUpdated] = useState(false);
  const { data } = useSWR("/api/twitch", fetcher);
  const views = format(data?.views);
  const dataCache = useRef(data?.views);
  const link = "https://twitch.tv/whitep4nth3r";

  useEffect(() => {
    if (data?.followers !== dataCache.current) {
      dataCache.current = data?.views;
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
      header="Twitch views"
      metric={views}
      link={link}
      hasUpdated={hasUpdated}
    />
  );
}
