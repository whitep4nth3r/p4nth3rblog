import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import Image from "next/image";
import Styles from "@styles/EventList.module.css";
import { formatDateForEventDisplay } from "@utils/Date";
import { useEffect, useState } from "react";
import ButtonStyles from "@styles/Button.module.css";

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

  return (
    <div className={Styles.eventList}>
      {events.map((event) => (
        <div className={Styles.eventList__item}>
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
          <div>
            <p className={Styles.eventList__itemDate}>
              {formatDateForEventDisplay(event.date, event.timeTbc)} {timezone}
            </p>
            <h2 className={Styles.eventList__itemName}>{event.name}</h2>

            <ReactMarkdown
              children={event.description}
              renderers={eventMarkdownRenderers(event.description)}
            />

            <a
              className={ButtonStyles.button}
              href={event.link}
              aria-label={`View details for ${event.name}`}
            >
              View event
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
