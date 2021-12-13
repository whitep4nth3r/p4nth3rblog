import ContentfulTalk from "@contentful/Talk";
import Talk from "@components/Talk";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";

export default function TalkWrapper(props) {
  const { talk, preview } = props;

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={talk.title}
        description={talk.excerpt}
        url={`${Config.pageMeta.talksIndex.url}/${talk.slug}`}
        topic={talk.topicsCollection.items}
      />

      <ContentWrapper>
        <Talk talk={talk} />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const talkSlugs = await ContentfulTalk.getAllSlugs();

  const paths = talkSlugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false }) {
  const talk = await ContentfulTalk.getBySlug(params.slug, {
    preview: preview,
  });

  if (!talk) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      talk,
    },
  };
}
