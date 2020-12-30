import axios from 'axios'
let instance = axios.create({
  baseURL: 'localhost:3000',
  timeout: 30000
})
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  console.log(error)
})
instance.interceptors.response.use((response) => {
  return response
}, (err) => {
  return Promise.reject(err)
})

const get = (url, params) => {
  return instance({
    method: 'get',
    withCredentials: true,
    url,
    params,
    data: undefined
  })
}
const post = (url, data) => {
  return instance({
    method: 'post',
    url,
    data
  })
}
export {get, post}
