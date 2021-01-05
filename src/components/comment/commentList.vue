<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-02 16:02:31
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-05 09:58:31
-->
<template>
  <div class="commentList">
    <div class="comment-header">
      <h2>留言</h2>
      <div class="message"><span>*</span>请务必输入有效的邮箱地址，不然得不到回复信息的哦</div>
      <div class="input">
        <div class="item">
          <i>*</i><span>昵称</span><el-input v-model="nickName" type="text" placeholder="请输入您的昵称"/>
        </div>
        <div class="item">
          <i>*</i><span>邮箱</span><el-input v-model="email" type="text" placeholder="请输入您的邮箱"/>
        </div>
      </div>
      <div class="editor">
      </div>
      <div class="button">
        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button @click="resetValue">重置</el-button>
      </div>
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
import { addComment } from '@/api/message'
import { throttle } from '@/utils/lodash'
import { emailValidate } from '@/utils/validate'
import E from 'wangeditor'
export default {
  name: 'commentList',
  components: {
    commentItem
  },
  data () {
    return {
      editor: null,
      nickName: '',
      email: '',
      submit: null
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
    emailValidate,
    throttle,
    addComment (nickName, email, comment) {
      addComment({
        nickName,
        email,
        comment
      }).then(() => {
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
    addArticleComment (id, nickName, email, comment) {
      addArticleComment({
        id,
        nickName,
        email,
        comment
      }).then(res => {
        this.$message({
          type: 'success',
          message: '留言成功'
        })
        this.resetValue()
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
      let email = this.email
      let comment = this.editor.txt.text()
      if (!this.emailValidate(email)) {
        this.$message({
          type: 'error',
          message: '请输入正确格式的邮箱，不然得不到回复的！例如xxxxx@xxxx.com'
        })
        return
      }
      if (nickName && comment) {
        if (id) {
          this.addArticleComment(id, nickName, email, comment)
        } else {
          this.addComment(nickName, email, comment)
        }
      } else {
        this.$message({
          type: 'error',
          message: '昵称或评论不能为空！'
        })
      }
    },
    resetValue () {
      this.nickName = ''
      this.email = ''
      this.editor.txt.clear()
    }
  },
  mounted () {
    this.submit = this.throttle(this.submitComment, 1000)
    this.editor = new E('.editor')
    this.editor.create()
  }
}
</script>

<style scoped lang="less">
.commentList {
  margin-top: 30px;
  .comment-header {
    i {
      color: red;
      padding: 0 10px;
    }
    .message {
      padding-top: 10px;
      span {
        color: red
      }
    }
    .input {
      display: flex;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .item {
        display: flex;
        align-items: center;
        span {
          width: 60px;
        }
      }
    }
    .button {
      margin-top: 20px;
    }
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
