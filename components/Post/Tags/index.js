import styles from "./Tags.module.css";

export default function Tags(props) {
  const { tags } = props;

  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li className={styles.tags__tag} key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
