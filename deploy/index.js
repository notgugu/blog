const scpClient = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(`正在发布到你的服务器。。。。。。`)
const password = require('./password')
let Client = require('ssh2').Client
let conn = new Client()
conn.on('ready', () => {
  conn.exec('rm -rf /usr/local/nginx/dist/static\n rm -f /usr/local/nginx/dist/index.html', (err, stream) => {
    if (err) {
      throw err
    } else {
      stream.on('close', (code, signal) => {
        spinner.start()
        scpClient.scp('./dist', {
          host: '42.192.227.3',
          port: '22',
          username: 'root',
          password: password.password,
          path: '/usr/local/nginx/dist'
        }, (err) => {
          spinner.stop()
          if (err) {
            console.log(chalk.red('发布失败...\n'))
            throw err
          } else {
            console.log(chalk.green('发布成功！'))
          }
        })
        conn.end()
      })
    }
  })
})
conn.connect({
  host: '42.192.227.3',
  port: '22',
  username: 'root',
  password: password.password
})
