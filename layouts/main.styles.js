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

  .ais-SearchHolder {
    position: relative;
  }

  .ais-SearchBox {
    margin-bottom: 4rem;
  }

  .ais-SearchBox-form {
    display: block;
    position: relative;
    width: 100%;
  }

  .ais-SearchBox-input {
    padding: 1rem;
    font-size: 1rem;
    font-family: var(--font-family-main);
    color: var(--color-foreground);
    border-radius: 0;
    border: 0.125rem solid var(--color-foreground);
    transition: box-shadow 0.2s ease 0s;
    width: 100%;
  }

  .ais-SearchBox-input::placeholder {
    font-family: var(--font-family-main);
    color: var(--color-muted);
  }

  .ais-SearchBox-submit {
    display: none;
  }

  .ais-SearchBox-reset {
    padding: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    border: 0.125rem solid var(--color-foreground);
    background-color: var(--color-background);
    border-radius: 0;
    font-size: 1rem;
    font-family: var(--font-family-main);
    cursor: pointer;
    width: 100%;
  }

  .ais-SearchBox-input:focus,
  .ais-SearchBox-submit:focus,
  .ais-SearchBox-reset:focus {
    outline-width: 0;
    -webkit-appearance: none;
    box-shadow: var(--color-primary) 0 0 0 0.25rem;
  }

  .ais-Hits {
    background-color: var(--color-background);
    position: absolute;
    top: 8.5rem;
    width: 100%;
    background-color: var(--color-foreground);
    color: var(--color-background);
    border: 0.25rem solid var(--color-tertiary);
    box-shadow: 0.5rem 0.5rem 0 0 var(--color-primary);
  }

  .ais-Hits-list {
    list-style: none;
    padding: 0;
  }

  .ais-Hits-item {
    padding: 2rem 2rem 0.5rem 2rem;
  }

  .ais-Hits-item span,
  .ais-Hits-item time {
    color: var(--color-background);
  }

  .ais-Hits-link {
    text-decoration: none;
    font-family: var(--font-family-main);
    display: block;
    transition: all 0.1s ease 0s;
    border-radius: 0;
    cursor: pointer;
    color: var(--color-background);
    font-weight: var(--font-weight-normal);
    font-size: 1.8rem;
    line-height: 1.4;
    margin-bottom: 2rem;
  }

  .ais-Hits-link:hover,
  .ais-Hits-link:focus {
    outline-width: 0;
    box-shadow: var(--color-primary) 0 0 0 0.25rem;
  }

  .ais-SearchLabel {
    font-weight: var(--font-weight-normal);
    font-family: var(--font-family-main);
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 1rem;
    display: block;
  }

  .ais-Hits-excerpt p {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 2rem;
    font-weight: var(--font-weight-light);
    font-family: var(--font-family-main);
    color: var(--color-background);
  }
`;
