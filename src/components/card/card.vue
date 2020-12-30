<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-30 14:05:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 15:02:49
-->
<template>
  <div class="card">
    <h3>
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use :xlink:href="icon"></use>
      </svg>
      {{title}}
    </h3>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    icon: {
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
  margin-bottom: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  h3 {
    font-size: 16px;
    padding: 15px 0 15px 20px;
    border-bottom: 1px solid #ebeef5;
    svg {
      margin-right: 5px;
    }
  }
}
</style>
