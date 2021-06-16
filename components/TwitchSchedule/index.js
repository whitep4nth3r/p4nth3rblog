import {
  formatTwitchScheduleTimeSlot,
  formatPublishedDateForTwitchDisplay,
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@utils/Date";
import Styles from "@styles/TwitchSchedule.module.css";
import Twitch from "./svg/twitch";

export default function TwitchSchedule({ schedule }) {
  return (
    <>
      {schedule.data && (
        <div className={Styles.twitchSchedule}>
          <h2 className={Styles.twitchSchedule__title}>
            <span className={Styles.twitchSchedule__titleIcon}>
              <Twitch />
            </span>{" "}
            Catch me on Twitch
          </h2>
          {schedule.data.vacation && (
            <h3 className={Styles.twitchSchedule__vacation}>
              I'm on vacation until{" "}
              {formatPublishedDateForDisplay(schedule.data.vacation.end_time)}.
              See you soon!
            </h3>
          )}
          <div className={Styles.twitchSchedule__grid}>
            {schedule.data.segments.slice(0, 3).map((segment) => (
              <a
                href="https://twitch.tv/whitep4nth3r/schedule"
                target="_blank"
                title="View my Twitch schedule"
                key={segment.id}
                className={Styles.twitchSchedule__item}
              >
                <h3 className={Styles.twitchSchedule__itemTitle}>
                  {segment.title}
                </h3>

                <p className={Styles.twitchSchedule__itemTime}>
                  {formatTwitchScheduleTimeSlot(
                    segment.start_time,
                    segment.end_time,
                  )}
                  <span className={Styles.twitchSchedule__itemTimeZone}>
                    UTC+1
                  </span>
                </p>

                <time
                  className={Styles.twitchSchedule__itemDate}
                  dateTime={formatPublishedDateForDateTime(segment.start_time)}
                >
                  {formatPublishedDateForTwitchDisplay(segment.start_time)}
                </time>

                <p className={Styles.twitchSchedule__itemCat}>
                  {segment.category.name}
                </p>
                {segment.canceled_until && (
                  <p className={Styles.twitchSchedule__itemCancelled}>
                    Cancelled
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
