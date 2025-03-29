import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ProjectsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const quartz = getImage(data.quartz?.childImageSharp?.gatsbyImageData)
  const newspicks = getImage(data.newspicks?.childImageSharp?.gatsbyImageData)
  const gilt = getImage(data.gilt?.childImageSharp?.gatsbyImageData)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Projects" />
      <h1>Hi there, here are some projects I’ve worked on.</h1>
      <h2>Quartz membership</h2>
      <p>
        {quartz && (<GatsbyImage image={quartz} alt={`quartz-membership`}/>)}
      </p>
      <p><a href="https://qz.com/subscribe/">Quartz membership</a> is Quartz’s first paid subscription service launched in November 2018. I designed and developed its membership and billing system from scratch, and as of September 2020, it is used by over 21,000 paid members and over 1 million free members.</p>
      <p>This experience has given me extensive knowledge of building an online subscription business, including web and mobile payment platforms, subscription lifecyle and events, customer acquisition and retention strategies, internationalization, and security. In addition, I have worked on a number of other fine-grained user experience improvements, such as <a href="https://product.qz.com/implementing-passwordless-login-with-magic-links">passwordless authentication with magic links</a> and <a href="https://qz.com/gift/">gifting</a>.</p>
      <p>The core technology stack of the backend system includes Java, Kotlin (server side), AWS (EC2, ECS, RDS, ElastiCache, SQS, etc.), and third-party payment platforms (Stripe, Apple/Google in-app purchases).</p>

      <h2>NewsPicks</h2>
      <p>
        {newspicks && (<GatsbyImage image={newspicks} alt={`newspicks`}/>)}
      </p>
      <p><a href="https://www.producthunt.com/posts/newspicks/">NewsPicks</a> is a social platform where people discover, share and comment on business news. It was founded in Japan in 2013 and has since become the country’s most widely used business news platform. I’ve been working as a backend engineer for this ambitious startup since March 2018, helping them expand their services into the U.S. market.</p>
      <p>It has been challenging to bridge the gap between two very different markets, cultures and organizations in Japan and the U.S., and to quickly localize a large and legacy backend codebase into a new business.</p>
      <p>After reblanding NewsPicks to Quartz through <a href="https://qz.com/1319059/quartz-acquisition-by-uzabase-a-letter-from-our-editor-in-chief-and-publisher/">mergers and acquisitions</a>, I have led the integration of NewsPicks and Quartz’ backend systems.</p>
      <p>The core backend technology stack of NewsPicks was Java, Spring and Hibernate, and of Quartz which I was primarily inovoled with was Node.js and Apollo GraphQL.</p>

      <h2>Gilt Japan</h2>
      <p>
        {gilt && (<GatsbyImage image={gilt} alt={`gilt-japan`}/>)}
      </p>
      <p>Coming soon...</p>

      <h2>Rakuten’s Global Search Platform</h2>
      <p>Coming soon...</p>
      <footer>
        <Bio />
      </footer>
	</Layout>
  )
}
  
export default ProjectsPage
  
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
		    title
	    }
    }
	  quartz: file(absolutePath: { regex: "/projects/quartz-membership.jpg/" }) {
      childImageSharp {
        gatsbyImageData(quality: 95, layout: FULL_WIDTH)
      }
    }
	  newspicks: file(absolutePath: { regex: "/projects/newspicks.png/" }) {
      childImageSharp {
        gatsbyImageData(quality: 95, layout: FULL_WIDTH)
      }
    }
	  gilt: file(absolutePath: { regex: "/projects/gilt-japan.jpg/" }) {
      childImageSharp {
        gatsbyImageData(quality: 95, layout: FULL_WIDTH)
      }
    }
  }
`
  