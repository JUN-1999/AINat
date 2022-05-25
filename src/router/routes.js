import index from './modules/index';
// import echarts from './modules/echarts';


import system from './modules/system';
import BasicLayout from '@/layouts/basic-layout';
import frameOut from './modules/frameOut';
import setting from './modules/setting';
import masterdatashow from './modules/mastershowdata';


/**
 * 在主框架内显示
 */

const frameIn = [{
        path: '/ainat/',
        meta: {

            title: 'AI核酸比对系统'
        },
        redirect: {
            name: 'home_index'
        },
        component: BasicLayout,
        children: [{
                path: '/ainat/system/log',
                name: 'log',
                meta: {
                    title: '前端日志',
                    auth: true
                },
                component: () =>
                    import ('@/pages/system/log')
            },

            {
                path: '/ainat/system/user',
                name: `systemUser`,
                meta: {
                    auth: true,
                    title: '个人中心'
                },
                component: () =>
                    import ('@/pages/setting/user/index')
            },
            // 刷新页面 必须保留
            {
                path: 'refresh',
                name: 'refresh',
                hidden: true,
                component: {
                    beforeRouteEnter(to, from, next) {
                        next(instance => instance.$router.replace(from.fullPath));
                    },
                    render: h => h()
                }
            },
            // 页面重定向 必须保留
            {
                path: 'redirect/:route*',
                name: 'redirect',
                hidden: true,
                component: {
                    beforeRouteEnter(to, from, next) {
                        next(instance => instance.$router.replace(JSON.parse(from.params.route)));
                    },
                    render: h => h()
                }
            }
        ]
    },
    {
        path: '/ainat/widget.images/index.html',
        name: `images`,
        meta: {
            auth: true,
            title: '上传图片'
        },
        component: () =>
            import ('@/components/uploadPictures/widgetImg')
    },
    {
        path: '/ainat/widget.widgets/icon.html',
        name: `imagesIcon`,
        meta: {
            auth: true,
            title: '上传图标'
        },
        component: () =>
            import ('@/components/iconFrom/index')
    },
    index,
    system,
    setting,
    masterdatashow,
    // echarts,

    // people,
];

/**
 * 在主框架之外显示
 */
const pre = 'kefu_';

const frameOuts = frameOut;




/**
 * 错误页面
 */

const errorPage = [{
        path: '/ainat/403',
        name: '403',
        meta: {
            title: '403'
        },
        component: () =>
            import ('@/pages/system/error/403')
    },
    {
        path: '/ainat/500',
        name: '500',
        meta: {
            title: '500'
        },
        component: () =>
            import ('@/pages/system/error/500')
    },
    {
        path: '/ainat/*',
        name: '404',
        meta: {
            title: '404'
        },
        component: () =>
            import ('@/pages/system/error/404')
    }
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [
    ...frameIn,
    ...frameOuts,
    ...errorPage
];