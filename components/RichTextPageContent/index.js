import dynamic from "next/dynamic";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichTextPageContentStyles from "./RichTextPageContent.module.css";
import TypographyStyles from "../../styles/Typography.module.css";

import LinkIcon from "./svgs/LinkIcon";

function slugifyString(string) {
  return string
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase();
}

const DynamicCodeBlock = dynamic(() => import("./CodeBlock"), {
  ssr: false,
});

const DynamicVideoEmbed = dynamic(() => import("./VideoEmbed"), {
  ssr: false,
});

export function getRenderOptions(links, isBlogPost = false) {
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
        <b className={[TypographyStyles.bodyCopy, bodyCopy.bodyCopy__bold]}>
          {text}
        </b>
      ),
    },

    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          className={TypographyStyles.inlineLink}
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      [BLOCKS.HR]: (text) => (
        <hr className={RichTextPageContentStyles.page__hr} />
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={TypographyStyles.heading__h1}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => {
        if (isBlogPost) {
          return (
            <div
              className={RichTextPageContentStyles.page__linkedHeaderContainer}
            >
              <h2
                id={`${slugifyString(children[0])}`}
                className={TypographyStyles.heading__h2}
              >
                {children}
              </h2>
              <a
                className={RichTextPageContentStyles.page__headerLink}
                href={`#${slugifyString(children[0])}`}
              >
                <LinkIcon />
              </a>
            </div>
          );
        } else {
          return <h2 className={TypographyStyles.heading__h2}>{children}</h2>;
        }
      },
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={TypographyStyles.heading__h3}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={TypographyStyles.heading__h4}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className={TypographyStyles.heading__h5}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className={TypographyStyles.heading__h6}>{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={TypographyStyles.bodyCopy}>{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={TypographyStyles.blockquote}>
          {children}
        </blockquote>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={TypographyStyles.heading__ul}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className={TypographyStyles.heading__ol}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li
          className={[TypographyStyles.bodyCopy, TypographyStyles.heading__li]}
        >
          {children}
        </li>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const entry = entryBlockMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "VideoEmbed":
            const { embedUrl, title } = entry;

            return <DynamicVideoEmbed embedUrl={embedUrl} title={title} />;
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
            className={RichTextPageContentStyles.page__img}
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
  const { richTextBodyField, isBlogPost } = props;

  return (
    <div className={TypographyStyles.heading__content}>
      {documentToReactComponents(
        richTextBodyField.json,
        getRenderOptions(richTextBodyField.links, isBlogPost),
      )}
    </div>
  );
}
