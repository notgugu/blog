<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-09 14:31:30
-->
<template>
  <div class="pigeonhole">
    <div class="left">
      <tab
        :tabData="tabData"
        @getCondition="getArticleListByCreateTime"
      ></tab>
    </div>
    <div class="right">
      <article-list :articleList="articleList"></article-list>
    </div>
  </div>
</template>

<script>
import articleList from '@/components/article/articleList'
import tab from '@/components/tab/tab'
import { getAllDate, getArticleListByCreateTime } from '@/api/pigeonhole'
export default {
  name: 'pigeonhole',
  data () {
    return {
      tabData: [],
      articleList: []
    }
  },
  components: {
    articleList,
    tab
  },
  created () {
    this.getAllDate()
    this.getArticleListByCreateTime()
  },
  methods: {
    getAllDate () {
      getAllDate().then(res => {
        this.tabData = [...new Set(res)].reverse()
      }).catch(err => {
        console.log(err)
      })
    },
    getArticleListByCreateTime () {
      let createTime = arguments[0] === 'all' ? '-' : arguments[0]
      getArticleListByCreateTime({createTime}).then(res => {
        console.log(res)
        this.articleList = res
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/css/category/index.less';
</style>
