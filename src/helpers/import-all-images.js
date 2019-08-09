// WARNING!!
// This import function will import all images, regardless of whether they are used or not
// be sure to move unused images to a different location

function importAllImages (req) {
  const images = {}
  req.keys()
    .forEach(item => {
      const imageName = item
        .replace('./', '')
        .replace(/\.js|\.jpg|\.png/g, '')
      images[imageName] = req(item)
    })
  return images
}

export default importAllImages
