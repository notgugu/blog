/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 08:56:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-31 10:57:00
 */
const mock = require('mockjs')
const random = mock.Random
const api = {
  getArticleList: '/getArticleList'
}
mock.mock(RegExp(api.getArticleList + '.*'), 'get', (option) => {
  let params = getParams(option.url, api.getArticleList)
  let data = []
  let article = null
  for (let i = 0; i < params.num; i++) {
    article = {
      id: random.id(params.page, params.page * 10),
      title: random.ctitle(15),
      author: 'mxk',
      createTime: random.date('yyyy-mm-dd hh:mm:ss'),
      category: random.cword(2),
      introduce: random.csentence(30, 100),
      readCount: random.natural(300, 1000),
      messageCount: random.natural(0, 100),
      like: random.natural(0, 300),
      tags: [random.word(), random.word()]
    }
    data.push(article)
  }
  return {data, total: 58}
})
function getParams (url, api) {
  let hash
  let params = url.substring(api.length + 1, url.length)
  let jsonData = {}
  let hashes = params.split('&')
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=')
    jsonData[hash[0]] = hash[1]
  }
  return jsonData
}
