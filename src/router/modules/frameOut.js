/*
 * @Author: your name
 * @Date: 2021-08-20 16:44:15
 * @LastEditTime: 2021-08-21 09:09:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \llwf_jg_pc\src\router\modules\frameOut.js
 */
const pre = 'kefu_';

export default [
    // 登录
    {
        path: '/ainat/login',
        name: 'login',
        meta: {
            title: '$t:page.login.title'
        },
        component: () => import('@/pages/account/login')
    },
    // 大屏
    {
      path: '/ainat/screen',
      name: 'screen',
      meta: {
          title: '大屏'
      },
      component: () => import('@/pages/screen/screen')
  },
]
