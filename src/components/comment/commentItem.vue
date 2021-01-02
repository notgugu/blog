<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-02 16:02:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-02 17:32:51
-->
<template>
  <div class="commentItem">
    <div class="header">
      <div class="name">{{content.nickName}}</div>
      <div class="time">{{content.createTime}}</div>
    </div>
    <div class="content">
      <p v-text="content.comment"></p>
      <p v-if="content.return" class="return"><span>博主回复：</span>{{content.return}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentItem',
  props: {
    content: {
      type: Object,
      default: () => {}
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
    p {
      font-size: 18px;
    }
    .return {
      padding-bottom: 20px;
    }
  }
}
</style>
