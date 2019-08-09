import React, { Component } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from '../components/layout'


const Guides = () => {
  const data = useStaticQuery(graphql`
    query dtArchiveMarkdowns {
  allMarkdownRemark(filter: {
    fileAbsolutePath: {
      regex: "/dt-archive/"
    }
  }){
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

        <ul>
          { data.allMarkdownRemark.edges.map((e, i) => (
            <li key={`archive-project-${i}`}>
              <Link to={ `dt-archive${e.node.frontmatter.slug}` }>{ e.node.frontmatter.title }</Link>
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
