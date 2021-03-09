import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import TwitterApi from "@utils/TwitterApi";
import TypographyStyles from "@styles/Typography.module.css";

export default function About(props) {
  const { twitterUser } = props;

  console.log(twitterUser);
  return (
    <>
      <MainLayout>
        <PageMeta
          title="This is a test!"
          description="This is testing Incremental Static Regeneration"
          url={Config.pageMeta.about.url}
        />

        <ContentWrapper>
          <PageContentWrapper>
            <h1 className={TypographyStyles.heading__h1}>
              Testing incremental static regeneration with Next.js
            </h1>
            <div style={{ margin: "2rem auto" }}>
              <p className={TypographyStyles.bodyCopy}>
                Use case - update followers dynamically
              </p>
              <p className={TypographyStyles.bodyCopy}>
                {" "}
                Use case - update my username when I go live
              </p>
            </div>
            <h3 className={TypographyStyles.heading__h3}>
              why would you use ISR and not just a client side request? -->
              performance and caching, and works without JS
            </h3>
            <div style={{ margin: "2rem auto" }}>
              <h2 className={TypographyStyles.heading__h2}>
                Name: {twitterUser.name}
              </h2>
              <h2 className={TypographyStyles.heading__h2}>
                Followers: {twitterUser.public_metrics.followers_count}
              </h2>
            </div>
          </PageContentWrapper>
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const twitterUser = await TwitterApi.getUserPublicMetrics();

  console.log(twitterUser.data[0]);
  return {
    props: {
      twitterUser: twitterUser.data[0],
    },
  };
}
