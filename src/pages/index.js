import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const avatar = getImage(data?.avatar)
  const author = data.site.siteMetadata?.author

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <header>
        <h1>Hi there, I'm Tatsuya <span role="img" aria-label="wave">👋</span></h1>
        <h2>Software engineer at Shopify <span role="img" aria-label="shopping_bags">🛍️</span> Japanese immigrant living in Toronto. Dad of two.</h2>
      </header>

      <p>Tatsuya Oiwa is a software engineer living and working in Toronto, Canada. He works on the Search team at <a href="https://www.shopify.com">Shopify</a>, where he builds the systems that power product discovery across Shopify's storefronts, the <a href="https://shop.app/">Shop app</a>, and agent commerce. His focus is on ingestion and indexing, the pipelines that get data into search at scale, and brings deep end-to-end knowledge across the stack from infrastructure to user experience.</p>

      <p>Born and raised in a <a href="https://en.wikipedia.org/wiki/Taketoyo">small waterfront town in Aichi, Japan</a>, he started his career in Tokyo at <a href="https://global.rakuten.com/corp/about/">Rakuten</a>, working in e-commerce search and platform engineering. He then moved to New York City, where he worked at <a href="https://www.producthunt.com/posts/newspicks">NewsPicks</a> and <a href="https://qz.com">Quartz</a> on news platforms and subscription products, before settling in Toronto. Outside of work, he is a dad of two girls and a beginner long distance runner.</p>

      <p>You can also find him on <a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a>.</p>

      {avatar && (<GatsbyImage image={avatar} alt={author?.name || ``}/>)}

      {posts.length > 0 && (
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      )}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    avatar: file(absolutePath: { regex: "/profile-pic-full.jpg/" }) {
      childImageSharp {
        gatsbyImageData(quality: 95)
      }
    }
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
