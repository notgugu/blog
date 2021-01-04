<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 20:03:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 09:06:48
-->
<template>
  <div class="login">
    <h2>登陆</h2>
    <div class="loginBox">
      <label>帐号:<input v-model="account" type="text"></label>
      <label>密码:<input v-model="password" type="password"></label>
      <div class="btn">
        <el-button @click="login">登陆</el-button>
        <el-button @click="back">返回博客</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      let account = this.account
      let password = this.password
      login({
        account,
        password
      }).then(res => {
        if (res.token) {
          this.$storage.setLocalStorage('token', res.token)
        }
        this.$router.push('/admin')
      }).catch(err => {
        console.log(err)
      })
    },
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/css/login/index.less';
</style>
