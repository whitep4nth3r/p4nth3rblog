import LandingPageWrapperStyles from "@styles/LandingPageWrapper.module.css";

export default function LandingPageWrapper({ children }) {
  return <div className={LandingPageWrapperStyles.container}>{children}</div>;
}
