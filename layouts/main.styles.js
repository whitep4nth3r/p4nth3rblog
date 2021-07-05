import css from "styled-jsx/css";
import "prismjs/themes/prism-okaidia.css";

export default css.global`
  @import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;700&display=swap");

  :root {
    --color-primary: #ffb626;
    --color-secondary: #82af3a;
    --color-tertiary: #f11012;
    --color-foreground: #0f111a;
    --color-background: #ffffff;
    --color-muted: #666666;

    --grid-unit: 0.5rem;

    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 700;

    --font-family-heading: "Work Sans", sans-serif;
    --font-family-body: "Work Sans", sans-serif;
    --font-family-code: Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
      monospace;

    --global-transition-time: 0.2s;

    --wrapper-max-width: 48rem;
    --landing-wrapper-max-width: 72rem;

    --hamburger_padding-x: 16px;
    --hamburger_padding-y: 16px;
    --hamburger_layer-width: 32px;
    --hamburger_layer-height: 4px;
    --hamburger_layer-spacing: 6px;
    --hamburger_layer-color: var(--color-primary);
    --hamburger_layer-border-radius: 1px;
    --hamburger_hover-opacity: 0.9;
    --hamburger_active-hover-opacity: var(--hamburger_hover-opacity);
  }

  html {
    font-size: 100%;
    background-color: var(--color-background);
  }

  body {
    font-size: 1rem;
    font-weight: var(--font-weight-light);
    font-family: var(--font-family-body);
    color: var(--color-foreground);
    margin: 0;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  /* accessibility fixes for prismjs */
  .token.comment {
    color: #adb8c2 !important;
  }

  .token.important {
    color: #f3a344 !important;
  }

  .token.tag,
  .token.property,
  .token.constant {
    color: #fc92b6 !important;
  }

  .twitter-tweet {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .web-vitals {
    overflow: hidden;
    font-family: var(--font-family-body);
    color: var(--color-background);
    font-size: 1.2rem;
    line-height: 1.8;
  }

  .web-vitals a {
    color: var(--color-background);
    font-weight: bold;
    color: inherit;
    transition: color var(--global-transition-time) ease-in-out;
    text-decoration: underline;
    text-underline-offset: 0.125rem;
    text-decoration-thickness: 0.125rem;
  }

  .web-vitals a:visited {
    color: var(--color-background);
  }

  .web-vitals a:hover {
    color: var(--color-background);
  }

  .web-vitals a:focus {
    outline: none;
    box-shadow: var(--color-primary) 0 0 0 0.25rem;
    transition: box-shadow var(--global-transition-time) ease 0s;
  }

  .web-vitals dl {
    margin: 0;
    grid-template-columns: 1fr 1fr;
  }

  .web-vitals p {
    font-size: 1.2rem;
    line-height: 1.8;
  }

  .web-vitals div {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .web-vitals dd {
    text-align: right;
    margin-left: 1em;
  }
`;
