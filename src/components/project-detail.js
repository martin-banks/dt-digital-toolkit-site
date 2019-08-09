/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import { usePageQuery, graphql, Link } from "gatsby"
import Styled from 'styled-components'
import importAllImages from '../helpers/import-all-images'

import Layout from './layout'

require("prismjs/themes/prism-okaidia.css")

const images = importAllImages(require.context('../screengrabs', false, /\.png/))


const PreviewButton = Styled.button`
  padding: 0.5rem 2rem;
  background: darkslategrey;
  color: white !important;
  border: none;
  border-raius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`

const Image = Styled.img`
  // max-width: 400px;
  width: auto;
  max-height: 500px;
  maring: 0 auto;
`

const Display = Styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: center ;
`



class FakeComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { markdownRemark } = this.props.data

    return (<>
      <Layout>
        <Display>
          <Image src={ images[markdownRemark.frontmatter.title.toLowerCase().replace(/\s+/g, '-')] } />
        </Display>
          <h1>{ markdownRemark.frontmatter.title }</h1>
        {/* <h1>{ markdownRemark.frontmatter.title }</h1>
        <div dangerouslySetInnerHTML={{
          __html: markdownRemark.html
        }} /> */}

        {/* <img src={ images`/${images[`${markdownRemark.frontmatter.title.toLowerCase().replace(/\s+/gi, '-')}.png`]}` } /> */}
        <a href={ markdownRemark.frontmatter.preview } target="_blank" >
          <PreviewButton>
            Preview
          </PreviewButton>
        </a>

        <hr />

        <pre>{
          JSON.stringify(this.props.data, 'utf8', 2)
        }</pre>

      </Layout>

    </>)
  }
}

// Magically wired up to the component!!
export const query = graphql`
  query archiveQuery($slug: String!) {
    markdownRemark(frontmatter: {
      slug: {
        eq: $slug
      }
    }) {
      html
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
