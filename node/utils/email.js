/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 14:12:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 14:25:55
 */
const nodeemailer = require('nodemailer')
let transporter = nodeemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnection: true,
  auth: {
    user: '534957983@qq.com',
    pass: 'mimkxmjwqklxcahc'
  }
})
let mailOptions = {
  from: '"凡" <534957983@qq.com>',
  to: 'maxiankuai@vandream.com',
  subject: 'hello',
  text: '你好啊'
}
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log(info)
  }
})
