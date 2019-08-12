import React, { Component } from 'react'
import Styled from 'styled-components'
import { Link } from 'gatsby'

const Nav = Styled.nav`
  // background: #333;
  & a {
    color: #333;
    text-decoration: none;
    &:hover {
      // color: #eee;
    };
  };
  & ul {
    padding: 0;
    margin: 0;
  };
  & li {
    padding: 0.5rem 1rem;
    margin: 0;
    &:hover {
      background: #ccc;
    }
  };
`


export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (<>
      <Nav>
        <ul>
          <Link to={ '/' }><li>Home</li></Link>
          <Link to={ '/dt-archive' }><li>DT Archive</li></Link>
          <Link to={ '/dna-archive' }><li>DNA Archive</li></Link>
          <Link to={ '/guides' }><li>Guides</li></Link>
          {/* <Link to={ '/editors/news-map' }><li>News Map editor</li></Link> */}
        </ul>
      </Nav>
    
    </>)
  }

}
