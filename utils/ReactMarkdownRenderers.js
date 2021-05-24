import TypographyStyles from "@styles/Typography.module.css";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";

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
        rel="nofollow noreferrer"
        className={TypographyStyles.inlineLink}
      >
        {children}
      </a>
    ),
    list: ({ children }) => (
      <ul className={RichTextPageContentStyles.page__ul}>{children}</ul>
    ),
    listItem: ({ children }) => (
      <li className={RichTextPageContentStyles.page__li}>{children}</li>
    ),
  };
}
