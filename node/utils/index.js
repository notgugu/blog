/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 09:29:08
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-10 10:46:23
 */
const mysql = require('mysql')
let pool = mysql.createPool({
  host: '42.192.227.3',
  user: 'root',
  password: '123456',
  database: 'blog',
  charset: 'UTF8MB4_GENERAL_CI'
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
