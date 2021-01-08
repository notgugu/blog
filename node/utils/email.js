/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 14:12:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 22:49:10
 */
const nodeemailer = require('nodemailer')
function sendEmail (to) {
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
    to,
    subject: 'hello',
    text: '您好,感谢您的留言,您于本博客的留言已被回复，请注意查收。'
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

module.exports = sendEmail
