import { TagsContainer, Tag } from "./index.style";

export default function Tags(props) {
  const { tags } = props;

  return (
    <TagsContainer>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </TagsContainer>
  );
}
