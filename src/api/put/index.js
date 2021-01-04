/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-03 19:49:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:42:43
 */
import http from '@/utils/request'
export function putArticle (params) {
  return http.post('/admin/putArticle', params)
}
