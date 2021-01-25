import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, GraphicCard, BottomEdgeDown, BottomEdgeUp} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
          homePageDescription,
          homePageHeaderTitle,
          bannerPicture,
          featuredProducts
        }
      }
    }
  } = useStaticQuery(graphql`
  query{
    wpcontent {
    page(id: "home", idType: URI) {
      homePageMeta {
        homePageDescription
        homePageHeaderTitle
        bannerPicture {
          altText
          sourceUrl
          imageFile{
            childImageSharp{
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        featuredProducts {
          ... on WPGraphql_Graphic_Card {
            id
            slug
            graphicCardsMeta {
              chipset
              clockSpeed
              fieldGroupName
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
          }
        }
      }
    }
  }
  }
  
  `);
  
  return (
  <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image 
        fluid={bannerPicture.imageFile.childImageSharp.fluid} 
        alt={bannerPicture.altText}
        />
      
        <div className="inner-div">
          <p className="header-title">{homePageHeaderTitle}</p>
          <p className="header-description">{homePageDescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
      <div className="description">
        <p>{homePageDescription}</p>
        <BottomEdgeUp color = {COLORS.PRIMARY}/>
      </div>
      <div className="graphiccards">
        <h2>Featured Graphic Cards</h2>
        <div className="graphiccard-items">
          {featuredProducts.map(({graphicCardsMeta, slug}) => (
            <GraphicCard to={`/${slug}`}>
              <Image fluid={graphicCardsMeta.imageOfTheGraphicCard.imageFile.childImageSharp.fluid} altText={graphicCardsMeta.imageOfTheGraphicCard.altText}/>
              <div className="graphiccard-info">
                <p>{graphicCardsMeta.chipset} {graphicCardsMeta.memory + "GB"}</p>
                <p>Meer info</p>
              </div>
            </GraphicCard>
          ) )}
        </div>
      </div>
    </Wrapper>
  </Layout>
  )
}

export default IndexPage
