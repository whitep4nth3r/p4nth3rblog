export default function ResponsiveImage({ image }) {
  const maxContainerSize = 736;
  const imageWidths = [100, 200, 300, 400, 500, 600, 700, maxContainerSize];

  // Below the maximum container size, make images span 100vw of the container
  // Above the maximum container size, serve the image at the width of the container and no bigger
  const sizes = `(max-width: ${
    maxContainerSize - 1
  }px) 100vw, ${maxContainerSize}px`;

  function makeSrcSetArray(format) {
    console.log(format);
    const formatString = format === undefined ? "" : `&fm=${format}`;

    return imageWidths.map(
      (width) => `${image.url}?q=75&w=${width}${formatString} ${width}w`,
    );
  }

  function makeSrcSetString(format) {
    return makeSrcSetArray(format).join(", ");
  }

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={makeSrcSetString("avif")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={makeSrcSetString("webp")}
        sizes={sizes}
      />
      <img
        srcSet={makeSrcSetString()}
        sizes={sizes}
        src={image.url}
        alt={image.description}
        loading="lazy"
        decoding="async"
        width={image.width}
        height={image.height}
      />
    </picture>
  );
}
