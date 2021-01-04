/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 09:23:00
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:39:42
 */
const express = require('express')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const mysqlQuery = require('../utils/index')
const router = express.router()
const secret = 'mxk'
let token = ''
let isCheckLogin = false

function checkIsLogin (req) {
  let headerToken = req.headers.token
  if (headerToken) {
    jwt.verify(headerToken, secret, (err, decode) => {
      console.log(err, decode)
      if (err) {
        isCheckLogin = false
      } else {
        isCheckLogin = true
      }
    })
  } else {
    isCheckLogin = false
  }
}

router.post('/login', (req, res) => {
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

router.post('/addArticle', async (req, res) => {
  checkIsLogin(req)
  if (!isCheckLogin) {
    res.json({
      code: 403,
      msg: '该功能仅登录后可使用',
      data: null
    })
    return
  }
  isCheckLogin = false
  let { title, author, introduce, content, category, tags } = req.body
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let readCount = 0
  let messageCount = 0
  let sql = `insert into articleList (title,author,createTime,category,introduce,readCount,messageCount,tags,content) value ("${title.replace(/"/g, '\\"')}","${author.replace(/"/g, '\\"')}","${createTime.replace(/"/g, '\\"')}","${category.replace(/"/g, '\\"')}","${introduce.replace(/"/g, '\\"')}",${readCount},${messageCount},"${tags.replace(/"/g, '\\"')}","${content.replace(/"/g, '\\"')}")`
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

router.post('/putArticle', async (req, res) => {
  checkIsLogin(req)
  console.log(isCheckLogin)
  if (!isCheckLogin) {
    res.json({
      code: 403,
      msg: '该功能仅登录后可使用',
      data: null
    })
    return
  }
  isCheckLogin = false
  let { id, articleData } = req.body
  let sql = `update articleList set title="${articleData.title.replace(/"/g, '\\"')}",author="${articleData.author.replace(/"/g, '\\"')}",category="${articleData.category.replace(/"/g, '\\"')}",introduce="${articleData.introduce.replace(/"/g, '\\"')}",tags="${articleData.tags.replace(/"/g, '\\"')}",content="${articleData.content.replace(/"/g, '\\"')}" where id=${id}`
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

module.exports = router
