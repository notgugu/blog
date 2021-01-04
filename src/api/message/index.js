/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-03 11:39:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:41:55
 */
import http from '@/utils/request'
export function getComment (params) {
  return http.get('/comment/getComment', params)
}

export function addComment (data) {
  return http.post('/comment/addComment', data)
}
