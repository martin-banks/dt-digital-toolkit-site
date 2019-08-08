import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'


export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (<>
      <nav>
        <ul>
          <li>
            <Link to={ '/' }>Home</Link>
          </li>
          <li>
            <Link to={ '/guides' }>Guides</Link>
          </li>
          <li>
            <Link to={ '/editors/news-map' }>News Map editor</Link>
          </li>
        </ul>
      </nav>
    
    </>)
  }

}
