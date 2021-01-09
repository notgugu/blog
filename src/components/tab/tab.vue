<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-08 21:05:27
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-09 14:25:47
-->
<template>
  <div class="tab">
    <ul class="tabList">
      <li :class="{active: active === 0}" @click="getArticleListByCondition('all')">全部</li>
      <li :class="{active: active === index + 1}"
        v-for="(item, index) in tabData"
        :key="index + 1"
        @click="getArticleListByCondition(item.category || item, index + 1)"
      >{{item.category || item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      active: 0
    }
  },
  props: {
    tabData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getArticleListByCondition (condition, index = 0) {
      this.active = index
      this.$emit('getCondition', condition)
    }
  }
}
</script>

<style scoped lang='less'>
.tab {
  margin: 30px;
  border: 1px solid #eee;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .tabList {
    li {
      text-align: center;
      font-size: 18px;
      line-height: 40px;
      cursor: pointer;
    }
    .active {
      color: blue
    }
  }
}
</style>
