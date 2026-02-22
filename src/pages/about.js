import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      avatar: file(absolutePath: { regex: "/profile-pic-full.jpg/" }) {
        childImageSharp {
          gatsbyImageData(quality: 95)
        }
      }
      site {
        siteMetadata {
          author {
            name
          }
          title
		    }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const author = data.site.siteMetadata?.author
  const avatar = getImage(data?.avatar)
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <header>
        <h1>Hi there, I’m Tatsuya <span role="img" aria-label="wave">👋</span></h1>
        <h2>Software engineer at Shopify <span role="img" aria-label="shopping_bags">🛍️</span> Japanese immigrant living in Toronto. Dad of two.</h2>
      </header>

      <p>Tatsuya Oiwa is a software engineer living and working in Toronto, Canada. He works on the Search team at <a href="https://www.shopify.com">Shopify</a>, where he builds the systems that power product discovery across Shopify's storefronts, the <a href="https://shop.app/">Shop app</a>, and agent commerce. His focus is on ingestion and indexing, the pipelines that get data into search at scale, and brings deep end-to-end knowledge across the stack from infrastructure to user experience.</p>

      <p>Born and raised in a <a href="https://en.wikipedia.org/wiki/Taketoyo">small waterfront town in Aichi, Japan</a>, he started his career in Tokyo at <a href="https://global.rakuten.com/corp/about/">Rakuten</a>, working in e-commerce search and platform engineering. He then moved to New York City, where he worked at <a href="https://www.producthunt.com/posts/newspicks">NewsPicks</a> and <a href="https://qz.com">Quartz</a> on news platforms and subscription products, before settling in Toronto. Outside of work, he is a dad of two girls and a beginner long distance runner.</p>

      <p>You can also find him on <a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a>.</p>

      {avatar && (<GatsbyImage image={avatar} alt={author?.name || ``}/>)}
	  </Layout>
  )
}

export default AboutPage
