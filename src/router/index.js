import {createRouter, createWebHistory} from "vue-router";
import NProgress from "@/plugins/nprogress";
import {errorRouter, commonRouter, authRouter} from "./modules/common-router";
import {ElNotification} from "element-plus";

const router = createRouter({
    history: createWebHistory(),
    // base: '/',
    routes: [
        {
            path: "/",
            component: () => import("@/layouts/index.vue"),
            redirect: "/home",
            children: [
                ...authRouter,
            ]
        },
        ...commonRouter,
        ...errorRouter],
    strict: false,
    scrollBehavior: () => ({left: 0, top: 0})
});


/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
    // 1.NProgress 开始
    NProgress.start();

    // // 2.在跳转路由之前，清除所有的请求
    // axiosCanceler.removeAllPending();

    // 3.如果是访问登陆页，直接放行
    if (to.path === "/login") return next();

    // 4.判断是否有 Token，没有重定向到 login
    // const globalStore = GlobalStore();
    // if (!globalStore.token) return next({ path:  "/login", replace: true });

    // 5.如果没有菜单列表，就重新请求菜单列表并添加动态路由
    // const authStore = AuthStore();
    // if (!authStore.authMenuListGet.length) {
    //     await initDynamicRouter();
    //     return next({ ...to, replace: true });
    // }

    // 6.正常访问页面
    next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
    NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
    NProgress.done();
    ElNotification.error({title: "路由错误", message: error.message});
});

export default router;
