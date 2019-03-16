const path = require('path')
const _ = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')

module.exports.onCreateNode = (node, actions, getNode) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

module.exports.createPages = async (actions, graphql) => {
  const { createPage } = actions;
  try {
    const blogData = await graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
                category
                templateKey
              }
            }
          }
        }
      }
  `)

  const posts = blogData.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/blog-post.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    let categories = []

    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }

      if (_.get(edge, `node.frontmatter.category`)) {
        categories.push(edge.node.frontmatter.category)
      }
    })

    // Eliminate duplicate tags
    tags = _.uniq(tags)

    categories = _.uniq(categories)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/articles/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })

    categories.forEach(category => {
      const categoryPath = `/articles/categories/${_.kebabCase(category)}/`

      createPage({
        path: categoryPath,
        component: path.resolve(`src/templates/categories.js`),
        context: {
          category,
        },
      })
    })
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}