import styles from "@styles/NoEvents.module.css";

export default function NoEvents() {
  return (
    <h2 className={styles.noEvents}>
      There are currently no events scheduled for the future. Please check back
      later!
    </h2>
  );
}
