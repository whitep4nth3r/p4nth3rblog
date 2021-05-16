import useSWR from "swr";
import { useState, useEffect, useRef } from "react";
import fetcher from "@utils/Fetcher";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function TwitchFollowers() {
  const [hasUpdated, setHasUpdated] = useState(false);
  const { data } = useSWR("/api/twitter", fetcher);
  const followers = format(data?.followers);
  const dataCache = useRef(data?.followers);
  const link = "https://twitter.com/whitep4nth3r";

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
      ariaLabel={`white panther has ${followers} views on Twitter. Visit Twitter page.`}
      type="twitter"
      headerSmall="Followers"
      headerLarge="Twitter Followers"
      metric={followers}
      link={link}
      hasUpdated={hasUpdated}
    />
  );
}
