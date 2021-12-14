import Styles from "@styles/ItemsByTopic.module.css";
import PostByTopic from "@components/ItemsByTopic/PostByTopic";
import TalkByTopic from "@components/ItemsByTopic/TalkByTopic";

export default function ItemsByTopic(props) {
  const { items } = props;

  return (
    <ol className={Styles.grid}>
      {items.map((item) => {
        const isPost = item.featuredImage;
        const isTalk = item.speakerDeckLink;
        return (
          <li key={item.sys.id}>
            {isPost && <PostByTopic item={item} />}
            {isTalk && <TalkByTopic item={item} />}
          </li>
        );
      })}
    </ol>
  );
}
