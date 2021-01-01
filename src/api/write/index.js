/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 16:35:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 16:35:41
 */
import http from '@/utils/request'
export function addArticle (data) {
  return http.post('/addArticle', data)
}
