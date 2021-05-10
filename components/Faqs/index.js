import React from "react";
import TypographyStyles from "@styles/Typography.module.css";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import LinkIcon from "@components/RichTextPageContent/svg/LinkIcon";
import RichTextPageContent from "@components/RichTextPageContent";
import { slugifyString } from "@utils/Tools";

export default function Faqs(props) {
  const { faqs } = props;

  return (
    <div>
      {faqs.map((faq) => (
        <div key={faq.sys.id}>
          <div
            className={RichTextPageContentStyles.page__linkedHeaderContainer}
          >
            <h2
              id={`${slugifyString(faq.question)}`}
              className={TypographyStyles.heading__h2}
            >
              {faq.question}
            </h2>
            <a
              className={`${RichTextPageContentStyles.page__headerLink} ${TypographyStyles.inlineLink}`}
              href={`#${slugifyString(faq.question)}`}
              aria-label={`Link directly to ${faq.question}`}
            >
              <LinkIcon />
            </a>
          </div>
          <RichTextPageContent richTextBodyField={faq.answer} />
        </div>
      ))}
    </div>
  );
}
