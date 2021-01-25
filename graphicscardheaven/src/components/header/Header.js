import React from "react"
import { Link, useStaticQuery, graphql} from "gatsby"
import PropTypes from "prop-types"
import Menu from "./Menu"
import {HeaderWrapper, Image} from './headerStyles/headerStyles'

const Header = ({ siteTitle }) => {
  const {
    logo,
    wpcontent: {menuItems} ,} = useStaticQuery(graphql`
  query{
    logo: file(relativePath: {eq: "logowhite.png.png"}) {
      childImageSharp {
        fixed(quality: 100, width: 90) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    wpcontent {
    menuItems {
      edges {
        node {
          label
          path
        }
      }
    }
  }
  }
  `)

  return <HeaderWrapper>
    <Link to="/">
      <Image alt="Logo graphic card heaven" fixed={logo.childImageSharp.fixed}/>
    </Link>
    <Menu menuItems={menuItems.edges} />
  </HeaderWrapper>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
