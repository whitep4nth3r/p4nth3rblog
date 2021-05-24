import useSWR from "swr";
import { useState, useEffect, useRef } from "react";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function YouTubeSubs() {
  const [hasUpdated, setHasUpdated] = useState(false);
  const { data } = useSWR("/api/youtube", fetcher);
  const subscriberCount = format(data?.subscriberCount);
  const dataCache = useRef(data?.subscriberCount);
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
      ariaLabel={`white panther has ${subscriberCount} subscribers on YouTube. Visit YouTube channel.`}
      type="youtube"
      headerSmall="Subs"
      headerLarge="Youtube Subs"
      metric={subscriberCount}
      link={link}
      hasUpdated={hasUpdated}
    />
  );
}
