
const fs = require('fs')
const path = require('path')

const fileToWatch = path.resolve("assets/js/script.js")
const targetFile = path.resolve("static/js/script.js")

if (process.env.NODE_ENV == 'development') {
  fs.copyFileSync(fileToWatch, targetFile)
  fs.watchFile(fileToWatch, function(curr, prev) {
    console.log(`target file updated: ${targetFile}`)
    fs.copyFileSync(fileToWatch, targetFile)
  })
} else if (process.env.NODE_ENV == 'production') {
  fs.copyFileSync(fileToWatch, targetFile)
}
