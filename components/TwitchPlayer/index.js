import styles from "./TwitchPlayer.module.css";

export default function TwitchPlayer() {
  return (
    <div className={styles.twitchPlayer}>
      <iframe
        className={styles.twitchPlayer__iframe}
        src={`https://player.twitch.tv/?channel=whitep4nth3r&parent=${process.env.NEXT_PUBLIC_DOMAIN}`}
        height="100%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        title="whitep4nth3r on Twitch"
        allowFullScreen={true}
      />
    </div>
  );
}
