/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 15:11:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 15:16:37
 */
const emailValidate = function (email) {
  if (email) {
    // eslint-disable-next-line no-useless-escape
    let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    return reg.test(email)
  } else {
    return false
  }
}

export { emailValidate }
