/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 13:37:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 13:46:19
 */

function throttle (fun, interval) {
  let flag = true
  return function (...args) {
    let that = this
    if (!flag) {
      return
    }
    flag = false
    setTimeout(() => {
      fun.apply(that, args)
    }, interval)
  }
}

function debounce (fun, interval) {
  let timer = null
  return function (...args) {
    let that = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fun.apply(that, args)
    }, interval)
  }
}

export { throttle, debounce }
