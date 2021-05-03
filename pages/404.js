import ContentfulApi from "@utils/ContentfulApi";
import Link from "next/link";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import PewPewPanther from "@components/PewPewPanther";
import { Config } from "@utils/Config";
import ContentWrapper from "@components/ContentWrapper";
import NotFoundStyles from "@styles/NotFound.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import ButtonStyles from "@styles/Button.module.css";

export default function Panther404(props) {
  const { pageContent } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.notFound.url}
      />

      <ContentWrapper>
        <div className={NotFoundStyles.container}>
          <div className={NotFoundStyles.pantherContainer}>
            <PewPewPanther />
          </div>
          <h1 className={TypographyStyles.heading__h1}>
            Pew pew! That's a 404.
          </h1>
          <Link href="/">
            <a className={`${ButtonStyles.button} ${NotFoundStyles.button}`}>
              Take me home!
            </a>
          </Link>
        </div>
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.notFound.slug,
  );

  return {
    props: {
      pageContent,
    },
  };
}
