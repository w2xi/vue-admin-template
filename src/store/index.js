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
    visitedRoutes: [],
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_MENU_LIST(state, menuList) {
      state.menuList = menuList
    },
    ADD_VISITED_ROUTE(state, route) {
      const target = state.visitedRoutes.find(item => item.path === route.path)
      if (target) {
        if (target.fullPath !== route.fullPath) {
          Object.assign(target, route)
        }
      } else {
        state.visitedRoutes.push({ ...route })
      }
    },
    REMVOE_VISITED_ROUTE(state, index) {
      // const index = state.visitedRoutes.findIndex(item => item.path === path)
      if (index !== -1) {
        return state.visitedRoutes.splice(index, 1)
      }
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