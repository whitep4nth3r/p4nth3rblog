# p4nth3rblog

TODO:

1. Work out pagination on blog index
2. Work out what to do with the 'limit' parameter in the graphql query to avoid complexity and hardcoded numbers
  - create a pagination component

  Create reference fields for tags - to build /slugs etc?

3. Decide what else to show on home page
4. What other bits of content do we want on the site?
5. CREATE NEW STARTER REPO
6. Then.. pantherise this one?

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
and consolidating the render options for both blog posts and page content
