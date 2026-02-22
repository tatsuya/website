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
        <h2 style={{ margin: 0 }}>大岩 達也</h2>
      </header>

      <p>シニアソフトウェアエンジニア＠Shopify。ストア内検索、マーケットプレイス検索、AIエージェント向け検索を支えるシステムの開発に携わっています。検索インデックス作成用のデータパイプラインを中心に、バックエンドからフロントエンドまでフルスタックで幅広く担当しています。</p>

      <p>愛知県出身。楽天の検索チームにてキャリアをスタートし、NewsPicksへの転職と同社の米国展開をきっかけに渡米。ニューヨークの<a href="https://qz.com">Quartz</a>にてニュースアプリの開発に従事した後、Shopifyへの転職を機にカナダのトロントへ移住。現在海外8年目。</p>

      <p>二人の娘の父。健康維持のために最近走り始めました。オンラインでは主に<a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a>と<a href="https://strava.app.link/ebTCg3TqX0b">Strava</a>で活動しています。</p>

      <p><Link to="/">🇨🇦 英語</Link></p>

      {posts.length > 0 && (
        <>
          <hr />
          <h2>書きもの</h2>
        </>
      )}

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
    </Layout>
  )
}

export default JaIndex

export function Head() {
  return <SEO title="🍙 Tatsuya Oiwa" lang="ja" />
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
