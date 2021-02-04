import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  BlogPostContainer,
  Paragraph,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  BlockQuote,
  HorizontalRule,
  UnorderedList,
  OrderedList,
  ListItem,
  BlogPostImage,
} from "./index.style";

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
      [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
      [BLOCKS.HEADING_2]: (node, children) => <Heading2>{children}</Heading2>,
      [BLOCKS.HEADING_3]: (node, children) => <Heading3>{children}</Heading3>,
      [BLOCKS.HEADING_4]: (node, children) => <Heading4>{children}</Heading4>,
      [BLOCKS.HEADING_5]: (node, children) => <Heading5>{children}</Heading5>,
      [BLOCKS.HEADING_6]: (node, children) => <Heading6>{children}</Heading6>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
      [BLOCKS.QUOTE]: (node, children) => <BlockQuote>{children}</BlockQuote>,
      [BLOCKS.UL_LIST]: (node, children) => (
        <UnorderedList>{children}</UnorderedList>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <OrderedList>{children}</OrderedList>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const { title, url, height, width, description } = assetBlockMap.get(
          node.data.target.sys.id,
        );
        return (
          <BlogPostImage
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
    <BlogPostContainer>
      <PublishedDate date={blogPost.date} />
      <Tags tags={blogPost.tags} />
      <Heading1>{blogPost.title}</Heading1>
      {documentToReactComponents(
        blogPost.body.json,
        getRenderOptions(blogPost.body.links),
      )}

      <p>{blogPost.externalUrl}</p>
    </BlogPostContainer>
  );
}
