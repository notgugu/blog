<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-03 16:25:44
-->
<template>
  <div class="message">
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
        this.commentListData.data = data
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
