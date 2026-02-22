import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const JaIndex = ({ data, location }) => {
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
        <h2 style={{ margin: 0 }}>シニアソフトウェアエンジニア@Shopify。商品検索システムの開発をしています。カナダのトロント在住。二児の父。</h2>
      </header>

      {posts.length === 0 ? (
        <p>記事がありません。</p>
      ) : (
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
      <hr />
      <p><Link to="/">🇺🇸 英語</Link></p>
    </Layout>
  )
}

export default JaIndex

export function Head() {
  return <SEO title="日本語" lang="ja" />
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
      filter: { fields: { slug: { regex: "/^\\/ja\\//" } } }
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
