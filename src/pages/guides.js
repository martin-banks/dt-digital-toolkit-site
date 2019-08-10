import React, { Component } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
// import Styled from 'styled-components'

import Layout from '../components/layout'


const Guides = () => {
  const data = useStaticQuery(graphql`
    query allMarkdownFiles {
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
    <>
      <h1>Guides</h1>

      {/* <aside></aside> */}

      <ul>
        { data.allMarkdownRemark.edges.map((e, i) => (
          <div>
            <li key={`link-${i}`}>

            <p>blah</p>
            <p>blah</p>
              {/* <Link to={ `guides/${e.node.frontmatter.slug}` }>{
                e.node.frontmatter.title
              }</Link> */}
            </li>

          </div>
        )) }
      </ul>

      {/* <pre>
        { JSON.stringify(data.allFile.edges, 'utf8', 2) }
      </pre> */}


    </>
  )
}



export default Guides
