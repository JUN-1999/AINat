/*
 * @Author: your name
 * @Date: 2021-08-20 16:44:15
 * @LastEditTime: 2021-08-24 08:43:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \llwf_jg_pc\src\router\modules\system.js
 */
import BasicLayout from '@/layouts/basic-layout';


const pre = 'system_';

export default {
    path: '/ainat/system',
    name: 'system',
    header: 'system',
    redirect: {
        name: `${pre}configTab`
    },
    meta: {
        auth: ['ainat-system']
    },
    component: BasicLayout,
    children: [
        {
            path: 'file',
            name: `${pre}file`,
            meta: {
                auth: ['system-file'],
                title: '附件管理'
            },
            component: () => import('@/pages/system/file/index')
        },
        {
            path: 'maintain/clear/index',
            name: `${pre}clear`,
            meta: {
                auth: ['system-clear'],
                title: '刷新缓存'
            },
            component: () => import('@/pages/system/clear/index')
        },
        
        {
            path: 'maintain/system_log/index',
            name: `${pre}systemLog`,
            meta: {
                auth: ['system-maintain-system-log'],
                title: '系统日志'
            },
            component: () => import('@/pages/system/maintain/systemLog/index')
        },
        {
            path: 'maintain/system_file/index',
            name: `${pre}systemFile`,
            meta: {
                auth: ['system-maintain-system-file'],
                title: '文件校验'
            },
            component: () => import('@/pages/system/maintain/systemFile/index')
        },
        {
            path: 'maintain/system_cleardata/index',
            name: `${pre}systemCleardata`,
            meta: {
                auth: ['system-maintain-system-cleardata'],
                title: '清除数据'
            },
            component: () => import('@/pages/system/maintain/systemCleardata/index')
        },
        {
            path: 'maintain/system_databackup/index',
            name: `${pre}systemDatabackup`,
            meta: {
                auth: ['system-maintain-system-databackup'],
                title: '数据备份'
            },
            component: () => import('@/pages/system/maintain/systemDatabackup/index')
        },
        {
            path: 'maintain/system_file/opendir',
            name: `${pre}opendir`,
            meta: {
                auth: ['system-maintain-system-file'],
                title: '文件管理'
            },
            component: () => import('@/pages/system/maintain/systemFile/opendir')
        },
        {
            path: 'config/system_config_tab/index',
            name: `${pre}configTab`,
            meta: {
                auth: ['system-config-system_config-tab'],
                title: '配置分类'
            },
            component: () => import('@/pages/system/configTab/index')
        },
        {
            path: 'config/system_config_tab/list/:id?',
            name: `${pre}configTabList`,
            meta: {
                auth: ['system-config-system_config_tab-list'],
                title: '配置列表'
            },
            component: () => import('@/pages/system/configTab/list')
        },
        {
            path: 'config/system_group/index',
            name: `${pre}group`,
            meta: {
                auth: ['system-config-system_config-group'],
                title: '组合数据'
            },
            component: () => import('@/pages/system/group/index')
        },
        {
            path: 'config/system_group/list/:id?',
            name: `${pre}groupList`,
            meta: {
                auth: ['system-config-system_config-list'],
                title: '组合数据列表'
            },
            component: () => import('@/pages/system/group/list')
        },

        //以下新增
        {
            path: 'system_menus/index',
            name: `${pre}systemMenus`,
            meta: {
              auth: ['setting-system-menus'],
              title: '菜单定义'
            },
            component: () => import('@/pages/setting/systemMenus/index')
          },
        {
            path: 'rolemanage',
            name: `${pre}rolemanage`,
            meta: {
                auth: ['ainat-system-rolemanage'],
                title: '角色管理'
            },
            component: () => import('@/pages/system/rolemanage')
        },
        {
            path: 'operatormanage',
            name: `${pre}operatormanage`,
            meta: {
                auth: ['ainat-system-operatormanage'],
                title: '管理员'
            },
            component: () => import('@/pages/system/operatormanage')
        },
        {
            path: 'operatorrolesetting',
            name: `${pre}operatorrolesetting`,
            meta: {
                auth: ['ainat-system-operatorrolesetting'],
                title: '组合数据列表'
            },
            component: () => import('@/pages/system/operatorrolesetting')
        },
        {
            path: 'systemdata',
            name: `${pre}systemdata`,
            meta: {
                auth: ['ainat-system-systemdata'],
                title: '系统参数'
            },
            component: () => import('@/pages/system/systemdata')
        },
        {
            path: 'logger',
            name: `${pre}logger`,
            meta: {
                auth: ['ainat-system-logger'],
                title: '组合数据列表'
            },
            component: () => import('@/pages/system/logger')
        },
        
     
    ]
};
