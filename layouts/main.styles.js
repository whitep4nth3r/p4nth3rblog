import css from "styled-jsx/css";

export default css.global`
  :root {
    --color-primary: #f11012;
    --color-secondary: #82af3a;
    --color-tertiary: #ffb626;
    --color-foreground: #0f111a;
    --color-background: #ffffff;
    --color-muted: #666666;

    --grid-unit: 0.5rem;

    --font-weight-normal: 400;
    --font-weight-bold: 700;

    --font-family-heading: "Titillium Web", sans-serif;
    --font-family-body: "Titillium Web", sans-serif;

    --global-transition-time: 0.2s;
  }
  html {
    font-size: 100%;
    background-color: var(--color-background);
  }

  body {
    font-size: 1rem;
    font-weight: var(--font-weight-normal);
    font-family: var(--font-family-body);
    color: var(--color-foreground);
    margin: 0;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  .mainWrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 45rem;
    padding: 1rem;
  }
`;
