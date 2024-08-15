import {createRouter, createWebHistory} from "vue-router";
import NProgress from "@/plugins/nprogress";
import {errorRouter, commonRouter, authRouter} from "./modules/common-router";
import {ElMessage, ElNotification} from "element-plus";
import { useUserStoreHook } from "@/store/modules/user"

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
    // NProgress 开始
    NProgress.start();
    // // TODO 在跳转路由之前，清除所有的请求
    // axiosCanceler.removeAllPending();

    // 如果是访问登陆页，直接放行
    if (to.path === "/login") return next();
    const userStore = useUserStoreHook()
    if (userStore.roles.length !== 0) return next()

    if (!userStore.token && to.path !== "/login") {
        ElNotification.error({title: "错误", message: "请先登录"});
        return next({path: "/login", replace: true });
    }
    // 否则要重新获取权限角色
    try {
        await userStore.getUserInfo()
        const roles = userStore.roles
        // // 生成可访问的 Routes
        // routeSettings.dynamic ? permissionStore.setRoutes(roles) : permissionStore.setAllRoutes()
        // // 将 "有访问权限的动态路由" 添加到 Router 中
        // permissionStore.addRoutes.forEach((route) => router.addRoute(route))
        // // 确保添加路由已完成
        // 设置 replace: true, 因此导航将不会留下历史记录
        next({ ...to, replace: true })
    } catch (err) {
        // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
        userStore.resetToken()
        ElMessage.error(err.message || "路由守卫过程发生错误")
        next("/login")
    }

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
