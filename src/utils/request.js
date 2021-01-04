/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 08:56:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 21:13:00
 */
import axios from 'axios'
import storage from './storage'
import router from '../router'
import { MessageBox } from 'element-ui'
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use((config) => {
  let token = storage.getSessionStorage('token') || ''
  if (token) {
    config.headers.token = token
  }
  return config
}, (error) => {
  console.log(error)
})
axios.interceptors.response.use((response) => {
  let data = response.data
  console.log(data)
  if (data.code === 200 || data.code === '200') {
    return data.data
  } else if (data.code === 403) {
    MessageBox.alert(data.msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      router.push('/login')
    }).catch(() => {
      console.log('fail')
    })
    return Promise.reject(data)
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
