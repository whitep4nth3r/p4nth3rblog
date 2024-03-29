import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulPageContent from "@contentful/PageContent";
import RichTextPageContent from "@components/RichTextPageContent";
import ContentfulEvents from "@contentful/Events";
import MainLayout from "@layouts/main";
import SwitchEventsButton from "@components/EventsList/SwitchEventsButton";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import EventsList from "@components/EventsList";

export default function Events(props) {
  const { pageContent, events } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.pastEvents.url}
      />
      <ContentWrapper>
        <PageContentWrapper>
          <RichTextPageContent richTextBodyField={pageContent.body} />
        </PageContentWrapper>
        <SwitchEventsButton type="upcoming" />
        <EventsList events={events} />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.pastEvents.slug,
  );

  const events = await ContentfulEvents.getEvents({ future: false });

  return {
    props: {
      events,
      pageContent,
    },
    revalidate: 5,
  };
}
