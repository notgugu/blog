<!--
 * @Description:
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-02 11:13:33
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
    document.title = '凡 天行健，君子以自强不息'
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: '/static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-haru_2/assets/',
        tagMode: false,
        debug: false,
        model: {
          jsonPath: '/static/live2dw/live2d-widget-model-haru_2/assets/haru02.model.json'
        },
        display: { position: 'left', width: 180, height: 400 },
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
