import Link from "next/link";
import Styles from "@styles/EventsList.module.css";
import cn from "classnames";

export default function SwitchEventsButton({ type }) {
  const href = type === "past" ? "/events/past" : "/events";

  return (
    <Link href={href}>
      <a
        className={cn(Styles.switchEventsButton, {
          [Styles.switchEventsButton__past]: type === "past",
          [Styles.switchEventsButton__upcoming]: type === "upcoming",
        })}
      >
        View {type} events
      </a>
    </Link>
  );
}
