import dynamic from "next/dynamic";
import ContentfulBlogPost from "@contentful/BlogPost";
import ContentfulPageContent from "@contentful/PageContent";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import PostList from "@components/PostList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";

const DynamicSearch = dynamic(() => import("@components/Search"), {
  ssr: false,
});

export default function BlogIndex(props) {
  const {
    postSummaries,
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
        url={Config.pageMeta.blogIndex.url}
      />

      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        <PageContentWrapper>
          <DynamicSearch />
          <RichTextPageContent richTextBodyField={pageContent.body} />
        </PageContentWrapper>
        <PostList
          posts={postSummaries}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const postSummaries = await ContentfulBlogPost.getPaginatedSummaries(1);
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.blogIndex.slug,
    {
      preview: preview,
    },
  );

  const totalPages = Math.ceil(
    postSummaries.total / Config.pagination.pageSize,
  );

  return {
    props: {
      preview,
      postSummaries: postSummaries.items,
      totalPages,
      currentPage: "1",
      pageContent,
    },
  };
}
