import request from '@/plugins/request';

/*
 * 登录
 * */
export function AccountLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}
export function SmsLogin (data) {
  return request({
    url: '/smslogin',
    method: 'post',
    data
  });
}

export function checkIpForNet (date) {
  return request({
    url: '/checkIpForNet?timestamp=' + date,
    method: 'get',
  });
}

export function Binding (data) {
  return request({
    url: '/setting/phone/binding',
    method: 'post',
    data
  });
}

/**
 * 退出登陆
 * @constructor
 */
export function AccountLogout () {
  return request({
    url: '/setting/admin/logout',
    method: 'get'
  });
}

/**
 * 获取轮播图和logo
 */
export function loginInfoApi () {
  return request({
    url: '/login/info',
    method: 'get'
  });
}

/**
 * 获取菜单数据
 */
export function menusApi () {
  return request({
    url: '/menus',
    method: 'get'
  });
}

/**
 * 搜索菜单数据
 */
export function menusListApi () {
  return request({
    url: '/menusList',
    method: 'get'
  });
}

export function getSysInfo () {
  return request({
    url: '/logo',
    method: 'get'
  });
}

export function AccountRegister () {

}

export function DdLogin (data) {
  return request({
    url: '/getAppTokenByAuthCode',
    method: 'post',
    data
  });
}

export function DdScanLogin (data) {
  return request({
    url: '/getAppTokenByScanCode',
    method: 'post',
    data
  });
}

export function smscode (data) {
  return request({
    url: '/sms/code',
    method: 'get',
    params: data
  });
}


