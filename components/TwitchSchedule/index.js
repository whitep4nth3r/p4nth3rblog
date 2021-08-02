import useSWR from "swr";
import fetcher from "@utils/Fetcher";
import {
  formatTwitchScheduleTimeSlot,
  formatDateForTwitchDisplay,
  formatDateForDateTime,
  formatDateForDisplay,
} from "@utils/Date";
import Styles from "@styles/TwitchSchedule.module.css";
import Twitch from "./svg/twitch";
import { useEffect, useState } from "react";

export default function TwitchSchedule({ schedule }) {
  const { data } = useSWR("/api/twitch", fetcher);
  const isLiveOnTwitch = data?.isLiveOnTwitch;

  const [timezone, setTimezone] = useState("Europe/London");
  useEffect(() => {
    const _timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(_timezone);
  }, [setTimezone]);

  return (
    <>
      {schedule.data && (
        <div className={Styles.twitchSchedule}>
          <div className={Styles.twitchSchedule__header}>
            {isLiveOnTwitch && (
              <a
                href="https://twitch.tv/whitep4nth3r"
                target="_blank"
                rel="nofollow noopener"
                className={Styles.twitchSchedule__liveNow}
                aria-label="Come hang out on Twitch. I'm live now!"
              >
                <span className={Styles.twitchSchedule__liveNowText}>
                  Live now
                </span>
              </a>
            )}
            <h2 className={Styles.twitchSchedule__title}>
              <span className={Styles.twitchSchedule__titleIcon}>
                <Twitch />
              </span>{" "}
              Catch me on Twitch{" "}
            </h2>
          </div>
          {schedule.data.vacation && (
            <h3 className={Styles.twitchSchedule__vacation}>
              I'm taking a break until{" "}
              {formatDateForDisplay(schedule.data.vacation.end_time)}. See you
              soon!
            </h3>
          )}
          {!schedule.data.vacation && (
            <div className={Styles.twitchSchedule__grid}>
              {schedule.data.segments.slice(0, 3).map((segment) => (
                <a
                  href="https://twitch.tv/whitep4nth3r/schedule"
                  target="_blank"
                  title="View my Twitch schedule"
                  rel="nofollow noopener"
                  key={segment.id}
                  className={Styles.twitchSchedule__item}
                >
                  <time
                    className={Styles.twitchSchedule__itemDate}
                    dateTime={formatDateForDateTime(segment.start_time)}
                  >
                    {formatDateForTwitchDisplay(segment.start_time)}
                  </time>

                  <p className={Styles.twitchSchedule__itemCat}>
                    {segment.category.name}
                  </p>

                  <p className={Styles.twitchSchedule__itemTime}>
                    {formatTwitchScheduleTimeSlot(
                      segment.start_time,
                      segment.end_time,
                    )}
                    <span className={Styles.twitchSchedule__itemTimeZone}>
                      {timezone}
                    </span>
                  </p>

                  <h3 className={Styles.twitchSchedule__itemTitle}>
                    {segment.title}
                  </h3>
                  {segment.canceled_until && (
                    <p className={Styles.twitchSchedule__itemCancelled}>
                      Cancelled
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
