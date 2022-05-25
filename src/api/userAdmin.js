/*
 * @Author: your name
 * @Date: 2022-01-10 15:02:26
 * @LastEditTime: 2022-02-24 09:58:26
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ldrk_pc\src\api\userAdmin.js
 */
import request from '@/plugins/request';

export function userApiGet (data) {
  return request({
    url: 'user/user',
    method: 'get',
    params: data
  });
}

export function userGetcompany (data) {
  return request({
    url: 'staff/company',
    method: 'get',
    params: data
  });
}