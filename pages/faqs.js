import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentfulFaqs from "@contentful/Faqs";
import ContentfulPageContent from "@contentful/PageContent";
import RichTextPageContent from "@components/RichTextPageContent";
import PageContentWrapper from "@components/PageContentWrapper";
import ContentWrapper from "@components/ContentWrapper";
import Faqs from "@components/Faqs";

export default function FaqsPage(props) {
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
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.faqs.slug,
    {
      preview: preview,
    },
  );

  const faqs = await ContentfulFaqs.getAll();

  return {
    props: {
      preview,
      pageContent,
      faqs,
    },
  };
}
