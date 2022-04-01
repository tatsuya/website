import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      avatar: file(absolutePath: { regex: "/profile-pic-full.jpg/" }) {
        childImageSharp {
          fluid(quality: 95) {
            ...GatsbyImageSharpFluid
          }
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
  
  const avatar = data?.avatar?.childImageSharp?.fluid
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <header>
        <h1>Hi there, I’m Tatsuya <span role="img" aria-label="wave">👋</span></h1>
        <h2>Senior Developer at Shopify <span role="img" aria-label="shopping_bags">🛍️</span> Live and work in Toronto <span role="img" aria-label="canada">🇨🇦</span> Previously in New York <span role="img" aria-label="us">🇺🇸</span> and Tokyo <span role="img" aria-label="japan">🇯🇵</span></h2>
      </header>

      <p>Tatsuya Oiwa is a software developer living in Toronto. He is a Senior Developer at <a href="https://www.shopify.com">Shopify</a>, where he works on things to <a href="https://www.shopify.com/careers/culture">make commerce better for everyone</a>. Like other Shopify folks around the world, he is currently working remotely from home. When he is not working, he enjoys Toronto’s chilly weather and diverse dining scene with his family.</p>

      <p>Prior to coming to Toronto, Tatsuya lived in New York for about two years. He worked at <a href="https://qz.com">Quartz</a>, a global digital business news publisher, where he designed and developed the backend systems that drive Quartz’s paid subscription and email services. He helped build and grow the product, serving more than 25,000 paying members globally. He was also one of the first engineering hires at <a href="https://www.producthunt.com/posts/newspicks">NewsPicks USA</a>, the US branch of Japan’s leading business news platform, which was later acquired by and rebranded as Quartz.</p>

      <p>Starting his career in Tokyo, Tatsuya worked for both large and small e-commerce companies. Those include <a href="https://global.rakuten.com/corp/about/">Rakuten</a>, Japan’s largest e-commerce platform, and <a href="https://www.gilt.jp/">Gilt</a>, a luxury apparel flash sale site. There he was involved in and learned all stages of the software development lifecycle from design and development to release and maintenance. He worked on numerous products and projects, including self-service deployment and monitoring of a large scale distributed search platform, internal frontend tools to measure and experiment with search relevance and ranking algorithms, performance analysis and tuning of backend servers under high volume traffic, providing personalized shopping experiences drives growth and engagement, and refactoring and data migration of legacy applications and storage systems.</p>

      <p>With his extensive work experience in diverse environments, he specializes in solving problems in a way that minimizes risk and maximizes value. He turns problems over and over in his mind until he finds an elegant solution that seemed impossible from the outset. He values generosity and empathy, and is always willing to set aside his own work to help others who are struggling. He brings enthusiasm to everything he does with his incessant intellectual curiosity.</p>

      <p>Born and raised in a <a href="https://en.wikipedia.org/wiki/Taketoyo">small waterfront town in Aichi, Japan</a>, he moved across the Pacific Ocean to where he is today. His next life goal is to live on and work from as many continents and islands as possible.</p>

      <p>You can also find me on <a href="https://twitter.com/hey_tatsuya">Twitter</a>, <a href="https://instagram.com/tatsuyaoiw">Instagram</a> or <a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a>. Here’s my <a href="https://github.com/tatsuyaoiw/resume/blob/master/resume-2021.pdf">resume</a>.</p>

      {avatar && (<Image fluid={avatar} alt={author?.name || ``}/>)}
	  </Layout>
  )
}

export default AboutPage
