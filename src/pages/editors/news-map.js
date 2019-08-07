import React, { Component } from "react"
import { Link } from "gatsby"
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Layout from "../../components/layout"
import Image from "../../components/image"
import SEO from "../../components/seo"


const PageContent = styled.section`
  box-sizing: border-box
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 2fr;
`
const EmbedPreview = styled.div`
  outline: solid 1px pink
`
const Input = styled.input`
  box-sizing: border-box
  display: block
  font-size: 1rem
  margin-bottom: 1rem
  padding: 0.5rem
  width: 100%
`
const TextArea = styled.textarea`
  box-sizing: border-box
  display: block
  font-size: 1rem
  margin-bottom: 1rem
  padding: 0.5rem
  width: 100%
`
const Label = styled.label`
  box-sizing: border-box
  display: block
  font-size: 1rem
`


class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: null,
    }

    this.storeContent = this.storeContent.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateIntro = this.updateIntro.bind(this)
  }

  storeContent () {
    console.log('checking for content...')
    if (window.mapContent) {
      this.setState({ content: window.mapContent })
      console.log('content saved', this.state)
    } else {
      setTimeout(this.storeContent, 3000)
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
          </form>

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
                  
                {/* <script type="text/javascript"
                  src="http://martins-mbp.news.newslimited.local:7777/static/js/app.js"></script> */}
              </Helmet>
            </div>

          </EmbedPreview>


        </PageContent>


      </Layout>
    </>
  }

}


export default Page
