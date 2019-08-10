/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import { usePageQuery, graphql } from "gatsby"
import Layout from './layout'
require("prismjs/themes/prism-okaidia.css")


class FakeComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { markdownRemark } = this.props.data
    console.log('fake', this.props)

    return (<>
      <Layout>
        <h2>something fake</h2>
        {/* <h1>{ markdownRemark.frontmatter.title }</h1> */}
        {/* {
          markdownRemark.html &&
            <div dangerouslySetInnerHTML={{
              __html: markdownRemark.html
            }} />
        } */}

        <pre>{
          JSON.stringify(this.props.data, 'utf8', 2)
        }</pre>

      </Layout>

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
      }
    }
  }
`

export default FakeComponent
