import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// 白名单列表 不做 code 的检验 直接放过
const whitelist = []

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  timeout: 50000,
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data

    if ( whitelist.includes(response.config.url) || res instanceof ArrayBuffer){
      return res
    }

    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 401: token expired
      if ( res.code === 401 ){
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.msg || 'Error'))
    }

    return res
  },
  (error) => {
    console.log(error)

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
