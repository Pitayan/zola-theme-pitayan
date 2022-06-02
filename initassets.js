const fs = require("fs")
const path = require("path")

const initCssDir = 'static/css'
const initJSDir = 'static/js'

if(!fs.existsSync(initCssDir)) {
  fs.mkdirSync(initCssDir)

  const cssFile = path.resolve(initCssDir, "style.css")
  fs.writeFileSync(cssFile, "")
}

if (!fs.existsSync(initJSDir)) {
  fs.mkdirSync(initJSDir)

  const scriptFile = path.resolve(initJSDir, "script.js")
  fs.writeFileSync(scriptFile, "")
}
