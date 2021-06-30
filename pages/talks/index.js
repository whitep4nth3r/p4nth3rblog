import ContentfulTalk from "@contentful/Talk";
import ContentfulPageContent from "@contentful/PageContent";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";
import TalkList from "@components/TalkList";

export default function TalksIndex(props) {
  const {
    talkSummaries,
    currentPage,
    totalPages,
    pageContent,
    preview,
  } = props;

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.talksIndex.url}
      />

      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        <PageContentWrapper>
          <RichTextPageContent richTextBodyField={pageContent.body} />
        </PageContentWrapper>

        <TalkList
          talks={talkSummaries}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const talkSummaries = await ContentfulTalk.getPaginatedSummaries(1);
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.talksIndex.slug,
    {
      preview: preview,
    },
  );

  const totalPages = Math.ceil(
    talkSummaries.total / Config.pagination.pageSize,
  );

  return {
    props: {
      preview,
      talkSummaries: talkSummaries.items,
      totalPages,
      currentPage: "1",
      pageContent,
    },
  };
}
