import TopicsStyles from "@styles/Topics.module.css";
import Link from "next/link";
import Accessibility from "./svg/a11y";
import Career from "./svg/career";
import Contentful from "./svg/contentful";
import Css from "./svg/css";
import Jamstack from "./svg/jamstack";
import JavaScript from "./svg/javascript";
import NodeJs from "./svg/nodejs";
import Serverless from "./svg/serverless";
import Streaming from "./svg/streaming";
import Tutorials from "./svg/tutorials";

function getSvgForTopic(slug) {
  switch (slug) {
    case "a11y":
      return <Accessibility />;
    case "career":
      return <Career />;
    case "contentful":
      return <Contentful />;
    case "css":
      return <Css />;
    case "jamstack":
      return <Jamstack />;
    case "javascript":
      return <JavaScript />;
    case "nodejs":
      return <NodeJs />;
    case "serverless":
      return <Serverless />;
    case "streaming":
      return <Streaming />;
    case "tutorials":
      return <Tutorials />;
    default:
      return null;
  }
}

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
                  {getSvgForTopic(topic.slug)}
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
