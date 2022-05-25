import BasicLayout from '@/layouts/basic-layout';

const pre = 'masterdatashow';
const meta = {
  auth: true
};

export default {
    path: '/ainat/masterdatashow',
    name: 'masterdatashow',
    header: 'masterdatashow',
    redirect: {
      name: `${pre}`
    },
    meta,
    component: BasicLayout,
children:[{
    path: 'largescreen',
    name: `${pre}largescreen`,
    meta: {
      auth: ['ainat-masterdatashow-largescreen'],
      title: '数据大屏展示'
    },
    keepAlive: true,
    component: ()=>import('@/pages/masterdatashow/largescreen'),
}]}