// Makes a simple ./static/css/index.css file right after "clean" so there *is* one
// ... thus keeping Zola from erroring out when you do `npm run start` (dev mode)

const fs = require("fs")
const initDir = 'static/css'
const initCSSFile = 'static/css/style.css'
const initValue = `
  body {
    color: green;
    background-color: yellow;
    font-family: monospace;
  }
`

if(!fs.existsSync(initDir)) {
  fs.mkdirSync(initDir)
}
if(!fs.existsSync(initCSSFile)) {
  fs.writeFileSync(initCSSFile, initValue)
}
