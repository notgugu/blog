<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-08 21:56:10
-->
<template>
  <div class="list">
    <article-item
      v-for="item in articleList"
      :key="item.id"
      :article="item"
    >
    </article-item>
    <div class="bottom">
      <p v-if="!nomore">加载中。。。</p>
      <p v-else>没有更多了</p>
    </div>
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
    },
    nomore: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollRefresh (event) {
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      if (clientHeight + scrollTop >= scrollHeight - 100 && !this.nomore) {
        // 当列表拉到离底部100时 通知父组件执行loading事件
        this.$emit('loading')
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollRefresh)
  },
  watch: {
    nomore (newval) {
      if (newval) {
        window.removeEventListener('scroll', this.scrollRefresh)
      }
    }
  },
  components: {
    articleItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bottom {
  margin: 30px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  color: cadetblue;
}
</style>
