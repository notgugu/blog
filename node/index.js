/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-30 16:11:08
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-06 17:08:11
 */
const https = require('https')
const http = require('http')
const fs = require('fs')
const express = require('express')
const articleRouter = require('./routes/article')
const commentRouter = require('./routes/comment')
const adminRouter = require('./routes/admin')
const bodyParser = require('body-parser')
const app = express()
const httsOptions = {
  key: fs.readFileSync('./keys/maxiankuai.com.key'),
  cert: fs.readFileSync('./keys/maxiankuai.com_bundle.pem')
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type,token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'OPTIONS') {
    res.send('200')
  } else {
    next()
  }
})

app.use('/article', articleRouter)
app.use('/comment', commentRouter)
app.use('/admin', adminRouter)

https.createServer(httsOptions, app).listen(3000, () => {
  console.log('http://localhost:3000')
})

http.createServer(app).listen(3001, () => {
  console.log('http://localhost:3001')
})
