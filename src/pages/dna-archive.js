import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Styled from 'styled-components'
import importAllImages from '../helpers/import-all-images'

import Layout from '../components/layout'
import Project from '../components/project-item'
import ProjectGrid from '../components/project-grid'

const images = importAllImages(require.context('../screengrabs', false, /\.png/))

const dnaArchive = () => {
  const data = useStaticQuery(graphql`
    query dnaArchiveMarkdowns {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: {
            regex: "/dna-archive/"
          }
        }
        sort: {
          fields: frontmatter___date
          order: DESC
        }
      )
      {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              bylines
              capi
              date
              description
              preview
              tech
              thumb
              title
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <Layout style={{ overflow: 'visible' }}>
        <h1>DNA Archive</h1>

        <ProjectGrid>
          {
            data.allMarkdownRemark.edges
              .filter(e => e.node.frontmatter.slug)
              .map((e, i) => (
                  <Project key={`dna-archive-project-${i}`}>
                    <Link style={{ textDecoration: 'none' }} to={`dna-archive${e.node.frontmatter.slug}`}>
                      <img src={ images[e.node.frontmatter.slug.toLowerCase().replace(/\s+/g, '-').replace(/\//gi, '')] } />
                      <p>{e.node.frontmatter.title}</p>
                      <p>{ e.node.frontmatter.date }</p>
                  </Link>
                </Project>
              ))
          }
        </ProjectGrid>

        {/* <pre>
          { JSON.stringify(data.allMarkdownRemark, 'utf8', 2) }
        </pre> */}


      </Layout>
    </>
  )
}



export default dnaArchive
