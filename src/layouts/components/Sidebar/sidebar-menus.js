export default [
    {
        path: "/",
        name: "home",
        meta: {
            title: "首页",
            svgIcon: "dashboard", //elIcon
            affix: true
        }
    },
    {
        path: "/upm",
        name: 'Upm',
        meta: {
            title: "权限管理",
            svgIcon: "lock",
            affix: true
        },
        children: [
            {
                path: "/upm/user",
                name: "UpmUser",
                meta: {
                    title: "用户管理",
                    svgIcon: "menu",
                    affix: true
                }
            },
            {
                path: "/upm/role",
                name: "UpmRole",
                meta: {
                    title: "角色管理",
                    svgIcon: "menu",
                    affix: true
                }
            },
        ]
    }
]
