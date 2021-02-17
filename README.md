# p4nth3rblog

Fun stuff:

1. NextJS Image component

Typography TODO:

1. Apply typography styles to markdown excerpts via `<React-Markdown>` including `<p>`

API to do:

1. paginate the slugs function...

Appearance to do:

1. Decide what else to show on home page
2. What other bits of content do we want on the site?
3. CREATE NEW STARTER REPO
4. Then.. pantherise this one?

IMAGES

Day 1:

Learnings:

## getStaticProps

data fetched and pages generated at build time

Good for data that doesn't change often - i.e. with social links, blog posts, nav links

Limitations - can only getStaticProps on 'pages' (i.e. js files in the /pages directory)

## getServerSideProps

data fetched at run time (good for data that changes often)

## For dynamic routes generated at build time

dir/file: blog/[slug].js

getStaticPaths()
and then
getStaticProps()

Day 2

Rich text react renderer and linked assets
custom app file for layout and custom document file for html lang=en

removed social links from content model - because changes to the links would have required changes to the code (i.e svgs)

Day 3

Rendering the Twitch iframe on the front end - using process.env on the client side - NEXT_PUBLIC and using next/dynamic

Day 4

Rendering page content from a new content type

Day 5

canonical links

//separate query for just the slugs
//separate query for just the blog post summaries
//separate query for single blog post
//separate query for a single page
