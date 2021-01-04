/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 21:48:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:42:29
 */
import http from '@/utils/request'
export function getArticle (params) {
  return http.get('/article/getArticle', params)
}

export function addReadCount (data) {
  return http.post('/article/addReadCount', data)
}

export function getArticleComment (params) {
  return http.get('/comment/getArticleComment', params)
}

export function addArticleComment (data) {
  return http.post('/comment/addArticleComment', data)
}
