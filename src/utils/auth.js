import Cookies from 'js-cookie'

const TokenKey = 'admin-token'
const loginInfo = 'loginInfo'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getLoginInfo() {
  return Cookies.get(loginInfo)
}
