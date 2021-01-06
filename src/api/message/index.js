/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-03 11:39:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-06 14:08:38
 */
import http from '@/utils/request'
export function getComment (params) {
  return http.get('/comment/getComment', params)
}

export function addComment (data) {
  return http.post('/comment/addComment', data)
}

export function reviewComment (data) {
  return http.post('/admin/reviewComment', data)
}
export function deleteComment (data) {
  return http.post('/admin/deleteComment', data)
}
