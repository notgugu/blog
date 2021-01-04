<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 14:08:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 22:01:35
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
      </div>
    </div>
    <div class="content" v-html="articleData.content"></div>
    <div class="end">----------本文结束，感谢您的阅读----------</div>
    <comment-list :commentListData="commentListData" :id="id" @upLoadComment="upLoadComment"></comment-list>
  </div>
</template>

<script>
import { getArticle, getArticleComment } from '@/api/production'
import commentList from '@/components/comment/commentList'
export default {
  name: 'production',
  data () {
    return {
      id: this.$route.params.id,
      articleData: {},
      commentListData: {
        total: 0,
        data: []
      }
    }
  },
  components: {
    commentList
  },
  created () {
    this.getArticle()
    this.getArticleComment()
  },
  watch: {
    '$route' (newval) {
      this.id = this.$route.params.id
      this.getArticle()
      this.getArticleComment()
    }
  },
  methods: {
    upLoadComment () {
      this.getArticleComment()
    },
    getArticleComment () {
      let id = this.id
      getArticleComment({
        id
      }).then(res => {
        console.log(res)
        this.commentListData.data = res.data.reverse()
        this.commentListData.total = res.data.length
        console.log(this.commentListData)
      }).catch(err => {
        console.log(err)
      })
    },
    getArticle () {
      let id = this.id
      getArticle({
        id
      }).then(res => {
        this.articleData = res.data
        this.$message({
          message: '请求成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    }
  },
  mounted () {}
}
</script>

<style scoped lang='less'>
@import '../../assets/css/article/index.less';
</style>
<style lang='less'>
.hljs {
  background-color: #ddd;
}
</style>
