/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 08:56:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-31 13:11:26
 */
import axios from 'axios'
axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  console.log(error)
})
axios.interceptors.response.use((response) => {
  console.log(response)
  if (response.status === 200 || response.status === '200') {
    return response.data
  } else {
    return Promise.reject(response)
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
