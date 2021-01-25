import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, GraphicCard, BottomEdgeDown, BottomEdgeUp} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const GraphicCardInfoPage = () => {

    const {
      wpcontent: {
        page:{
          graphicCardsInfoMeta:{
          description,
          bannerImage}
        },
        graphic_Cards: {
          edges: graphicCardsMetas
        }
      }
    } = useStaticQuery(graphql`
   query {
  wpcontent {
    page(id: "Graphic Card Info", idType: URI) {
      graphicCardsInfoMeta {
        description
        bannerImage {
          sourceUrl
          imageFile{
                  childImageSharp{
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
          altText
        }
      }
    }
    graphic_Cards {
      edges {
        node {
          graphicCardsMeta {
            chipset
            clockSpeed
            memory
            typeOfMemory
            imageOfTheGraphicCard {
                altText
                sourceUrl
                imageFile{
                  childImageSharp{
                    fluid(quality: 100, grayscale: true) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
          }
          slug
        }
      }
    }
  }
}
`)


    return <Layout>
      <SEO title="Graphic Cards"/>
      <Wrapper graphiccardsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image fluid={bannerImage.imageFile.childImageSharp.fluid}/>
          <BottomEdgeDown color={COLORS.SECONDARY}/>
        </div>
        <div className="description">
          <h2>We are a heaven of graphical cards</h2>
          <p>{description}</p>
          <BottomEdgeUp color={COLORS.BLACK}/>
          
        </div>
        <div className="graphiccards">
          
          <h2>Our Graphical Cards</h2>
          <div className="graphiccard-items">
            {graphicCardsMetas.map(({node: {graphicCardsMeta, slug}})=>(
              <GraphicCard to={`/${slug}`} key={slug}>
                <Image fluid={graphicCardsMeta.imageOfTheGraphicCard.imageFile.childImageSharp.fluid} alt={graphicCardsMeta.imageOfTheGraphicCard.altText}/>
                <div className="graphiccard-info">
                  <p>{graphicCardsMeta.chipset} {graphicCardsMeta.memory} GB</p>
                </div>
              </GraphicCard>
              
            ))}
            
          </div>
        </div>
        
      </Wrapper>
      
    </Layout>
    
}

export default GraphicCardInfoPage
