/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 10:15:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:41:33
 */
import http from '@/utils/request'
export function getArticleList (params) {
  return http.get('/article/getArticleList', params)
}

export function getHotArticleList (params) {
  return http.get('/article/getHotArticleList', params)
}

export function getNewArticleList (params) {
  return http.get('/article/getNewArticleList', params)
}
