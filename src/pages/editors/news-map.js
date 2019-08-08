import React, { Component } from "react"
import { Link } from "gatsby"
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Layout from "../../components/layout"
import Image from "../../components/image"
import SEO from "../../components/seo"


const PageContent = styled.section`
  box-sizing: border-box;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 2fr;
`
const EmbedPreview = styled.div`
  // outline: solid 1px pink
  padding: 1rem;
  background: #fff;
`
const Input = styled.input`
  box-sizing: border-box;
  display: block;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
`
const TextArea = styled.textarea`
  box-sizing: border-box;
  display: block;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
`
const Label = styled.label`
  box-sizing: border-box;
  display: block;
  font-size: 1rem;
`
const Loading = styled.div`
  box-sizing: border-box;
  backdrop-filter: blur(4px);
  background: rgba(0,0,0, 0.6);
  color: white;
  font-size: 2rem;
  height: 100vh;
  left: 0;
  position: fixed;
  padding-top: 30vh;
  top: 0;
  text-align: center;
  width: 100vw;
  z-index: 9999;
  &:before {
    content: 'Loading...';
  }
`


class NewsMapEditorPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: null,
    }

    this.storeContent = this.storeContent.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateIntro = this.updateIntro.bind(this)
    this.updateMapLat = this.updateMapLat.bind(this)
    this.updateMapLng = this.updateMapLng.bind(this)

    this.updateContent = this.updateContent.bind(this)
  }

  storeContent () {
    console.log('checking for content...')
    if (window.mapContent) {
      this.setState({ content: window.mapContent })
      console.log('content saved', this.state)
    } else {
      setTimeout(this.storeContent, 100)
    }
  }

  updateTitle (e) {
    const { content } = this.state
    content.header.title = e.target.value
    this.setState({ content })
    window.mapContent = this.state.content
  }
  updateIntro (e) {
    const { content } = this.state
    content.header.intro = e.target.value
    this.setState({ content })
    window.mapContent = this.state.content
  }
  updateMapLat (e) {
    const { content } = this.state
    content.mapConfig.map.coords[0] = e.target.value
    this.setState({ content })
    window.mapContent = this.state.content
  }
  updateMapLng (e) {
    const { content } = this.state
    content.mapConfig.map.coords[1] = e.target.value
    this.setState({ content })
    window.mapContent = this.state.content
  }
  updateContent (type, e) {
    console.log(arguments)
    console.log({ e }, type.target)
    const { content } = this.state
    content.mapConfig.map.coords[1] = e.target.value
    this.setState({ content })
    window.mapContent = this.state.content
  }

  componentDidMount () {
    this.storeContent()
    setTimeout(() => {
      const head = document.querySelector('head')
      const appScript = document.createElement('script')
      appScript.setAttribute('src', 'http://martins-mbp.news.newslimited.local:7777/static/js/app.js')
      appScript.setAttribute('type', 'text/javascript')
      head.appendChild(appScript)
    }, 1000)
  }

  render () {
    return <>
      <Layout>
        <SEO title="News Map editor" />

        <PageContent>
          {
            this.state.content ? 
            <form>
              <h1>News map editor</h1>
              <Label>Title</Label>
              <Input
                placeholder="Enter a main title"
                value={ 
                  this.state.content
                    ? this.state.content.header.title
                    : '---'
                }
                onChange={ this.updateTitle }
              />
              <Label>Introduction</Label>
              <TextArea
                placeholder="Enter an introduction"
                rows="5"
                value={ 
                  this.state.content
                    ? this.state.content.header.intro
                    : '---'
                }
                onChange={ this.updateIntro }
              />
              <hr/>

              <h4>Map options</h4>

              <Label>Coords Lat</Label>
              <Input value={ this.state.content.mapConfig.map.coords[0] } onChange={ this.updateMapLat } />
              <Label>Coords Lng</Label>
              <Input value={ this.state.content.mapConfig.map.coords[1] } onChange={ this.updateMapLng } />

              <hr/>

              <h4>Markers</h4>
                {
                  this.state.content.mapConfig.map.markers.map((m, i) => (
                    <div>
                      <Label>Marker title - { i }</Label>
                      <Input value={ m.popup.title } onChange={ this.updateContent.bind(null, 'title') } />
                      <Label>Marker caption - { i }</Label>
                      <TextArea value={ m.popup.caption } rows="5" onChange={ this.updateContent.bind(null, 'caption') } />
                    </div>
                  ))
                }
              <hr />
            </form>
            : <p>Loading content...</p>
          }

          <EmbedPreview>
            <div id="app_dna-news-map"></div>
            <div>
              <Helmet>
                <link rel="stylesheet"
                  href="http://martins-mbp.news.newslimited.local:7777/static/css/app.css" />
                <script type="text/javascript" src="http://martins-mbp.news.newslimited.local:7777/static/content.js"></script>
                <script type="text/javascript"
                  src="http://martins-mbp.news.newslimited.local:7777/static/js/manifest.js"></script>
                <script type="text/javascript"
                  src="http://martins-mbp.news.newslimited.local:7777/static/js/vendor.js"></script>
                  
                  {/* This file is added dynamicaly on render to resolve unknown errors */}
                  {/* // TODO What find more elegant soliution to loading error; async issue? */}
                {/* <script type="text/javascript"
                  src="http://martins-mbp.news.newslimited.local:7777/static/js/app.js"></script> */}
              </Helmet>
            </div>

          </EmbedPreview>


        </PageContent>


        { !this.state.content && <Loading /> }

      </Layout>
    </>
  }

}


export default NewsMapEditorPage
