/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 22:19:51
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
// import './mock/mock'

Vue.prototype.$storage = storage
Vue.config.productionTip = false

Vue.directive('gotoArticle', {
  inserted (el, binding) {
    let nowTime = new Date()
    el.addEventListener('click', () => {
      if (new Date() - nowTime > 1000) {
        router.push('/article/' + binding.value)
      }
      nowTime = new Date()
    })
  }
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (to.meta.isNeedLogin && !storage.getLocalStorage('token')) {
    router.push('/login')
  }
  if (to.meta.index !== null) {
    storage.setSessionStorage('active', to.meta.index)
  }
  next()
})

router.afterEach((to) => {
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
