/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-08 21:00:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-09 14:50:02
 */
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
// let uploadFolder = path.resolve(__dirname, '../uploadImg')
// 服务器目录 本地运行会报错
let uploadFolder = path.resolve(__dirname, '../../nginx/dist/uploadImg')
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
