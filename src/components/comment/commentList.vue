<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-02 16:02:31
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-02 17:33:02
-->
<template>
  <div class="commentList">
    <h2>留言</h2>
    <div class="input">
      <label><span>*</span>昵称<input v-model="nickName" type="text" placeholder="请输入您的昵称"></label>
    </div>
    <div class="editor">
    </div>
    <div class="button">
      <el-button type="primary" @click="submitComment">提交</el-button>
      <el-button @click="resetValue">重置</el-button>
    </div>
    <div class="comment-content">
      <div class="comment-num">
        共{{commentListData.total || '--'}}条评论
      </div>
      <comment-item
        :content="item"
        v-for="(item, index) in commentListData.data"
        :key="index"
      ></comment-item>
    </div>
  </div>
</template>

<script>
import commentItem from './commentItem'
import { addArticleComment } from '@/api/production'
import E from 'wangeditor'
export default {
  name: 'commentList',
  components: {
    commentItem
  },
  data () {
    return {
      editor: null,
      nickName: ''
    }
  },
  props: {
    commentListData: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    addArticleComment (id, nickName, comment) {
      addArticleComment({
        id,
        nickName,
        comment
      }).then(res => {
        this.$message({
          type: 'success',
          message: '留言成功'
        })
        this.$emit('upLoadComment')
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '留言失败'
        })
      })
    },
    submitComment () {
      let id = this.id
      let nickName = this.nickName
      let comment = this.editor.txt.text()
      if (nickName && comment) {
        this.addArticleComment(id, nickName, comment)
      } else {
        this.$message({
          type: 'error',
          message: '昵称或评论不能为空！'
        })
      }
    },
    resetValue () {
      this.nickName = ''
      this.editor.txt.clear()
    }
  },
  mounted () {
    this.editor = new E('.editor')
    this.editor.create()
  }
}
</script>

<style scoped lang="less">
.commentList {
  margin-top: 30px;
  span {
    color: red;
  }
  .input {
    display: flex;
    align-items: center;
    padding: 20px 0;
    height: 40px;
    label {
      font-size: 18px;
    }
    input {
      margin-left: 12px;
      width: 150px;
      height: 28px;
    }
  }
  .button {
    margin-top: 20px;
  }
  .comment-content {
    margin-top: 20px;
    .comment-num {
      padding: 10px 0;
      font-size: 22px;
    }
  }
}
</style>
