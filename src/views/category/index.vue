<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-09 14:33:47
-->
<template>
  <div class="category">
    <div class="left">
      <tab
        :tabData="tabData"
        @getCondition="getArticleListByCategory"
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
import { getAllCategory, getArticleListByCategory } from '@/api/category'
export default {
  name: 'category',
  components: {
    articleList,
    tab
  },
  data () {
    return {
      tabData: [],
      articleList: []
    }
  },
  created () {
    this.getAllCategory()
    this.getArticleListByCategory()
  },
  methods: {
    getAllCategory () {
      getAllCategory().then(res => {
        let object = {}
        this.tabData = res.reduce((cur, next) => {
          if (!object[next.category]) {
            object[next.category] = true
            cur.push(next)
          }
          return cur
        }, [])
        console.log(this.tabData)
      }).catch(err => {
        console.log(err)
      })
    },
    getArticleListByCategory () {
      console.log(arguments[0], 1111)
      let category = arguments[0] === 'all' ? '' : arguments[0]
      getArticleListByCategory({category}).then(res => {
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
