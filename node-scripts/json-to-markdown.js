const fs = require('fs')
const path = require('path')

console.log('__dirname', __dirname)

const jsonFile = require(path.join(__dirname, './dna-projects.json'))


function mdTemplate (content) {
  return [
    `---`,
    `bylines: "${content.author || ''}"`,
    `capi: "${content.capi || ''}"`,
    `date: "${content.date || ''}"`,
    `description: "${content.description || ''}"`,
    `preview: "${content.preview || ''}"`,
    `slug: "${content.title
      .toLowerCase().replace(/\s+/g, '-') || ''}"`,
    `tech: "${content.tech || ''}"`,
    `thumb: ""`,
    `title: "${content.title || ''}"`,
    `---`,
  ].join('\n')
}

jsonFile
  // .map(file => {
  //   const key = Object.keys(file)[0]
  //   return file[key]
  // })
  .filter(f => {
    console.log({ f })
    return f.title
  })
  .forEach(file => {
    console.log({ file })
    const filePath = path.join(
      __dirname,
      `./dna-projects/${!!file.title ? file.title.toLowerCase().replace(/\s+/g, '-') : 'blah'}.md`
    )
    console.log({ filePath })
    fs.writeFileSync(
      filePath,
      mdTemplate(file),
      console.log
    )
  })



