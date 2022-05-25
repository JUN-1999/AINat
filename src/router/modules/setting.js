import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'setting_';

export default {
    path: '/ainat/setting',
    name: 'setting',
    header: 'setting',
    redirect: {
        name: `${pre}systemRole`
    },
    component: BasicLayout,
    children: [{
            path: 'system_role/index',
            name: `${pre}systemRole`,
            meta: {
                auth: ['setting-system-role'],
                title: '角色权限'
            },
            component: () =>
                import ('@/pages/setting/systemRole/index')
        },
        {
            path: 'system_menus/index',
            name: `${pre}systemMenus`,
            meta: {
                auth: ['setting-system-menus'],
                title: '菜单定义'
            },
            component: () =>
                import ('@/pages/setting/systemMenus/index')
        },
        {
            path: 'system_role/index',
            name: `${pre}system_role`,
            meta: {
                auth: ['setting-system_role-add'],
                title: '新增角色'
            },
            component: () =>
                import ('@/pages/setting/systemRole/index')
        },
        {
            path: 'system_config',
            name: `${pre}setSystem`,
            meta: {
                auth: ['setting-system-config'],
                title: '系统设置'
            },
            component: () =>
                import ('@/pages/setting/setSystem/index')
        },
        {
            path: 'system_config/:type?/:tab_id?',
            name: `${pre}setApp`,
            meta: {
                ...meta,
                title: '应用设置'
            },
            component: () =>
                import ('@/pages/setting/setSystem/index')
        },
        {
            path: 'system_config_message/:type?/:tab_id?',
            name: `${pre}message`,
            meta: {
                auth: ['setting-system-config-message'],
                title: '短信开关'
            },
            component: () =>
                import ('@/pages/setting/setSystem/index')
        },
        {
            path: 'store_service/index',
            name: `${pre}service`,
            meta: {
                auth: ['ainat-setting-store_service-index'],
                title: '客服管理'
            },
            component: () =>
                import ('@/pages/setting/storeService/index')
        },
        {
            path: 'store_service/speechcraft',
            name: `${pre}speechcraft`,
            meta: {
                auth: ['ainat-setting-store_service-speechcraft'],
                title: '客服话术'
            },
            component: () =>
                import ('@/pages/setting/storeService/speechcraft')
        },
        {
            path: 'store_service/feedback',
            name: `${pre}feedback`,
            meta: {
                auth: ['ainat-setting-store_service-feedback'],
                title: '用户留言'
            },
            component: () =>
                import ('@/pages/setting/storeService/feedback')
        },
        {
            path: 'freight/city/list',
            name: `${pre}dada`,
            meta: {
                auth: ['setting-system-city'],
                title: '城市数据'
            },
            component: () =>
                import ('@/pages/setting/cityDada/index')
        },

    ]
};