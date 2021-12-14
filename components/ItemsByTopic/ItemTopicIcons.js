import styles from "@styles/ItemTopicIcons.module.css";

export default function ItemTopicIcons({ topics }) {
  return (
    <ul className={styles.itemTopicIcons}>
      {topics.map((topic) => (
        <li key={topic.sys.id} className={styles.itemTopicIcons__item}>
          <img
            src={topic.icon.url}
            alt={topic.icon.description}
            aria-hidden="true"
            height="24"
            width="24"
          />
        </li>
      ))}
    </ul>
  );
}
