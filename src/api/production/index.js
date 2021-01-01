/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 21:48:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 22:01:27
 */
import http from '@/utils/request'
export function getArticle (params) {
  return http.get('/getArticle', params)
}
