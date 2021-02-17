import ContentWrapperStyles from "./ContentWrapper.module.css";

export default function ContentWrapper({ children }) {
  return <div className={ContentWrapperStyles.container}>{children}</div>;
}
