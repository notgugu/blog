/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 21:48:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-02 17:13:05
 */
import http from '@/utils/request'
export function getArticle (params) {
  return http.get('/getArticle', params)
}

export function addReadCount (data) {
  return http.post('/addReadCount', data)
}

export function getArticleComment (params) {
  return http.get('/getArticleComment', params)
}

export function addArticleComment (data) {
  return http.post('/addArticleComment', data)
}
