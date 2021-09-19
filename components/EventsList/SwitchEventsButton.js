import Link from "next/link";
import Styles from "@styles/EventsList.module.css";

export default function SwitchEventsButton({ href, text }) {
  return (
    <Link href={href}>
      <a className={Styles.switchEventsButton}>{text}</a>
    </Link>
  );
}
