/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-30 16:11:08
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-03 19:57:52
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
let isCheckLogin = false
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

app.get('/getHotArticleList', (req, res) => {
  let sql = `select * from articleList`
  mysqlQuery(sql, (result, err) => {
    if (result) {
      let data = result.sort((a, b) => {
        return b.readCount - a.readCount
      }).slice(0, 10).map(item => {
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

app.get('/getComment', (req, res) => {
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

app.post('/addComment', (req, res) => {
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

app.get('/getArticleComment', (req, res) => {
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

app.post('/addArticleComment', (req, res) => {
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

app.post('/addArticle', async (req, res) => {
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

app.post('/addReadCount', (req, res) => {
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

app.post('/putArticle', async (req, res) => {
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
