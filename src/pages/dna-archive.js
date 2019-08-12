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
  overflow: visible !important;
`

const Project = Styled.div`
  // background: rgba(140,150,180, 0);
  background: white
  border: solid 1px #e2e2e2;
  font-weight: 600;
  overflow: visible !important;
  padding: 0.5rem;
  transform-origin: center bottom;
  transition: all 200ms;
  z-index: 1;
  & p {
    color: #333;
  }
  & img {
    // box-shadow: 0 0px 0px rgba(0,0,0, 0.6);
    height: auto;
    width: 100%;
    transition: all 150ms;
  };
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 16px rgba(0,0,0, 0.4);
    z-index: 100;
    & img {};
  };
`


const Guides = () => {
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
                    <Link style={{ textDecoration: 'none' }} to={`dna-archive/${e.node.frontmatter.slug}`}>
                      <img src={ images[e.node.frontmatter.slug.toLowerCase().replace(/\s+/g, '-').replace(/\//gi, '')] } />
                      <p>{e.node.frontmatter.title}</p>
                      <p>{ e.node.frontmatter.date }</p>
                  </Link>
                </Project>
              ))
          }
        </ProjectGrid>

        <pre>
          { JSON.stringify(data.allMarkdownRemark, 'utf8', 2) }
        </pre>


      </Layout>
    </>
  )
}



export default Guides
