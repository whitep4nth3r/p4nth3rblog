import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import PostList from "@components/PostList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";

export default function BlogIndex(props) {
  const { postSummaries, totalPosts, pageContent, url } = props;

  return (
    <MainLayout>
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
          <RichTextPageContent richTextBodyField={pageContent.body} />
        </PageContentWrapper>
        <PostList posts={postSummaries} totalPosts={totalPosts} />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(1);
  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
  );

  return {
    props: {
      postSummaries,
      totalPosts,
      pageContent,
    },
  };
}
