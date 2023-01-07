import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    siteName: `めもの保管庫`,
  },
  pathPrefix: `/mdblank`, // for GitHub Pages
  plugins: [
    `gatsby-plugin-pnpm`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        mdxOptions: {
          remarkPlugins: [
            require("remark-join-cjk-lines"),
            [
              require("remark-wiki-link"),
              {
                hrefTemplate: (permalink: string) => `../${encodeURIComponent(permalink)}`,
              },
            ],
          ],
          rehypePlugins: [],
        },
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/pages/`,
      },
    },
  ],
}

export default config
