import Link from "next/link";
import Image from "next/image";
import PublishedDateAndReadingTime from "@components/Post/PublishedDateAndReadingTime";
import PostGridStyles from "@styles/PostGrid.module.css";
import { Config } from "@utils/Config";
import { buildStructuredDataForBlogPost } from "@utils/Tools";

export default function PostGrid(props) {
  const { posts } = props;

  return (
    <>
      <ol className={PostGridStyles.grid}>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <Link href={`${Config.pageMeta.blogIndex.slug}/${post.slug}`}>
              <a className={PostGridStyles.post}>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: buildStructuredDataForBlogPost(post, {
                      isPostList: true,
                    }),
                  }}
                />

                <span className={PostGridStyles.imgContainer}>
                  <Image
                    src={`${post.featuredImage.url}?w=300`}
                    alt={post.featuredImage.description}
                    height={post.featuredImage.height}
                    width={post.featuredImage.width}
                    layout="responsive"
                  />
                </span>

                <span className={PostGridStyles.inner}>
                  <PublishedDateAndReadingTime
                    date={post.date}
                    readingTime={post.readingTime}
                  />
                  <h2 className={PostGridStyles.title}>{post.title}</h2>
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
