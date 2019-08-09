/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Styled from 'styled-components'

import Header from "./header"
import Nav from './nav'

import "./layout.css"

const Content = Styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  background: #e2e2e2;
  margin: 0 auto;
  // max-width: 1200px;

`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={ data.site.siteMetadata.title } />
      <Content>
        <Nav />
        <div
          style={{
            // margin: `0 auto`,
            // maxWidth: 1200,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{ children }</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>

      </Content>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
