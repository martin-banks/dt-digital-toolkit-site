/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import { usePageQuery, graphql } from "gatsby"


class FakeComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { markdownRemark } = this.props.data

    return (<>
      <h1>{ markdownRemark.frontmatter.title }</h1>
      <div dangerouslySetInnerHTML={{
        __html: markdownRemark.html
      }} />

    </>)
  }
}

// Magically wired up to the component!!
export const query = graphql`
  query fakeQuery($slug: String!) {
    markdownRemark(frontmatter: {
      slug: {
        eq: $slug
      }
    }) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`

export default FakeComponent
