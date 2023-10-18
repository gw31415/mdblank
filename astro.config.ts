import { defineConfig } from "astro/config";
import remarkWikiLink from "remark-wiki-link";
import { defaultLayout } from "astro-default-layout";
import rehypeBudouxParagraph from "rehype-budoux-paragraph";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import sitemap from "@astrojs/sitemap";
import Compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      defaultLayout,
      [
        remarkWikiLink,
        {
          hrefTemplate: (permalink: string) =>
            `../${encodeURIComponent(permalink)}/`,
          pageResolver: (pageName: string) => [pageName],
          aliasDivider: "|",
        },
      ],
      remarkMath,
      [remarkToc, { heading: "目次" }],
    ],
    rehypePlugins: [
      rehypeBudouxParagraph,
      rehypeMathjax,
    ],
  },
  trailingSlash: "always",
  integrations: [sitemap(), Compress({ Image: false })],
});
