export default function ResponsiveImage({ image }) {
  const small = 368;
  const large = 736;
  const quality = 75;
  const sizes = `(max-width: ${large - 1}px) ${small}px,${large}px`;

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${image.url}?q=${quality}&w=${small}&fm=avif ${small}w, ${image.url}?q=${quality}&w=${large}&fm=avif ${large}w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${image.url}?q=${quality}&w=${small}&fm=webp ${small}w, ${image.url}?q=${quality}&w=${large}&fm=webp ${large}w`}
        sizes={sizes}
      />
      <img
        srcSet={`${image.url}?q=${quality}&w=${small}&fm=jpg&fl=progressive ${small}w, ${image.url}?q=${quality}&w=${large}&fm=jpg&fl=progressive ${large}w`}
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
