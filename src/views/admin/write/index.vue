<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 14:08:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-01 22:46:00
-->
<template>
  <div class="write">
    <div class="editor">
    </div>
    <div class="writeMsg">
      <div>
        <label><span>*</span>标题<input v-model="title" type="text"></label>
        <label><span>*</span>作者<input v-model="author" type="text"></label>
      </div>
      <div>
        <label><span>*</span>分类<input v-model="category" type="text"></label>
        <label><span>*</span>标签<input v-model="tags" type="text"></label>
      </div>
      <label><span>*</span>简介<input v-model="introduce" class="introduce" type="text"></label>
    </div>
    <div class="button">
      <button @click="getDetail">提交</button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'
import { addArticle } from '@/api/write'
export default {
  name: 'write',
  data () {
    return {
      editor: null,
      title: '',
      introduce: '',
      author: '',
      category: '',
      tags: '',
      content: ''
    }
  },
  methods: {
    addArticle () {
      let title = this.title
      let introduce = this.introduce
      let author = this.author
      let category = this.category
      let tags = this.tags
      let content = this.content
      let data = {
        title,
        introduce,
        author,
        category,
        tags,
        content
      }
      addArticle(data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    getDetail () {
      this.content = this.editor.txt.html().replace(/<pre/g, "<pre class='hljs'")
      console.log(this.content)
      this.addArticle()
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
.write {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  .writeMsg {
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
