/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-08 21:11:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-08 21:54:44
 */

import http from '@/utils/request'
export function getAllCategory (params) {
  return http.get('/article/getAllCategory', params)
}

export function getArticleListByCategory (params) {
  return http.get('/article/getArticleListByCategory', params)
}
