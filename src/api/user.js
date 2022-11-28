import request from '../utils/request'

export function login(data) {
  return request({
    data,
    url: '/api/user/login',
    method: 'POST'
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'POST'
  })
}

export function getMenus(params) {
  return request({
    params,
    url: '/api/user/menu',
    method: 'GET',
  })
}