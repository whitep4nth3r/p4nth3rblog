import CodeBlockStyles from "./CodeBlock.module.css";
import Prism from "prismjs";
import { useEffect } from "react";

export default function CodeBlock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const { language, code } = props;

  return (
    <div className={CodeBlockStyles.codeBlock__container}>
      <span className={CodeBlockStyles.codeBlock__lang}>{language}</span>
      <pre className={`${CodeBlockStyles.codeBlock} language-${language}`}>
        <code className={CodeBlockStyles.codeBlock__inner}>{code}</code>
      </pre>
    </div>
  );
}
