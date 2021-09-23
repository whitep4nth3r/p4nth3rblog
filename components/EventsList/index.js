import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Styles from "@styles/EventsList.module.css";
import Camera from "./svg/Camera";
import {
  formatDateForDateTime,
  getDayFromTime,
  getDateFromTime,
  getMonthFromTime,
} from "@utils/Date";
import { useEffect, useState } from "react";

function eventMarkdownRenderers(markdown) {
  return {
    strong: ({ children }) => (
      <span className={Styles.eventList__itemDescriptionBold}>{children}</span>
    ),
    paragraph: ({ children }) => (
      <p className={Styles.eventList__itemDescription}>{children}</p>
    ),
    link: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className={Styles.eventList__itemDescriptionLink}
      >
        {children}
      </a>
    ),
  };
}

export default function EventsList({ events }) {
  const [timezone, setTimezone] = useState("Europe/London");
  useEffect(() => {
    const _timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(_timezone);
  }, [setTimezone]);

  // todo - add if virtual

  return (
    <div className={Styles.eventList}>
      {events.map((event) => (
        <div className={Styles.eventList__item} key={event.sys.id}>
          {event.image !== null && (
            <div className={Styles.eventList__itemImageContainer}>
              <Image
                src={event.image.url}
                alt={event.image.description}
                height={event.image.height}
                width={event.image.width}
                layout="responsive"
              />
            </div>
          )}

          <div className={Styles.eventList__itemInner}>
            <div className={Styles.eventList__time}>
              {/* {event.isNext && <span>Up next</span>} */}
              <time
                className={Styles.eventList__dateTime}
                dateTime={formatDateForDateTime(event.date)}
              >
                <span>{getDayFromTime(event.date)}</span>
                <span className={Styles.eventList__dateTime__date}>
                  {getDateFromTime(event.date)}
                </span>
                <span>{getMonthFromTime(event.date)}</span>
              </time>
            </div>

            <div className={Styles.eventList__description}>
              <h2 className={Styles.eventList__itemTitle}>{event.name}</h2>
              <ReactMarkdown
                children={event.description}
                renderers={eventMarkdownRenderers(event.description)}
              />
            </div>
            {event.link && (
              <a
                className={Styles.eventList__itemLink}
                href={event.link}
                target="_blank"
                aria-label={`View details for ${event.name}`}
              >
                View event →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
