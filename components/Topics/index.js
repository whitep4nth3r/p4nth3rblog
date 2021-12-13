import TopicsStyles from "@styles/Topics.module.css";
import Link from "next/link";

export default function Topics(props) {
  const { topics, selected, scroll } = props;
  const linkClickScroll = scroll !== undefined ? scroll : true;

  return (
    <ul className={TopicsStyles.topics}>
      {topics.map((topic) => {
        const isSelectedClass =
          selected !== undefined && topic.slug === selected.slug
            ? TopicsStyles.topics__topicSelected
            : "";

        return (
          <li className={TopicsStyles.topics__topic} key={topic.sys.id}>
            <Link href={`/topics/${topic.slug}`} scroll={linkClickScroll}>
              <a
                className={`${TopicsStyles.topics__topicLink} ${isSelectedClass}`}
                aria-label={`View all ${topic.name} articles`}
              >
                <span className={TopicsStyles.topics__topicSvgContainer}>
                  {topic.icon && (
                    <img
                      aria-hidden="true"
                      src={topic.icon.url}
                      alt={topic.icon.description}
                      height="16"
                      width="16"
                    />
                  )}
                </span>
                {topic.name}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
