/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 15:53:58
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import storage from './utils/storage'
import '@/assets/iconfont/iconfont.css'
import iconfont from '@/assets/iconfont/iconfont.js'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import './mock/mock'

Vue.prototype.$storage = storage
Vue.config.productionTip = false

Vue.directive('gotoArticle', {
  inserted (el, binding, vnode) {
    let nowTime = new Date()
    el.addEventListener('click', () => {
      if (new Date() - nowTime > 1000) {
        setTimeout(() => {
          console.log(el)
          console.log(binding)
          console.log(vnode)
        }, 200)
      }
      nowTime = new Date()
    })
  }
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  document.title = to.meta.title
  next()
})

router.afterEach(() => {
  nprogress.done()
})

Vue.use(iconfont)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
