import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import PageContentWrapper from "@components/PageContentWrapper";
import ContentWrapper from "@components/ContentWrapper";
import Faqs from "@components/Faqs";

export default function Faqs(props) {
  const { pageContent, preview, faqs } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.faqs.url}
        />

        <ContentWrapper>
          {pageContent.body && (
            <PageContentWrapper>
              <RichTextPageContent richTextBodyField={pageContent.body} />
            </PageContentWrapper>
          )}
          <Faqs faqs={faqs} />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.faqs.slug,
    {
      preview: preview,
    },
  );

  const faqs = await ContentfulApi.getAllFaqs();

  return {
    props: {
      preview,
      pageContent,
      faqs,
    },
  };
}
