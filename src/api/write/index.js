/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 16:35:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:42:50
 */
import http from '@/utils/request'
export function addArticle (data) {
  return http.post('/admin/addArticle', data)
}

export function uploadImg (data) {
  return http.filePost('/admin/uploadImg', data)
}
