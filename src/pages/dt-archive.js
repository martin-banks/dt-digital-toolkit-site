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
  overflow: visible;
`

const Project = Styled.div`
  background: rgba(140,150,180, 0);
  max-width: 200px;
  overflow: visible;
  padding: 0.5rem;
  transition: all 200ms;
  z-index: 1;
  & a {
    text-decoration: none;
    font-weight: 600;
    color: #333;
  }
  & img {
    box-shadow: 0 0px 0px rgba(0,0,0, 0.6);
    height: auto;
    width: 100%;
    transform-origin: center bottom;
    transition: all 150ms;
  };
  &:hover {
    background: rgba(140,150,180, 0.3);
    & * {
      // color: darkslategrey;
    };
    & img {
      transform: scale(1.1);
      box-shadow: 0 2px 16px rgba(0,0,0, 0.4);
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
