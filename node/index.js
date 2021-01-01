/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-30 16:11:08
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 22:51:51
 */
const mysql = require('mysql')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const app = express()
const secret = 'mxk'
let token = ''
console.log(jwt)
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
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog'
})

// function checkIsLogin (req) {
//   let headerToken = req.header.token
//   if (token) {
//     jwt.verify(headerToken, secret, (err, decode) => {
//       if (err) {
//         return false
//       } else {
//         return true
//       }
//     })
//   } else {
//     return true
//   }
// }

function mysqlQuery (sql, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('数据库错误：', err)
    } else {
      connection.query(sql, (err, res) => {
        connection.release()
        if (typeof callback === 'function') {
          callback(res, err)
        }
      })
    }
  })
}

app.get('/getArticleList', (req, res) => {
  let page = req.query.page
  let num = req.query.num
  let sql = `select * from articleList limit ${(page - 1) * num}, ${num}`
  mysqlQuery(sql, (result, err) => {
    if (result) {
      let total = result.length
      let data = result.map(item => {
        return {
          id: item.id,
          title: item.title,
          author: item.author,
          createTime: item.createTime,
          category: item.category,
          introduce: item.introduce,
          readCount: item.readCount,
          messageCount: item.messageCount,
          likeCount: item.likeCount,
          tags: item.tags && item.tags.split(',')
        }
      })
      res.json({
        code: 200,
        msg: 'success',
        data: {
          total,
          data
        }
      })
    } else {
      console.log(err)
      res.json({
        code: 400,
        msg: 'failed',
        data: null
      })
    }
  })
})

app.get('/getArticle', (req, res) => {
  let id = req.query.id
  let sql = `select * from articleList where id=${id}`
  mysqlQuery(sql, (result, err) => {
    if (result) {
      let data = result[0]
      res.json({
        code: 200,
        msg: 'success',
        data: {
          data
        }
      })
    } else {
      console.log(err)
      res.json({
        code: 400,
        msg: 'failed',
        data: null
      })
    }
  })
})

app.post('/addArticle', (req, res) => {
  let { title, author, introduce, content, category, tags } = req.body
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let readCount = 0
  let like = 0
  let messageCount = 0
  let sql = `insert into articleList (title,author,createTime,category,introduce,readCount,messageCount,likeCount,tags,content) value ("${title.replace(/"/g, '\\"')}","${author.replace(/"/g, '\\"')}","${createTime.replace(/"/g, '\\"')}","${category.replace(/"/g, '\\"')}","${introduce.replace(/"/g, '\\"')}",${readCount},${messageCount},${like},"${tags.replace(/"/g, '\\"')}","${content.replace(/"/g, '\\"')}")`
  console.log(sql)
  mysqlQuery(sql, (result, err) => {
    console.log(result)
    if (result) {
      res.json({
        code: 200,
        msg: 'success',
        data: null
      })
    } else {
      console.log(err)
      res.json({
        code: 400,
        msg: '数据库插入失败',
        data: null
      })
    }
  })
})

app.post('/login', (req, res) => {
  let {account, password} = req.body
  let sql = `select * from account where account=${account}`
  console.log(sql)
  mysqlQuery(sql, (result, err) => {
    if (result) {
      let data = result[0]
      if (data.account === account && data.password === password) {
        let payload = {account, password}
        token = jwt.sign(payload, secret)
        console.log(token)
        res.json({
          code: 200,
          msg: '登陆成功',
          data: {
            token
          }
        })
      } else {
        res.json({
          code: 400,
          msg: '登录失败',
          data: null
        })
      }
    } else {
      console.log(err)
      res.json({
        code: 400,
        msg: '登录失败',
        data: null
      })
    }
  })
})

http.createServer(app).listen(3000, () => {
  console.log('http://localhost:3000')
})
