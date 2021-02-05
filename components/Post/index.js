import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./Post.module.css";
import Tags from "./Tags";
import PublishedDate from "./PublishedDate";

function getRenderOptions(links) {
  const assetBlockMap = links?.assets?.block?.reduce((map, asset) => {
    map.set(asset.sys.id, asset);
    return map;
  }, new Map());

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <b className={[styles.post__copy, styles.post__copy__bold]}>{text}</b>
      ),
      //do global link style?
    },

    renderNode: {
      [BLOCKS.HR]: (text) => <hr className={styles.post__hr} />,
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={styles.post__h1}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={styles.post__h2}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={styles.post__h3}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={styles.post__h4}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className={styles.post__h5}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className={styles.post__h6}>{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={styles.post__copy}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={styles.post__blockquote}>{children}</blockquote>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={styles.post__ul}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className={styles.post__ol}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className={styles.post__li}>{children}</li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const { title, url, height, width, description } = assetBlockMap.get(
          node.data.target.sys.id,
        );
        return (
          /* todo - nextJS image component */
          <img
            className={styles.post__img}
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

export default function Post(props) {
  const { blogPost } = props;

  return (
    <article className={styles.post}>
      <PublishedDate date={blogPost.date} />
      <Tags tags={blogPost.tags} />
      <h1 className={styles.post__h1}>{blogPost.title}</h1>
      {documentToReactComponents(
        blogPost.body.json,
        getRenderOptions(blogPost.body.links),
      )}

      {/* TODO - this bit */}
      <p>{blogPost.externalUrl}</p>
    </article>
  );
}
