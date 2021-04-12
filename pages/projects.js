import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import HeroBanner from "@components/HeroBanner";

import LandingPageWrapper from "@components/LandingPageWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import ColorBg from "@components/ColorBg";
import Projects from "@components/Projects";

export default function Uses(props) {
  const { pageContent, preview, projects } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.uses.url}
        />

        {pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        {pageContent.body && (
          <LandingPageWrapper>
            <PageContentWrapper>
              <RichTextPageContent richTextBodyField={pageContent.body} />
            </PageContentWrapper>
          </LandingPageWrapper>
        )}
        <ColorBg color="#ffb626" borderTopColor="#f11012">
          <LandingPageWrapper>
            <Projects projects={projects} />
          </LandingPageWrapper>
        </ColorBg>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.projects.slug,
    {
      preview: preview,
    },
  );

  const projects = await ContentfulApi.getProjects();

  return {
    props: {
      preview,
      pageContent,
      projects,
    },
  };
}