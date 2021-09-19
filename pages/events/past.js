import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulPageContent from "@contentful/PageContent";
import RichTextPageContent from "@components/RichTextPageContent";
import ContentfulEvents from "@contentful/Events";
import MainLayout from "@layouts/main";
import SwitchEventsButton from "@components/EventsList/SwitchEventsButton";
import LandingPageWrapper from "@components/LandingPageWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import EventsList from "@components/EventsList";

export default function Events(props) {
  const { pageContent, events } = props;

  return (
    <>
      <MainLayout>
        <PageMeta
          title={pageContent.title}
          description={pageContent.description}
          url={Config.pageMeta.events.url}
        />

        <LandingPageWrapper>
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
            <SwitchEventsButton href="/events" text="View upcoming events" />
            <EventsList events={events} />
          </PageContentWrapper>
        </LandingPageWrapper>

        <LandingPageWrapper></LandingPageWrapper>
      </MainLayout>
    </>
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
