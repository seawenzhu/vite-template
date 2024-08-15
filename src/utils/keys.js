const SYSTEM_NAME = "smart-admin-vite"

/** 缓存数据时用到的 Key */
class CacheKey {
    static TOKEN = `${SYSTEM_NAME}-token-key`
    static REFRESH_TOKEN = `${SYSTEM_NAME}-refresh-token-key`
    static CONFIG_LAYOUT = `${SYSTEM_NAME}-config-layout-key`
    static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
    static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
    static VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`
    static CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`
}
/** 侧边栏打开状态常量 */
export const SIDEBAR_OPENED = "opened"
/** 侧边栏关闭状态常量 */
export const SIDEBAR_CLOSED = "closed"
export default CacheKey
