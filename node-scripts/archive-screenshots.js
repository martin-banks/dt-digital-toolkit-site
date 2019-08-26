const pup = require('puppeteer')
const frontMatter = require('front-matter')
const fs = require('fs')
const path = require('path')
// const importAllImages = require('./src/helpers/import-all-images')

const blacklist = [
  '.DS_Store',
]

const dir = 'new-md-files'

async function wait () {
  return new Promise((resolve, reject) => {
    console.log('starting wait')
    setTimeout(() => {
      console.log('still waiting...')
      resolve()
    }, 5000)
  })
}

;(async () => {
  const mdFiles = fs.readdirSync(
    path.join(__dirname, `../src/${dir}`),
    (err, files) => {
      if (err) return console.log('Error reading directory ->\n', err)
    }
  )
    .filter(f => blacklist.indexOf(f))

  for (file of mdFiles) {
    console.log({ file })
    const browser = await pup.launch()
    try {
      const fileContent = fs.readFileSync(
        path.join(__dirname, `../src/${dir}/${file}`),
        (err, content) => {
          if (err) throw err
        }
      )
      const previewUrl = frontMatter(fileContent.toString()).attributes.preview

      if (previewUrl && previewUrl.length) {
        const slug = frontMatter(fileContent.toString())
          .attributes
          .slug
          .toLowerCase()
          .replace(/\//gi, '')
  
        const title = frontMatter(fileContent.toString())
         .attributes
         .title
         .toLowerCase()
         .replace(/\s+/g, '-')
  
        const page = await browser.newPage()
        page.setViewport({
          width: 650,
          height: 940,
          deviceScaleFactor: 1,
        })
        await page.goto(
          previewUrl,
          { waitUntil: 'networkidle2' }
        )
  
        await wait()
        console.log('waited... ', title)
        await page.screenshot({ path: `./src/screengrabs/${slug}.png`})
        await browser.close()
      }
    } catch (err) {
      console.log({ err })
    }
  }
})()


