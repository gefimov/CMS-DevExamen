const { POINT_CONVERSION_COMPRESSED } = require("constants");
const {graphql} = require("gatsby")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path");

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions
return graphql(`
    {
    wpcontent {
    graphic_Cards {
      edges {
        node {
          slug
          id
        }
      }
    }
  }
}
`).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
}

const products = result.data.wpcontent.graphic_Cards.edges
  products.forEach(graphic_Cards => {
    const {id,slug} = graphic_Cards.node
    createPage({
      path:slug,
      component: path.resolve(`src/components/templates/graphiccard.js`),
      context: {
        id,
        slug
      },
    })
  })
})
} 

/**/ 

exports.createResolvers = async ({
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  }) => {
    const { createNode } = actions
  
    await createResolvers({
      WPGraphql_MediaItem: {
        imageFile: {
          type: "File",
          async resolve(source) {
            let sourceUrl = source.sourceUrl
  
            if (source.mediaItemUrl !== undefined) {
              sourceUrl = source.mediaItemUrl
            }
  
            return await createRemoteFileNode({
              url: encodeURI(sourceUrl),
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            })
          },
        },
      },
    })
  }