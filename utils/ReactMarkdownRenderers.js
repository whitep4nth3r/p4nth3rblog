import TypographyStyles from "@styles/Typography.module.css";

export default function ReactMarkdownRenderers(markdown) {
  return {
    heading: ({ children }) => (
      <h3 className={TypographyStyles.heading__h3}>{children}</h3>
    ),
    strong: ({ children }) => (
      <span className={TypographyStyles.bodyCopy__bold}>{children}</span>
    ),
    paragraph: ({ children }) => (
      <p className={TypographyStyles.bodyCopy}>{children}</p>
    ),
    link: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={TypographyStyles.inlineLink}
      >
        {children}
      </a>
    ),
  };
}
