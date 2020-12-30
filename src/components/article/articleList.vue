<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 10:44:32
-->
<template>
  <div class="list">
    <article-item
      v-for="item in articleList"
      :key="item.id"
      :article="item"
    >
    </article-item>
  </div>
</template>

<script>
import articleItem from './articleItem'
export default {
  name: 'articleList',
  data () {
    return {}
  },
  props: {
    articleList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    articleItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
