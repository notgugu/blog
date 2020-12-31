/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-31 13:42:36
 */
import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views'
import home from '@/views/home'
import category from '@/views/category'
import article from '@/views/article'
import message from '@/views/message'
import mine from '@/views/mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: {
            title: '首页',
            isKeepAlive: true,
            index: 0
          }
        },
        {
          path: '/category',
          name: 'category',
          component: category,
          meta: {
            title: '分类',
            isKeepAlive: false,
            index: 1
          }
        },
        {
          path: '/article',
          name: 'article',
          component: article,
          meta: {
            title: '文章',
            isKeepAlive: false,
            index: 2
          }
        },
        {
          path: '/message',
          name: 'message',
          component: message,
          meta: {
            title: '留言',
            isKeepAlive: false,
            index: 3
          }
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine,
          meta: {
            title: '我的',
            isKeepAlive: false,
            index: 4
          }
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
