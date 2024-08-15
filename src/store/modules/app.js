import {reactive, ref, watch} from "vue"
import {defineStore} from "pinia"
import CacheKey, {SIDEBAR_OPENED, SIDEBAR_CLOSED} from "@/utils/keys.js"

/** 设置侧边栏状态本地缓存 */
function handleSidebarStatus(opened) {
    opened ? localStorage.setItem(CacheKey.SIDEBAR_STATUS, SIDEBAR_OPENED) :
        localStorage.setItem(CacheKey.SIDEBAR_STATUS, SIDEBAR_CLOSED)
}

export const useAppStore = defineStore("app", () => {
    /** 侧边栏状态 */
    const sidebar = reactive({
        opened: localStorage.getItem(CacheKey.SIDEBAR_STATUS) !== SIDEBAR_CLOSED,
        withoutAnimation: false
    })

    /** 监听侧边栏 opened 状态 */
    watch(
        () => sidebar.opened,
        (opened) => handleSidebarStatus(opened)
    )

    /** 切换侧边栏 */
    const toggleSidebar = (withoutAnimation) => {
        sidebar.opened = !sidebar.opened
        sidebar.withoutAnimation = withoutAnimation
    }
    /** 关闭侧边栏 */
    const closeSidebar = (withoutAnimation) => {
        sidebar.opened = false
        sidebar.withoutAnimation = withoutAnimation
    }

    return { sidebar, toggleSidebar, closeSidebar}
})
