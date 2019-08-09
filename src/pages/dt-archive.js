import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Styled from 'styled-components'
import importAllImages from '../helpers/import-all-images'

import Layout from '../components/layout'

const images = importAllImages(require.context('../screengrabs', false, /\.png/))

const ProjectGrid = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
  gap: 0.5rem;
`

const Project = Styled.div`
  max-width: 200px;
  & > img {
    width: 100%;
    height: auto;
  }
`


const Guides = () => {
  const data = useStaticQuery(graphql`
    query dtArchiveMarkdowns {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: {
            regex: "/dt-archive/"
          }
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
      <Layout>
        <h1>DT Archive</h1>

        <ProjectGrid>
          {
            data.allMarkdownRemark.edges.map((e, i) => (
              <Project key={`archive-project-${i}`}>
                <Link to={`dt-archive${e.node.frontmatter.slug}`}>
                  <img src={ images[e.node.frontmatter.title.toLowerCase().replace(/\s+/g, '-')] } />
                  <p>{e.node.frontmatter.title}</p>
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
