<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-01 20:03:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 21:23:24
-->
<template>
  <div class="login">
    <h2>登陆</h2>
    <div class="loginBox">
      <div class="account">
        <div class="item"><span>帐号:</span><el-input v-model="account" type="text"/></div>
        <div class="item"><span>密码:</span><el-input v-model="password" type="password"/></div>
      </div>
      <div class="btn">
        <el-button type="primary" @click.enter="login">登陆</el-button>
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
          this.$storage.setSessionStorage('token', res.token)
          this.$store.commit('setLoginState', true)
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
