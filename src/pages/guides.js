import React, { Component } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

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
      <Layout>
        <h1>Guides</h1>

        <aside>

        </aside>

        <ul>
          { data.allMarkdownRemark.edges.map((e, i) => (
            <li key={`link-${i}`}>
              <Link to={ `guides/${e.node.frontmatter.slug}` }>{ e.node.frontmatter.title }</Link>
            </li>
          )) }
        </ul>

        {/* <pre>
          { JSON.stringify(data.allFile.edges, 'utf8', 2) }
        </pre> */}


      </Layout>
    </>
  )
}



export default Guides
