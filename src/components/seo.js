import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, title, lang = "en" }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
          }
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const pageTitle =
    defaultTitle && title !== defaultTitle
      ? `${title} | ${defaultTitle}`
      : title

  return (
    <>
      <html lang={lang} />
      <meta name="color-scheme" content="light dark" />
      <title>{pageTitle}</title>
      {lang === "ja" && (
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
        />
      )}
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  )
}

export default SEO
