import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const TOKEN_KEY = 'USER-KEY'
export default new Vuex.Store({
  state: {
    // 一个对象 存储当前登录用户信息(token等数据)
    user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止本地刷新，token消失，我们需要备份到本地存储
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
    }
  },
  actions: {
  },
  modules: {
  }
})
