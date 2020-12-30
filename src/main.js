/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 13:00:10
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import storage from './utils/storage'
import '@/assets/iconfont/iconfont.css'
import iconfont from '@/assets/iconfont/iconfont.js'

Vue.prototype.$storage = storage
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
Vue.use(iconfont)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
