/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 09:22:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-06 13:40:07
 */
const express = require('express')
const mysqlQuery = require('../utils/index')
const router = express.Router()

router.get('/getArticleList', (req, res) => {
  let page = req.query.page
  let num = req.query.num
  let sql1 = `select * from articleList limit ${(page - 1) * num}, ${num}`
  let sql2 = `select id from articleList`
  mysqlQuery(sql1, (result, err) => {
    if (result) {
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
          tags: item.tags && item.tags.split(',')
        }
      })
      mysqlQuery(sql2, (result, err) => {
        if (result) {
          let total = result.length
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

router.get('/getHotArticleList', (req, res) => {
  let sql = `select * from articleList order by id limit 10`
  mysqlQuery(sql, (result, err) => {
    if (result) {
      let data = result.sort((a, b) => {
        return b.readCount - a.readCount
      }).map(item => {
        return {
          id: item.id,
          title: item.title
        }
      })
      res.json({
        code: 200,
        msg: 'success',
        data
      })
    } else {
      res.json({
        code: 400,
        msg: err,
        data: null
      })
    }
  })
})

router.get('/getNewArticleList', (req, res) => {
  let sql = `select * from articleList order by id desc limit 10`
  mysqlQuery(sql, (result, err) => {
    if (result) {
      let data = result.map(item => {
        return {
          id: item.id,
          title: item.title
        }
      })
      res.json({
        code: 200,
        msg: 'success',
        data
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

router.get('/getArticle', (req, res) => {
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

router.post('/addReadCount', (req, res) => {
  let { id } = req.body
  let readCount
  let sql1 = `select readCount from articleList where id=${id}`
  new Promise((resolve, reject) => {
    mysqlQuery(sql1, (result, err) => {
      if (result) {
        readCount = result[0].readCount
        console.log(result, readCount)
        resolve()
      } else {
        reject(err)
      }
    })
  }).then(() => {
    let sql2 = `update articleList set readCount=${readCount + 1} where id=${id}`
    mysqlQuery(sql2, (result, err) => {
      if (result) {
        res.json({
          code: 200,
          msg: 'success',
          data: null
        })
      } else {
        res.json({
          code: 400,
          msg: err,
          data: null
        })
      }
    })
  }).catch(err => {
    res.json({
      code: 400,
      msg: err,
      data: null
    })
  })
})

module.exports = router
