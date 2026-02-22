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
      <header className="profile-header">
        {avatar && (
          <GatsbyImage
            image={avatar}
            alt={author?.name || ``}
            className="profile-avatar"
          />
        )}
        <h2 style={{ margin: 0 }}>Software engineer at Shopify. Working on e-commerce search at scale. Dad of two girls.</h2>
      </header>

      <p>I'm a software engineer at <a href="https://www.shopify.com">Shopify</a>, building the systems that power product discovery across storefronts, the <a href="https://shop.app/">Shop app</a>, and agent commerce. I focus on indexing pipelines, the infrastructure that feeds data into search at scale, working across the full stack from backend infrastructure to the user-facing product.</p>

      <p>Born and raised in Japan, I started my career in Tokyo at <a href="https://global.rakuten.com/corp/about/">Rakuten</a>, working in e-commerce search and platform engineering. I then moved to New York City, where I worked at <a href="https://www.producthunt.com/posts/newspicks">NewsPicks</a> and <a href="https://qz.com">Quartz</a> on news platforms and subscription products, before moving to Toronto.</p>

      <p>Outside of work, I'm a dad of two girls and a beginner long distance runner. You can find me on <a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a> or <a href="https://strava.app.link/ebTCg3TqX0b">Strava</a>.</p>

      {posts.length > 0 && (
        <>
          <hr />
          <h2>Writing</h2>
          <p><Link to="/ja">🇯🇵 日本語</Link></p>
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
        </>
      )}
    </Layout>
  )
}

export default BlogIndex

export function Head() {
  return <SEO title="Tatsuya Oiwa" />
}

export const pageQuery = graphql`
  query {
    avatar: file(absolutePath: { regex: "/profile-pic-full.jpg/" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120, quality: 95, transformOptions: { cropFocus: CENTER })
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
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { slug: { regex: "/^\\/en\\//" } } }
    ) {
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
