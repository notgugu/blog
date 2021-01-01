/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 08:56:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 21:52:17
 */
import axios from 'axios'
import storage from './storage'
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use((config) => {
  let token = storage.getLocalStorage('token') || ''
  if (token) {
    config.headers.token = token
  }
  return config
}, (error) => {
  console.log(error)
})
axios.interceptors.response.use((response) => {
  let data = response.data
  if (data.code === 200 || data.code === '200') {
    return data.data
  } else {
    return Promise.reject(data)
  }
}, (err) => {
  return Promise.reject(err)
})

const get = (url, params) => {
  return axios({
    method: 'get',
    url,
    params
  })
}
const post = (url, data) => {
  return axios({
    method: 'post',
    url,
    data
  })
}
export default {get, post}
