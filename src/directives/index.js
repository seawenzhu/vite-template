import permission  from "./permission/index.js"

/** 挂载自定义指令 */
export function loadDirectives(app) {
    app.directive("permission", permission)
}
