<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-05 09:32:10
-->
<template>
  <div class="item">
    <h2
      v-gotoArticle="article.id"
    >{{article.title}}</h2>
    <div class="message">
      <span><i class="iconfont icon-geren"></i>作者：{{article.author}}</span>
      <span><i class="iconfont icon-biaoqing9"></i>发表于：{{article.createTime}}</span>
      <span><i class="iconfont icon-biaoqing7"></i>分类：{{article.category}}</span>
      <span><i class="iconfont icon-biaoqing8"></i>阅读量：{{article.readCount}}</span>
      <span><i class="iconfont icon-biaoqing5"></i>评论：{{article.messageCount}}</span>
    </div>
    <p class="introduce">{{article.introduce}}</p>
    <div class="tags">
      <div
        class="tag"
        v-for="(item, index) in article.tags"
        :key="index"
      >
      {{item}}
      </div>
    </div>
    <div class="putArticle"
      v-if="isInAdmin"
    >
        <el-button @click="gotoPutArticle">修改</el-button>
        <el-button @click="deleteArticle">删除文章</el-button>
      </div>
  </div>
</template>

<script>
import { deleteArticle } from '@/api/production'
export default {
  name: 'articleItem',
  data () {
    return {
      isInAdmin: false
    }
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    if (this.$route.path.indexOf('admin') !== -1) {
      this.isInAdmin = true
    }
  },
  methods: {
    deleteArticle () {
      let id = this.article.id
      deleteArticle({id}).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$store.commit('setDeleteArticleState')
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '删除失败！'
        })
      })
    },
    gotoPutArticle () {
      let id = this.article.id
      this.$router.push('/admin/put/' + id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.item {
  overflow: hidden;
  margin: 20px 20px 0 20px;
  padding: 20px;
  background: transparent;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  h2 {
    margin-bottom: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  h2:hover {
    color: blue;
    text-decoration: underline;
  }
  .message {
    margin-bottom: 10px;
    span {
      line-height: 20px;
      color: #999;
      word-break: keep-all;
      white-space: nowrap;
    }
  }
  .introduce {
    margin-bottom: 10px;
    line-height: 30px;
    font-size: 16px;
    user-select: text;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .tags {
    display: flex;
    flex-flow: wrap;
    .tag {
      margin-left: 5px;
      padding: 3px;
      background-color: #f0f9eb;
      border: 1px solid #e1f3d8;
      color: #67c23a;
      border-radius: 2px;
    }
  }
  .putArticle {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
