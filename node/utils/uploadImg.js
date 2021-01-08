const fs = require('fs')
const path = require('path')
const multer = require('multer')
let createFolder = (folder) => {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}

let uploadFolder = path.resolve(__dirname, '../uploadImg')
createFolder(uploadFolder)
let storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})
const upload = multer({storage})

module.exports = upload
