import * as React from "react"
import { graphql, PageProps } from "gatsby"

interface IndexPageProps {
  site: {
    siteMetadata: {
      siteName: string
    }
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`

export default function Index({ data: { site } }: PageProps<IndexPageProps>) {
  return (
    <main>
      <h1>{site.siteMetadata.siteName}</h1>
      <p className="custom-text"></p>
    </main>
  )
}
