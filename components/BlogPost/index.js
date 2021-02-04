import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./BlogPost.module.css";
import Tags from "./Tags";
import PublishedDate from "./PublishedDate";

function getRenderOptions(links) {
  const assetBlockMap = links?.assets?.block?.reduce((map, asset) => {
    map.set(asset.sys.id, asset);
    return map;
  }, new Map());

  return {
    renderMark: {
      [MARKS.HR]: (text) => <HorizontalRule>{text}</HorizontalRule>,
      //do global link style?
    },

    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={styles.blogPost__h1}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={styles.blogPost__h2}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={styles.blogPost__h3}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={styles.blogPost__h4}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className={styles.blogPost__h5}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className={styles.blogPost__h6}>{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={styles.blogPost__paragraph}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={styles.blogPost__blockquote}>
          {children}
        </blockquote>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={styles.blogPost__ul}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className={styles.blogPost__ol}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className={styles.blogPost__li}>{children}</li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const { title, url, height, width, description } = assetBlockMap.get(
          node.data.target.sys.id,
        );
        return (
          <img
            className={styles.blogPost__img}
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

export default function BlogPost(props) {
  const { blogPost } = props;

  return (
    <article className={styles.blogPost}>
      <PublishedDate date={blogPost.date} />
      <Tags tags={blogPost.tags} />
      <h1 className={styles.blogPost__h1}>{blogPost.title}</h1>
      {documentToReactComponents(
        blogPost.body.json,
        getRenderOptions(blogPost.body.links),
      )}

      <p>{blogPost.externalUrl}</p>
    </article>
  );
}
