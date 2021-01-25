import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import {Wrapper, Image} from './templateStyles/graphiccardStyles'


const ProductTemplate = ({data: 
    {wpcontent:{ 
      graphic_Card:{ 
        graphicCardsMeta,
        brands: {edges:brands},
      },
    },
  },
  }) => {
    
      return (
        <Layout>
          <SEO title="Graphical-Card"/>
          <Wrapper>
            <div className="graphiccard-container">
              <div className="graphiccard-picture">
              <Image fluid={graphicCardsMeta.imageOfTheGraphicCard.imageFile.childImageSharp.fluid}/>
            <div className="make">
              {brands.map(({node:brand})=> (
                <div className="brand">{brand.name}</div>
              ))}
            </div>
            </div>
            <div className="graphiccard-info">
              <h2>{graphicCardsMeta.chipset} {graphicCardsMeta.memory} GB</h2>
              
                <h3><span>{graphicCardsMeta.chipset} </span> </h3>
   
            </div>
            </div>
  
          </Wrapper>
        </Layout>
      )
  }
  
  export default ProductTemplate









export const pageQuery = graphql`
query ($id: ID!){
wpcontent {
    graphic_Card(id: $id, idType: ID) {
      brands {
        edges {
          node {
            name
          }
        }
      }
      graphicCardsMeta {
        chipset
        clockSpeed
        fieldGroupName
        memory
        typeOfMemory
        imageOfTheGraphicCard {
            
          altText
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 50) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          
        }
      }
      id
    }
  }
}
`