<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-03 19:04:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-03 19:18:04
-->
<template>
  <div class="list">
    <article-list
      :articleList="articleListData"
      :nomore="nomore"
      @loading="loading"
    ></article-list>
  </div>
</template>

<script>
import articleList from '@/components/article/articleList'
import { getArticleList } from '@/api/home'
export default {
  name: 'list',
  data () {
    return {
      articleListData: [],
      page: 1,
      num: 10,
      total: 0,
      isLoading: false
    }
  },
  created () {
    this.getArticleList()
  },
  computed: {
    nomore () {
      return this.articleListData.length >= this.total
    }
  },
  components: {
    articleList
  },
  methods: {
    loading () {
      this.page++
      if (!this.isLoading) {
        this.getArticleList()
      }
    },
    getArticleList () {
      this.isLoading = true
      let params = {
        page: this.page,
        num: this.num
      }
      getArticleList(params)
        .then(res => {
          this.articleListData = this.articleListData.concat(res.data)
          this.total = res.total
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">

</style>
