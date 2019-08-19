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
      }
    }`).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        // DT cotent archive
        createPage({
          path: `/dt-archive${node.frontmatter.slug}`,
          component: path.resolve('./src/components/project-detail.js'),
          context: {
            slug: node.frontmatter.slug,
            metadata: node.frontmatter,
          },
        })
        createPage({
          path: `/dna-archive${node.frontmatter.slug}`,
          component: path.resolve('./src/components/project-detail.js'),
          context: {
            slug: node.frontmatter.slug,
            metadata: node.frontmatter,
          },
        })

        createPage({
          path: `/guides${node.frontmatter.slug}`,
          component: path.resolve('./src/components/fake-component.js'),
          context: {
            slug: node.frontmatter.slug,
            timeToRead: node.timeToRead,
            metadata: node.frontmatter,
            html: node.html
          },
        })
      })
      resolve()
    })
  })
}

