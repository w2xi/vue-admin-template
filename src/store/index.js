import Vue from 'vue'
import Vuex from 'vuex'
import { resetRouter } from '../router'
import { login, logout } from '@/api/user'
import { setToken, setUserInfo, clearAll } from '@/utils/auth'

Vue.use(Vuex)

const USER_INFO_KEY = 'User-Info'
const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}')

export default new Vuex.Store({
  state: {
    userInfo,
    menuList: [],
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_MENU_LIST(state, menuList) {
      state.menuList = menuList
    },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            const token = res.token
            setToken(token)
            setUserInfo(res.userInfo)
            commit('SET_USER_INFO', res.userInfo)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            clearAll()
            resetRouter()
            resolve()
          }).catch((err) => {
            reject(err)
          })
      })
    },
  },
  getters: {
    userId: state => state.userInfo.userId,
  },
  modules: {},
})