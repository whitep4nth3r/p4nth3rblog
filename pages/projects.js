import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@contentful/Api";
import ContentfulProjects from "@contentful/Projects";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import HeroBanner from "@components/HeroBanner";

import LandingPageWrapper from "@components/LandingPageWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import ColorBg from "@components/ColorBg";
import ProjectsList from "@components/ProjectsList";

export default function Projects(props) {
  const { pageContent, preview, projects } = props;

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.projects.url}
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
            <ProjectsList projects={projects} />
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

  const projects = await ContentfulProjects.getAll();

  return {
    props: {
      preview,
      pageContent,
      projects,
    },
    revalidate: 5,
  };
}
