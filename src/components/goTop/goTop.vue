<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 11:04:29
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:16:20
-->
<template>
  <div
    class="goTop"
    v-show="!isOnTop"
    @click="goTop"
  >
    <i class="iconfont icon-daohang"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOnTop: true
    }
  },
  methods: {
    scrollListen () {
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > 200) {
        // 如果滚动条高度大于200 显示该组件
        this.isOnTop = false
      } else {
        this.isOnTop = true
      }
    },
    goTop () {
      let spacing = 20
      const scrollTop = document.documentElement.scrollTop
      document.documentElement.scrollTop -= scrollTop / spacing
      if (scrollTop > 0) {
        // 递归调用向上的动画
        window.requestAnimationFrame(this.goTop)
      } else {
        this.isOnTop = true
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollListen)
  }
}
</script>

<style scoped lang="less">
.goTop {
  position: fixed;
  right: 100px;
  bottom: 200px;
  width: 38px;
  height: 38px;
  background-color: #e1f3d8;
  border: 1px solid #eee;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  i {
    display: flex;
    align-items: center;
    color: #67c23a;
    font-size: 38px;
  }
}
</style>
