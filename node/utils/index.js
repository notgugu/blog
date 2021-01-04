/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 09:29:08
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:32:22
 */
const mysql = require('mysql')
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'blog'
})

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
module.exports = mysqlQuery
