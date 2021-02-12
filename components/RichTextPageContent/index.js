import dynamic from "next/dynamic";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./RichTextPageContent.module.css";

const DynamicCodeBlock = dynamic(() => import("./CodeBlock"), {
  ssr: false,
});

const DynamicVideoEmbed = dynamic(() => import("./VideoEmbed"), {
  ssr: false,
});

export function getRenderOptions(links) {
  const assetBlockMap = links?.assets?.block?.reduce((map, asset) => {
    map.set(asset.sys.id, asset);
    return map;
  }, new Map());

  const entryBlockMap = links?.entries?.block?.reduce((map, entry) => {
    map.set(entry.sys.id, entry);
    return map;
  }, new Map());

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <b className={[styles.page__copy, styles.page__copy__bold]}>{text}</b>
      ),
      //do global link style?
    },

    renderNode: {
      [BLOCKS.HR]: (text) => <hr className={styles.page__hr} />,
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={styles.page__h1}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={styles.page__h2}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={styles.page__h3}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={styles.page__h4}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className={styles.page__h5}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className={styles.page__h6}>{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={styles.page__copy}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={styles.page__blockquote}>{children}</blockquote>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={styles.page__ul}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className={styles.page__ol}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className={styles.page__li}>{children}</li>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const entry = entryBlockMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "VideoEmbed":
            const { embedUrl, title, type } = entry;

            return (
              <DynamicVideoEmbed
                embedUrl={embedUrl}
                title={title}
                type={type}
              />
            );
          case "CodeBlock":
            const { language, code } = entry;
            return <DynamicCodeBlock language={language} code={code} />;
          default:
            return null;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const { title, url, height, width, description } = assetBlockMap.get(
          node.data.target.sys.id,
        );
        return (
          /* todo - nextJS image component */
          <img
            className={styles.page__img}
            src={url}
            alt={description}
            height={height}
            width={width}
          />
        );
      },
    },
  };
}

export default function RichTextPageContent(props) {
  const { richTextBodyField } = props;

  return (
    <div className={styles.page__content}>
      {documentToReactComponents(
        richTextBodyField.json,
        getRenderOptions(richTextBodyField.links),
      )}
    </div>
  );
}
