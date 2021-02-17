import ContentWrapperStyles from "./ContentWrapper.module.css";

export default function ContentWrapper({ children }) {
  return <div class={ContentWrapperStyles.container}>{children}</div>;
}
