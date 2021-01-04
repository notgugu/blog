/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 13:37:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 16:07:41
 */

function throttle (fun, interval) {
  let time = 0
  return function (...args) {
    let that = this
    let nowTime = new Date()
    if (nowTime - time > interval) {
      fun.apply(that, args)
    }
    time = nowTime
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
