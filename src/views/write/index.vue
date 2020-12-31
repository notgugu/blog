<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-31 14:08:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-31 15:19:46
-->
<template>
  <div class="write">
    <div class="editor">
    </div>
    <button @click="getDetail">提交</button>
  </div>
</template>

<script>
import E from 'wangeditor'
import hljs from 'highlight.js'
export default {
  name: 'write',
  data () {
    return {
      editor: null
    }
  },
  methods: {
    getDetail () {
      console.log(this.editor.txt.html())
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
  button {
    margin-top: 30px;
  }
}
</style>
