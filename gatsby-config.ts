import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    siteName: `めもの保管庫`,
  },
  pathPrefix: `/mdblank`, // for GitHub Pages
  plugins: [
    `gatsby-plugin-pnpm`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        mdxOptions: {
          remarkPlugins: [
            require("remark-join-cjk-lines"),
            require("remark-gfm"),
            [
              require("remark-wiki-link"),
              {
                hrefTemplate: (permalink: string) =>
                  `../${encodeURIComponent(permalink)}`,
                pageResolver: (pageName: string) => [pageName],
                aliasDivider: "|",
              },
            ],
          ],
          rehypePlugins: [],
        },
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-table-of-contents-patch`,
            options: {
              tight: true,
              toHeading: 3,
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
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
};

export default config;
