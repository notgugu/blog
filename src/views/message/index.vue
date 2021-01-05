<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-05 10:05:53
-->
<template>
  <div class="message">
    <div class="header">
      <h1>给我留言</h1>
      <img src="../../assets/image/huhuhu.jpg" alt="哎呀，图片加载不出来了">
    </div>
    <comment-list
      :commentListData="commentListData"
      @upLoadComment="upLoadComment"
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
  methods: {
    getComment () {
      getComment().then(res => {
        console.log(res)
        let data = []
        res.data.forEach(item => {
          data.push(item.content)
        })
        this.commentListData.data = data.reverse()
        this.commentListData.total = res.data.length
      }).catch(err => {
        console.log(err)
      })
    },
    upLoadComment () {
      this.getComment()
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
