<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 14:08:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 22:48:36
-->
<template>
  <div class="article">
    <h2 class="title">{{articleData.title}}</h2>
    <div class="detail">
      <div class="message">
        <span><i class="iconfont icon-geren"></i>作者：{{articleData.author}}</span>
        <span><i class="iconfont icon-biaoqing9"></i>发表于：{{articleData.createTime}}</span>
        <span><i class="iconfont icon-biaoqing7"></i>分类：{{articleData.category}}</span>
        <span><i class="iconfont icon-biaoqing8"></i>阅读量：{{articleData.readCount}}</span>
        <span><i class="iconfont icon-biaoqing5"></i>评论：{{articleData.messageCount}}</span>
        <span><i class="iconfont icon-biaoqing3"></i>点赞：{{articleData.likeCount}}</span>
      </div>
    </div>
    <div class="content" v-html="articleData.content"></div>
  </div>
</template>

<script>
import { getArticle } from '@/api/production'
export default {
  name: 'production',
  data () {
    return {
      id: this.$route.params.id,
      articleData: null
    }
  },
  created () {
    this.getArticle()
  },
  watch: {
    '$route' (newval) {
      this.id = this.$route.params.id
      getArticle()
    }
  },
  methods: {
    getArticle () {
      let id = this.id
      getArticle({
        id
      }).then(res => {
        this.articleData = res.data
      })
    }
  },
  mounted () {}
}
</script>

<style scoped lang='less'>
@import '../../assets/css/article/index.less';
</style>
<style>
.hljs {
  background-color: #ddd;
}
</style>
