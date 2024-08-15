import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
// import { useTagsViewStore } from "./tags-view"
// import { useSettingsStore } from "./settings"
import {getRefreshToken, getToken, removeRefreshToken, removeToken, setToken} from "@/utils/cookies"
// import { resetRouter } from "@/router"
import ApiAuth from "@/api/auth.js"

export const useUserStore = defineStore("user", () => {
    const token = ref(getToken() || "")
    const refreshToken = ref(getRefreshToken() || "")
    const roles = ref([])
    const permissions = ref([])
    const resources = ref([])
    const routers = ref([])
    const username = ref("")

    // const tagsViewStore = useTagsViewStore()
    // const settingsStore = useSettingsStore()

    /** 登录 */
    const login = async ({ username, password, uuid, code }) => {
        const data = await ApiAuth.loginUsername(username, password, uuid, code )
        setToken(data.token)
        setRefreshToken(data.refreshToken)
        token.value = data.token
        refreshToken.value = data.refreshToken
    }
    /** 获取用户详情 */
    const getUserInfo = async () => {
        const data = await ApiAuth.getCurrentUserInfo()
        username.value = data.username
        // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
        roles.value = data.roles?.length > 0 ? data.roles : []
        permissions.value = data.smartPermissionList?.length > 0 ? data.smartPermissionList : []
        resources.value = data.smartResourceList?.length > 0 ? data.smartResourceList : []
        routers.value = data.smartRouterList?.length > 0 ? data.smartRouterList : []
    }

    /** 登出 */
    const logout = () => {
        removeToken()
        removeRefreshToken()
        token.value = ""
        refreshToken.value = ""
        roles.value = []
        // resetRouter()
        // _resetTagsView()
    }
    /** 重置 Token */
    const resetToken = () => {
        removeToken()
        removeRefreshToken()
        token.value = ""
        refreshToken.value = ""
        roles.value = []
    }
    /** 重置 Visited Views 和 Cached Views */
    // const _resetTagsView = () => {
    //     if (!settingsStore.cacheTagsView) {
    //         tagsViewStore.delAllVisitedViews()
    //         tagsViewStore.delAllCachedViews()
    //     }
    // }

    return { token, roles, username, login, getUserInfo, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}
