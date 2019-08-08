/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


const path = require('path')


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // createPage({
  //   path: '/fake',
  //   component: path.resolve('./src/components/fake-component.js')
  // })

  return new Promise((resolve, reject) => {
    graphql(`{
      allMarkdownRemark {
        edges {
          node {
            timeToRead
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }`).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.slug,
          component: path.resolve('./src/components/fake-component.js'),
          context: {
            slug: node.frontmatter.slug
          },
        })
      })
      resolve()
    })
  })
}

