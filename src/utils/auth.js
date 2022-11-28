export const TOKEN_KEY = 'Admin-Token'
export const USER_INFO_KEY = 'User-Info'

export function getToken(){
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(value){
  localStorage.setItem(TOKEN_KEY, value)
}

export function removeToken(){
  localStorage.removeItem(TOKEN_KEY)
}

export function setUserInfo(value){
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(value))
}

export function getUserInfo(){
  return JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}')
}

export function removeUserInfo(){
  localStorage.removeItem(USER_INFO_KEY)
}

export function clearAll(){
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_INFO_KEY)
}