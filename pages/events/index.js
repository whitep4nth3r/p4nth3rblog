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
import NoEvents from "@components/NoEvents";

export default function Events(props) {
  const { pageContent, events } = props;

  return (
    <MainLayout>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.events.url}
      />

      <ContentWrapper>
        <PageContentWrapper>
          <RichTextPageContent richTextBodyField={pageContent.body} />
        </PageContentWrapper>
        <SwitchEventsButton type="past" />
        {events.length === 0 && <NoEvents />}
        <EventsList events={events} />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const pageContent = await ContentfulPageContent.getBySlug(
    Config.pageMeta.events.slug,
  );

  const events = await ContentfulEvents.getEvents();

  return {
    props: {
      events,
      pageContent,
    },
    revalidate: 5,
  };
}
