import { generateRandomCode } from "@whitep4nth3r/random-code";
import CodeBlock from "@components/RichTextPageContent/CodeBlock";
import RandomCodeSnippetStyles from "@styles/RandomCodeSnippet.module.css";

export default function index() {
  const randomCodeGen = generateRandomCode();
  return (
    <>
      <CodeBlock
        code={randomCodeGen.code}
        language={randomCodeGen.languageKey}
        title={`Here's ${randomCodeGen.lines} random lines of ${randomCodeGen.languageValue} code`}
      />
      <a
        href="https://www.npmjs.com/package/@whitep4nth3r/random-code"
        rel="noopener noreferrer"
        target="_blank"
        className={RandomCodeSnippetStyles.randomCode__poweredBy}
      >
        Powered by @whitep4nth3r/random-code
      </a>
    </>
  );
}
