import store from '@/store'
import {useUserStoreHook} from "@/store/modules/user.js";

function checkPermission(el, binding) {
    const allowedPermissions = binding.value

    const userStore = useUserStoreHook()
    const permissions = userStore.permissions

    if (Array.isArray(allowedPermissions) && allowedPermissions.length > 0) {
        const hasPermission = permissions && permissions.some(perm => {
            return allowedPermissions.includes(perm.code)
        })

        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    } else {
        throw new Error(`need allowed permissions! Like v-permission="['perm1', 'perm2']"`)
    }
}

export default {
    mounted(el, binding) {
        checkPermission(el, binding)
    },
    update(el, binding) {
        checkPermission(el, binding)
    }
}
