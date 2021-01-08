<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-02 16:02:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-06 16:27:36
-->
<template>
  <div class="commentItem">
    <div class="header">
      <div class="name">{{content.nickName}}</div>
      <div class="time">{{content.createTime}}</div>
    </div>
    <div class="content">
      <p v-text="content.comment"></p>
      <div v-if="content.review" class="return">
        <div class="detail"><p class="red">博主回复：</p><p v-text="content.review"></p></div>
        <div class="time"><p>{{content.reviewTime}}</p></div>
      </div>
    </div>
    <div v-if="isOnAdmin" class="btn">
      <el-button @click="reviewComment">回复</el-button>
      <el-button @click="deleteComment">删除评论</el-button>
    </div>
  </div>
</template>

<script>
import { reviewComment, deleteComment } from '@/api/message'
import { deleteArticleComment, reviewArticleComment } from '@/api/production'
export default {
  name: 'commentItem',
  data () {
    return {
      isOnAdmin: this.$store.getters.isOnLogin,
      isInArticle: this.$route.path.indexOf('article') !== -1,
      id: this.$route.params.id || ''
    }
  },
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    reviewArticleComment () {
      let id = this.id
      let createTime = this.content.createTime
      reviewArticleComment({id, createTime}.then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$store.commit('setUpdateState')
      })).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '删除失败'
        })
      })
    },
    deleteArticleComment () {
      let createTime = this.content.createTime
      let id = this.id
      deleteArticleComment({createTime, id}).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$store.commit('setUpdateState')
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '删除失败'
        })
      })
    },
    deleteComment () {
      let id = this.content.id
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this)
        if (this.isInArticle) {
          this.deleteArticleComment()
        } else {
          deleteComment({id}).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$store.commit('setUpdateState')
          }).catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    reviewComment () {
      let id = this.content.id
      let email = this.content.email
      this.$prompt('请输入回复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (this.isInArticle) {
          this.reviewArticleComment()
        } else {
          reviewComment({
            id,
            review: value,
            email
          }).then(res => {
            this.$message({
              type: 'success',
              message: '回复成功'
            })
            this.$store.commit('setUpdateState')
          }).catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '回复失败'
            })
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.commentItem {
  border-bottom: 1px solid #eee;
  .header {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    font-size: 16px;
    .name {
      color: #1abc9c;
    }
    .time {
      color: #ccc;
    }
  }
  .content {
    padding: 10px 20px;
    .return {
      display: flex;
      padding: 20px 0;
      border-top: 1px solid #eee;
      justify-content: space-between;
      .detail {
        display: flex;
        font-size: 18px;
        p {
          font-size: 18px;
        }
        .red {
          color: red;
        }
      }
      .time {
        font-size: 16px;
        color: #ccc;
      }
    }
  }
  .btn {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
