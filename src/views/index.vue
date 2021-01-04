<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 15:09:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:08:43
-->
<template>
  <div class="main">
    <div class="main-header">
      <div class="header">
        <div class="header-left" @click="refresh">
          <i class="before"></i>
          <span class="center">凡</span>
          <i class="after"></i>
        </div>
        <div class="header-right">
          <div
            v-for="(item, index) in navData"
            :class="{'nav-item': true, 'active': active == index}"
            :key="index"
            @click="gotoOtherView(item, index)"
          >
            <i :class="item.icon"></i>
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <keep-alive>
        <router-view v-if="this.$route.meta.isKeepAlive"/>
      </keep-alive>
      <router-view v-if="!this.$route.meta.isKeepAlive"/>
    </div>
    <go-top></go-top>
  </div>
</template>

<script>
import goTop from '@/components/goTop/goTop'
export default {
  name: 'index',
  data () {
    return {
      active: this.$storage.getSessionStorage('active') || 0,
      navData: [
        {
          title: '首页',
          icon: 'iconfont icon-biaoqing6',
          path: '/home'
        },
        {
          title: '分类',
          icon: 'iconfont icon-biaoqing2',
          path: '/category'
        },
        {
          title: '归档',
          icon: 'iconfont icon-biaoqing8',
          path: '/pigeonhole'
        },
        {
          title: '留言',
          icon: 'iconfont icon-biaoqing5',
          path: '/message'
        },
        {
          title: '我的',
          icon: 'iconfont icon-biaoqing4',
          path: '/mine'
        }
      ]
    }
  },
  created () {},
  watch: {
    '$route' (newval) {
      // 监听路由变化获取active值，active值在导航守卫里改变
      this.active = this.$storage.getSessionStorage('active') || 0
    }
  },
  methods: {
    gotoOtherView (item, index) {
      this.jump(item.path)
    },
    jump (path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    },
    refresh () {
      if (this.active === 0) {
        location.reload()
      }
      this.active = 0
      this.$storage.setSessionStorage('active', this.active)
      this.$router.push('/')
    }
  },
  components: {
    goTop
  }
}
</script>

<style lang="less">
@import '../assets/css/index.less';
</style>
