import CodeBlockStyles from "./CodeBlock.module.css";
import Prism from "prismjs";
import { useEffect } from "react";

export default function CodeBlock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const { language, code, title } = props;

  const displayTitle = title || language;

  return (
    <div className={CodeBlockStyles.codeBlock__container}>
      <span className={CodeBlockStyles.codeBlock__lang}>{displayTitle}</span>
      <pre className={`${CodeBlockStyles.codeBlock} language-${language}`}>
        <code className={CodeBlockStyles.codeBlock__inner}>{code}</code>
      </pre>
    </div>
  );
}
