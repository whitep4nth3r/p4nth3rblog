import CodeBlockStyles from "./CodeBlock.module.css";
import Prism from "Prismjs";
import { useEffect } from "react";

export default function CodeBlock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const { language, code } = props;

  return (
    <pre className={`${CodeBlockStyles.codeBlock} language-${language}`}>
      <code>{code}</code>
    </pre>
  );
}
