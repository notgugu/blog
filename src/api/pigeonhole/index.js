/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-09 14:20:19
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-09 14:29:29
 */
import http from '@/utils/request'
export function getAllDate (params) {
  return http.get('/article/getAllDate', params)
}
export function getArticleListByCreateTime (params) {
  return http.get('/article/getArticleListByCreateTime', params)
}
