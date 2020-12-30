/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 16:02:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-29 16:09:54
 */
const storage = {
  setLocalStorage (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  },
  getLocalStorage (key) {
    return localStorage.getItem(key)
  },
  removeLocalStorage (key) {
    localStorage.removeItem(key)
  },
  setSessionStorage (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    sessionStorage.setItem(key, value)
  },
  getSessionStorage (key) {
    return sessionStorage.getItem(key)
  },
  removeSessionStorage (key) {
    sessionStorage.removeItem(key)
  }
}
export default storage
