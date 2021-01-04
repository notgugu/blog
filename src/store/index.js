/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 21:16:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-04 21:24:29
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isOnLogin: false
  },
  getters: {
    isOnLogin (state) {
      return state.isOnLogin
    }
  },
  mutations: {
    setLoginState (state, payload) {
      state.isOnLogin = payload
    }
  },
  actions: {}
})

export default store
