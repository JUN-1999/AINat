import BasicLayout from '@/layouts/basic-layout';

const pre = 'authentication_';

export default {
    path: '/supplier/authentication',
    name: 'authentication',
    header: 'authentication',
    redirect: {
        name: `${pre}/authentication`
    },
    component: BasicLayout,
};