import ContentfulApi from "@contentful/Api";
import ContentfulPageContent from "@contentful/PageContent";
import ContentfulBlogPost from "@contentful/BlogPost";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import PostList from "@components/PostList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";
import Search from "@components/Search";

export default function BlogIndexPage(props) {
  const {
    postSummaries,
    totalPages,
    currentPage,
    pageContent,
    preview,
  } = props;

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={`${pageContent.title} Page ${currentPage}`}
        description={pageContent.description}
        url={`${Config.pageMeta.blogIndex.url}/page/${currentPage}`}
      />

      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        <PageContentWrapper>
          <Search />
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

export async function getStaticPaths() {
  const totalPosts = await ContentfulBlogPost.getTotal();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  const paths = [];

  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const postSummaries = await ContentfulBlogPost.getPaginatedSummaries(
    params.page,
  );
  const totalPages = Math.ceil(
    postSummaries.total / Config.pagination.pageSize,
  );
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.blogIndex.slug,
    {
      preview: preview,
    },
  );

  return {
    props: {
      preview,
      postSummaries: postSummaries.items,
      totalPages,
      pageContent,
      currentPage: params.page,
    },
  };
}
