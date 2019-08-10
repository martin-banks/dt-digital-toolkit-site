import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Styled from 'styled-components'
import importAllImages from '../helpers/import-all-images'

import Layout from '../components/layout'

const images = importAllImages(require.context('../screengrabs', false, /\.png/))

const ProjectGrid = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  // gap: 0.1rem;
  overflow: visible;
`

const Project = Styled.div`
  background: rgba(140,150,180, 0);
  overflow: visible;
  padding: 0.5rem;
  transition: all 200ms;
  z-index: 1;
  font-weight: 600;
  & p {
    color: #333;
  }
  & img {
    // box-shadow: 0 0px 0px rgba(0,0,0, 0.6);
    height: auto;
    width: 100%;
    transform-origin: center bottom;
    transition: all 150ms;
  };
  &:hover {
    & img {
      transform: scale(1.1);
      // box-shadow: 0 2px 16px rgba(0,0,0, 0.4);
      z-index: 2;
    };
  };
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
      <Layout>
        <h1>DT Archive</h1>

        <ProjectGrid>
          {
            data.allMarkdownRemark.edges.map((e, i) => (
              <Link style={{ textDecoration: 'none' }} to={`dt-archive${e.node.frontmatter.slug}`}>
                <Project key={`archive-project-${i}`}>
                  <img src={ images[e.node.frontmatter.slug.toLowerCase().replace(/\s+/g, '-').replace(/\//gi, '')] } />
                  <p>{e.node.frontmatter.title}</p>
                  <p>{ e.node.frontmatter.date }</p>
              </Project>
            </Link>
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
