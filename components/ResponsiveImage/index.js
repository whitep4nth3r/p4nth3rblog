export default function ResponsiveImage({ image }) {
  const maxContainerSize = 736;
  const imageWidths = [100, 200, 300, 400, 500, 600, 700, maxContainerSize];

  // Below the maximum container size, make images span 100vw of the container
  // Above the maximum container size, serve the image at the width of the container and no bigger
  const sizes = `(max-width: ${
    maxContainerSize - 1
  }px) 100vw, ${maxContainerSize}px`;

  const srcSetArray = imageWidths.map(
    (width) => `${image.url}?q=75&w=${width}&fm=avif ${width}w`,
  );

  const srcSetString = srcSetArray.join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={srcSetString} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetString} sizes={sizes} />
      <img
        srcSet={srcSetString}
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
