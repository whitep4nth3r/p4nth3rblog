import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
// import ContentfulPageContent from "@contentful/PageContent";
// import RichTextPageContent from "@components/RichTextPageContent";
import ContentfulEvents from "@contentful/Events";
import MainLayout from "@layouts/main";
import Link from "next/link";
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
            {/* <RichTextPageContent richTextBodyField={pageContent.body} /> */}
            <EventsList events={events} />
            <Link href="/events/past">
              <a>View past events</a>
            </Link>
          </PageContentWrapper>
        </LandingPageWrapper>

        <LandingPageWrapper></LandingPageWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const pageContent = {
    title: "TEST TEMP",
    description: "TEST TEMP",
  };

  const events = await ContentfulEvents.getEvents();

  console.log(events);

  return {
    props: {
      events,
      pageContent,
    },
    revalidate: 5,
  };
}
