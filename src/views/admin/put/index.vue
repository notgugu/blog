<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 14:08:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-03 20:18:48
-->
<template>
  <div class="put">
    <div class="header">
      <h2>修改文章</h2>
    </div>
    <div class="editor">
    </div>
    <div class="putMsg">
      <div>
        <label><span>*</span>标题<input v-model="articleData.title" type="text"></label>
        <label><span>*</span>作者<input v-model="articleData.author" type="text"></label>
      </div>
      <div>
        <label><span>*</span>分类<input v-model="articleData.category" type="text"></label>
        <label><span>*</span>标签<input v-model="articleData.tags" type="text"></label>
      </div>
      <label><span>*</span>简介<input v-model="articleData.introduce" class="introduce" type="text"></label>
    </div>
    <div class="button">
      <el-button type="primary" @click="getDetail">提交</el-button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'
import { putArticle } from '@/api/put'
import { getArticle } from '@/api/production'
export default {
  name: 'write',
  data () {
    return {
      id: this.$route.params.id || '',
      articleData: {
        title: '',
        introduce: '',
        author: '',
        category: '',
        tags: '',
        content: ''
      },
      editor: null
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    putArticle () {
      let id = this.id
      let articleData = this.articleData
      let data = {
        id,
        articleData
      }
      putArticle(data).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        location.reload()
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '修改失败'
        })
      })
    },
    getDetail () {
      this.articleData.content = this.editor.txt.html().replace(/<pre/g, "<pre class='hljs'")
      this.putArticle()
    },
    getArticle () {
      let id = this.id
      getArticle({
        id
      }).then(res => {
        this.articleData = res.data
        this.$nextTick(() => {
          this.editor.txt.html(this.articleData.content)
        })
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
  mounted () {
    this.editor = new E('.editor')
    this.editor.highlight = hljs
    this.editor.create()
  }
}
</script>

<style scoped lang='less'>
.put {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  .header {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .putMsg {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    label {
      display: inline-block;
      margin: 10px;
      span {
        color: red;
      }
      .introduce {
        width: 60%;
      }
    }
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
}
</style>

<style scoped>
.w-e-toolbar {
  z-index: 1000;
}
</style>
