import styles from "./VideoEmbed.module.css";

export default function VideoEmbed(props) {
  const { embedUrl, title } = props;

  return (
    <div className={styles.videoEmbed}>
      <iframe
        className={styles.videoEmbed__iframe}
        src={embedUrl}
        height="100%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        title={title}
        allowFullScreen={true}
      />
    </div>
  );
}
