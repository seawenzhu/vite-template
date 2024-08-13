import { ref } from "vue"
import store from "@/stores"
import { defineStore } from "pinia"
// import { useTagsViewStore } from "./tags-view"
// import { useSettingsStore } from "./settings"
import { getToken, removeToken, setToken } from "@/utils/cookies"
// import { resetRouter } from "@/routers"
import ApiAuth from "@/api/auth.js"

export const useUserStore = defineStore("user", () => {
    const token = ref(getToken() || "")
    const roles = ref([])
    const username = ref("")

    // const tagsViewStore = useTagsViewStore()
    // const settingsStore = useSettingsStore()

    /** 登录 */
    const login = async ({ username, password, uuid, code }) => {
        const { data } = await ApiAuth.loginUsername(username, password, uuid, code )
        setToken(data.token)
        token.value = data.token
    }
    /** 获取用户详情 */
    const getInfo = async () => {
        const { data } = await ApiAuth.getCurrentUserInfo()
        username.value = data.username
        // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
        roles.value = data.roles?.length > 0 ? data.roles : []
    }

    /** 登出 */
    const logout = () => {
        removeToken()
        token.value = ""
        roles.value = []
        // resetRouter()
        // _resetTagsView()
    }
    /** 重置 Token */
    const resetToken = () => {
        removeToken()
        token.value = ""
        roles.value = []
    }
    /** 重置 Visited Views 和 Cached Views */
    // const _resetTagsView = () => {
    //     if (!settingsStore.cacheTagsView) {
    //         tagsViewStore.delAllVisitedViews()
    //         tagsViewStore.delAllCachedViews()
    //     }
    // }

    return { token, roles, username, login, getInfo, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}
