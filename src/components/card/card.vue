<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-30 14:05:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 14:11:09
-->
<template>
  <div class="card">
    <h3><i class="iconfont icon-card"></i>{{title}}</h3>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    className: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
.card {
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  h3 {
    font-size: 16px;
    padding: 15px 0 15px 20px;
    border-bottom: 1px solid #ebeef5;
    i {
      margin-right: 5px;
    }
  }
}
</style>
