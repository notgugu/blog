<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 14:50:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 15:42:29
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
      <span><i class="iconfont icon-biaoqing3"></i>点赞：{{article.like}}</span>
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
  </div>
</template>

<script>
export default {
  name: 'articleItem',
  data () {
    return {}
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    gotoArticle (id) {
      console.log(id)
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
}
</style>
