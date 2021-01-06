<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-06 15:54:50
-->
<template>
  <div class="message">
    <div class="header">
      <h1>给我留言</h1>
      <img src="../../assets/image/huhuhu.jpg" alt="哎呀，图片加载不出来了">
    </div>
    <comment-list
      :commentListData="commentListData"
    ></comment-list>
  </div>
</template>

<script>
import commentList from '@/components/comment/commentList'
import { getComment } from '@/api/message'
export default {
  name: 'message',
  data () {
    return {
      commentListData: {
        data: [],
        total: 0
      }
    }
  },
  created () {
    this.getComment()
  },
  watch: {
    isUpdateComment: function (newval) {
      this.getComment()
    }
  },
  computed: {
    isUpdateComment () {
      return this.$store.getters.isUpdateComment
    }
  },
  methods: {
    getComment () {
      getComment().then(res => {
        let data = []
        res.forEach(item => {
          data.push(item.content)
        })
        this.commentListData.data = data.reverse()
        this.commentListData.total = res.length
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    commentList
  }
}
</script>

<style scoped lang="less">
@import '../../assets/css/message/index.less';
</style>
