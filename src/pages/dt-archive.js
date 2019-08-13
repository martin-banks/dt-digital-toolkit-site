import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Styled from 'styled-components'
import importAllImages from '../helpers/import-all-images'

import Layout from '../components/layout'
import Project from '../components/project-item'
import ProjectGrid from '../components/project-grid'

const images = importAllImages(require.context('../screengrabs', false, /\.png/))


const Guides = () => {
  const data = useStaticQuery(graphql`
    query dtArchiveMarkdowns {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: {
            regex: "/dt-archive/"
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
        <h1>DT Archive</h1>

        <ProjectGrid>
          {
            data.allMarkdownRemark.edges.map((e, i) => (
              <Project key={`archive-project-${i}`}>
                <Link style={{ textDecoration: 'none' }} to={`dt-archive${e.node.frontmatter.slug}`}>
                  <img src={ images[e.node.frontmatter.slug.toLowerCase().replace(/\s+/g, '-').replace(/\//gi, '')] } />
                  <p>{e.node.frontmatter.title}</p>
                  <p>{ e.node.frontmatter.date }</p>
              </Link>
            </Project>
          ))
          }
        </ProjectGrid>

        {/* <pre>
          { JSON.stringify(data.allFile.edges, 'utf8', 2) }
        </pre> */}


      </Layout>
    </>
  )
}



export default Guides
