/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 20:38:31
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 20:38:47
 */
import http from '@/utils/request'
export function login (data) {
  return http.post('/admin/login', data)
}
