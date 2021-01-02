/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-02 18:20:07
 */
import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views'
import home from '@/views/home'
import category from '@/views/category'
import pigeonhole from '@/views/pigeonhole'
import message from '@/views/message'
import mine from '@/views/mine'
import login from '@/views/login'
import admin from '@/views/admin'
import production from '@/views/production'
import write from '@/views/admin/write'

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
            isKeepAlive: true,
            index: '0'
          }
        },
        {
          path: '/category',
          name: 'category',
          component: category,
          meta: {
            isKeepAlive: false,
            index: '1'
          }
        },
        {
          path: '/pigeonhole',
          name: 'pigeonhole',
          component: pigeonhole,
          meta: {
            isKeepAlive: false,
            index: '2'
          }
        },
        {
          path: '/message',
          name: 'message',
          component: message,
          meta: {
            isKeepAlive: false,
            index: '3'
          }
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine,
          meta: {
            isKeepAlive: false,
            index: '4'
          }
        },
        {
          path: '/article/:id',
          name: 'article',
          component: production,
          meta: {
            isKeepAlive: false
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isKeepAlive: false
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: '/admin/write',
      meta: {
        isKeepAlive: false,
        isNeedLogin: true
      },
      children: [
        {
          path: 'write',
          name: 'write',
          component: write,
          meta: {
            isKeepAlive: true,
            isNeedLogin: true,
            index: '0'
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
