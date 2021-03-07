import Image from "next/image";
export default function ThingsIUse(props) {
  const { things } = props;
  return (
    <div>
      {things.map((thing) => (
        <div
          id={thing.sys.id}
          style={{ marginBottom: "2rem", display: "block" }}
        >
          {thing.name}
          {thing.categories.map((category) => (
            <div key={category}>{category}</div>
          ))}
          {thing.description}
          {thing.link}
          {thing.isAffiliateLink}
          {thing.customLinkText}

          <Image
            src={thing.image.url}
            alt={thing.image.description}
            height={thing.image.height}
            width={thing.image.width}
            layout="responsive"
          />
        </div>
      ))}
    </div>
  );
}
