/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-06 16:38:17
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import storage from './utils/storage'
import '@/assets/iconfont/iconfont.css'
import iconfont from '@/assets/iconfont/iconfont.js'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import 'highlight.js/styles/vs.css'
import { MessageBox, Message, Button, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { addReadCount } from '@/api/production'
// import './mock/mock'

Vue.prototype.$ELEMENT = {zIndex: 20000}
Vue.prototype.$storage = storage
Vue.prototype.$messageBox = MessageBox
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.config.productionTip = false

Vue.directive('gotoArticle', {
  // 自定义指令
  inserted (el, binding) {
    let nowTime = new Date()
    el.addEventListener('click', () => {
      if (new Date() - nowTime > 1000) {
        // 节流 埋点记录文章点击量
        addReadCount({
          id: binding.value
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
        router.push('/article/' + binding.value)
      }
      nowTime = new Date()
    })
  }
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (storage.getSessionStorage('token')) {
    store.commit('setLoginState', true)
  }
  if (to.meta.isNeedLogin && !storage.getSessionStorage('token')) {
    router.push('/login')
  }
  if (to.meta.index) {
    storage.setSessionStorage('active', to.meta.index)
  }
  next()
})

router.afterEach(() => {
  nprogress.done()
})

Vue.use(iconfont)
Vue.use(Button)
Vue.use(Input)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
