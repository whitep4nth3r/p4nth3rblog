import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import { useState, useEffect, useRef } from "react";
import format from "comma-number";
import MetricCard from "@components/Metrics/MetricCard";

export default function TwitchFollowers() {
  const [hasUpdated, setHasUpdated] = useState(false);
  const { data } = useSWR("/api/twitch", fetcher);
  const followers = format(data?.followers);
  const dataCache = useRef(data?.followers);
  const link = "https://twitch.tv/whitep4nth3r";

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
      ariaLabel={`white panther has ${followers} followers on Twitch. Visit Twitch page.`}
      type="twitch"
      headerSmall="Followers"
      headerLarge="Twitch Followers"
      metric={followers}
      link={link}
      hasUpdated={hasUpdated}
    />
  );
}
