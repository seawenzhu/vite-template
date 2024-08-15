/** 统一处理 Cookie */

import CacheKey from "@/utils/keys.js"
import Cookies from "js-cookie"

export default {
    getToken() {
        return Cookies.get(CacheKey.TOKEN)
    },
    setToken(token) {
        Cookies.set(CacheKey.TOKEN, token)
    },
    removeToken() {
        Cookies.remove(CacheKey.TOKEN)
    },
    getRefreshToken() {
        return Cookies.get(CacheKey.REFRESH_TOKEN)
    },
    setRefreshToken(token) {
        Cookies.set(CacheKey.REFRESH_TOKEN, token)
    },
    removeRefreshToken() {
        Cookies.remove(CacheKey.REFRESH_TOKEN)
    },
}
