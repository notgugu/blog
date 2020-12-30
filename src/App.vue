<!--
 * @Description:
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 09:44:36
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: '../static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-haru_2/assets/',
        tagMode: false,
        debug: false,
        model: {
          jsonPath: '../static/live2dw/live2d-widget-model-haru_2/assets/haru02.model.json'
        },
        display: { position: 'right', width: 180, height: 400 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
  }
}
</script>

<style lang="less">
@import './assets/css/base.less';
</style>
