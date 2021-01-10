/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 09:22:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-09 15:01:19
 */
const express = require('express')
const mysqlQuery = require('../utils/index')
const moment = require('moment')
const router = express.Router()

router.get('/getComment', (req, res) => {
  let sql = `select * from commentList`
  mysqlQuery(sql, (result, err) => {
    console.log(result)
    if (result && result.length > 0) {
      let data = result.map(item => {
        return {
          content: {
            id: item.id,
            email: item.email,
            createTime: item.createTime,
            comment: item.comment,
            nickName: item.nickName,
            review: item.review,
            reviewTime: item.reviewTime
          }
        }
      })
      res.json({
        code: 200,
        msg: 'success',
        data
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
          data: []
        })
      }
    }
  })
})

router.post('/addComment', (req, res) => {
  let {nickName, email, comment} = req.body
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let sql = `insert into commentList (nickName,email,createTime,comment) values ('${nickName}','${email}','${createTime}','${comment}')`
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
      let data = result.map(item => {
        return {
          email: item.email,
          createTime: item.createTime,
          comment: item.comment,
          nickName: item.nickName
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

router.post('/addArticleComment', (req, res) => {
  let {id, nickName, email, comment} = req.body
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let sql = `insert into articleComment values (${id},'${comment}','${nickName}','${email}','${createTime}')`
  mysqlQuery(sql, (result, err) => {
    if (result) {
      sql = `select * from articleComment where id=${id}`
      mysqlQuery(sql, (result, err) => {
        if (result) {
          let messageCount = result.length
          sql = `update articleList set messageCount=${messageCount} where id=${id}`
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

// router.post('/deleteComment', (req, res) => {
//   let { id } = req.body
// })

module.exports = router
