/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 09:22:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:37:20
 */
const express = require('express')
const mysqlQuery = require('../utils/index')
const moment = require('moment')
const router = express.router()

router.get('/getComment', (req, res) => {
  let sql = `select * from commentList`
  mysqlQuery(sql, (result, err) => {
    console.log(result)
    if (result && result.length > 0) {
      let data = result.map(item => {
        return {
          content: JSON.parse(item.content)
        }
      })
      res.json({
        code: 200,
        msg: 'success',
        data: {
          data
        }
      })
    } else {
      if (err) {
        console.log(err)
        res.json({
          code: 400,
          msg: 'failed',
          data: null
        })
      } else {
        res.json({
          code: 200,
          msg: '暂无评论',
          data: {}
        })
      }
    }
  })
})

router.post('/addComment', (req, res) => {
  let {nickName, comment} = req.body
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let content = {nickName, comment, createTime}
  content = JSON.stringify(content)
  let sql = `insert into commentList (content) values ('${content}')`
  mysqlQuery(sql, (result, err) => {
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
        msg: err,
        data: null
      })
    }
  })
})

router.get('/getArticleComment', (req, res) => {
  let id = req.query.id
  let sql = `select * from articleComment where id=${id}`
  mysqlQuery(sql, (result, err) => {
    console.log(result)
    if (result && result.length > 0) {
      let data = JSON.parse(result[0].content).commentList
      res.json({
        code: 200,
        msg: 'success',
        data: {
          data
        }
      })
    } else {
      if (err) {
        console.log(err)
        res.json({
          code: 400,
          msg: 'failed',
          data: null
        })
      } else {
        res.json({
          code: 200,
          msg: '暂无评论',
          data: {}
        })
      }
    }
  })
})

router.post('/addArticleComment', (req, res) => {
  let {id, nickName, comment} = req.body
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let sql = `select * from articleComment where id=${id}`
  mysqlQuery(sql, (result, err) => {
    if (result && result.length > 0) {
      console.log(result)
      let commentList = JSON.parse(result[0].content).commentList
      commentList.push({
        nickName,
        comment,
        createTime
      })
      let messageCount = commentList.length
      commentList = JSON.stringify({commentList})
      sql = `update articleComment set content='${commentList}' where id=${id}`
      mysqlQuery(sql, (result, err) => {
        if (result) {
          sql = `update articleList set messageCount=${messageCount} where id=${id}`
          mysqlQuery(sql, (result, err) => {
            if (result) {
              console.log(result)
            } else {
              console.log(err)
            }
          })
          res.json({
            code: 200,
            msg: 'success',
            data: null
          })
        } else {
          console.log(err)
          res.json({
            code: 400,
            msg: 'fail',
            data: null
          })
        }
      })
    } else if (result) {
      let commentList = []
      commentList.push({
        nickName,
        createTime,
        comment
      })
      let messageCount = commentList.length
      commentList = JSON.stringify({
        commentList
      })
      sql = `insert into articleComment values (${id},'${commentList}')`
      mysqlQuery(sql, (result, err) => {
        if (result) {
          sql = `update articleList set messageCount=${messageCount} where id=${id}`
          mysqlQuery(sql, (result, err) => {
            if (result) {
              console.log(result)
            } else {
              console.log(err)
            }
          })
          res.json({
            code: 200,
            msg: 'success',
            data: null
          })
        } else {
          console.log(err)
          res.json({
            code: 400,
            msg: err,
            data: null
          })
        }
      })
    } else {
      console.log(err)
      res.json({
        code: 400,
        msg: err,
        data: null
      })
    }
  })
})

module.exports = router
