export default [
    {
        path: '/upm/user',
        name: 'UpmUser',
        component: () => import('@/views/upm/user/index.vue'),
        meta: {
            title: '用户管理',
            icon: 'user',
        }
    }
]
