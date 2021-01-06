/*
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2021-01-04 21:16:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-06 15:39:27
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isOnLogin: false,
    isUpdateComment: 0
  },
  getters: {
    isOnLogin (state) {
      return state.isOnLogin
    },
    isUpdateComment (state) {
      return state.isUpdateComment
    }
  },
  mutations: {
    setLoginState (state, payload) {
      state.isOnLogin = payload
    },
    setUpdateState (state) {
      state.isUpdateComment++
    }
  },
  actions: {}
})

export default store
