import React, { Component } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
// import Styled from 'styled-components'

import Layout from '../components/layout'


const Guides = () => {
  const data = useStaticQuery(graphql`
    query guideMarkdowns {
      allMarkdownRemark(filter: {
        fileAbsolutePath: {
          regex: "/guides/"
        }
      }){
        edges {
          node {
            id
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <h1>Guides</h1>

      <ul>
        { data.allMarkdownRemark.edges.map((e, i) => (
          <li key={`link-${i}`}>
            <Link to={ `guides/${e.node.frontmatter.slug}` }>{
              e.node.frontmatter.title
            }</Link>
          </li>
        )) }
      </ul>

    </Layout>
  )
}



export default Guides
