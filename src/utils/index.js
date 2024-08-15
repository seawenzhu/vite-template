
/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName) => {
    let cssVariableValue = ""
    try {
        // 没有拿到值时，会返回空串
        cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
    } catch (error) {
        console.error(error)
    }
    return cssVariableValue
}

/** 用 JS 设置全局 CSS 变量 */
export const setCssVariableValue = (cssVariableName, cssVariableValue) => {
    try {
        document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
    } catch (error) {
        console.error(error)
    }
}
