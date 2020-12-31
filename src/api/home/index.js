/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 10:15:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-31 13:16:51
 */
import http from '@/utils/request'
export function getArticleList (params) {
  return http.get('/getArticleList', params)
}
