import axios from 'axios'
import {ElMessage} from 'element-plus'
import store from '@/store'
import router from "@/router";
import CookieInfo from "@/utils/CookieInfo.js";
import {useUserStoreHook} from "@/store/modules/user.js";
import {MessageBox} from "@element-plus/icons-vue";
// 请求列表(防重复提交)
let requestList = [];
let cancelToken = axios.CancelToken;

/* 被挂起的请求数组 */
let refreshSubscribers = []

//这个是标识 现在是否正在刷新
let isRefreshing = false

console.log(import.meta.env)
// create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 36000 // request timeout
})

// request interceptor
api.interceptors.request.use(
    config => {
        // do something before request is sent
        //防止重复提交（如果本次是重复操作，则取消，否则将该操作标记到requestList中）
        config.cancelToken = new cancelToken((cancel) => {
            let requestFlag = JSON.stringify(config.url) + JSON.stringify(config.data)
                + JSON.stringify(config.params) + '&' + config.method;
            if (requestList.includes(requestFlag)) {//请求标记已经存在，则取消本次请求，否则在请求列表中加入请求标记
                requestList.splice(requestList.indexOf(requestFlag), 1)
                cancel();//取消本次请求
            } else {
                requestList.push(requestFlag);
            }
        });
        const token = CookieInfo.getToken()
        if (token && !config.headers['refreshToken']) {
            // let each request carry token
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
api.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {

        const userStore = useUserStoreHook()
        //请求返回后，将请求标记从requestList中移除
        let requestFlag = JSON.stringify(response.config.url) + JSON.stringify(response.config.data) + '&' + response.config.method;
        requestList.splice(requestList.findIndex(item => item === requestFlag), 1);
        if (response.headers['content-type'].startsWith('application/octet-stream')) {
            //1. 客户端axios请求 responseType 设置成blob
            //axios.get('async/download_pdf/', {params, responseType: 'blob'})

            // 2. 服务端返回文件流
            // response.setContentType("application/octet-stream");
            // response.setHeader("blob-type", "application/pdf"); // 根据文件类型设置
            // response.setHeader("Content-Disposition", "attachment; filename="+ URLEncoder.encode(filename, "UTF-8"));

            downloadFile(response)
            return true
        }
        const res = response.data

        //4003 token过去，尝试刷新token
        if (res.code === 4003) {
            return refreshToken(response)
        } else {

            if (!res.result) {
                if (response.config.method.toLowerCase() !== 'get') {
                    // get 主动弹出错误信息， 比如表单的异步验证接口， 需要主动捕获错误
                    ElMessage.error(res.msg|| "Error")
                }
                // 403
                if (res.code === 403 || res.code === 'UPM-300') {
                    // to re-login
                    MessageBox.confirm('您可以选择切换身份，重新登录，或者点击取消留在该页面', '抱歉，您没有权限执行该操作', {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        userStore.resetToken().then(() => {
                            router.push({name: 'Login'})
                        })
                    })
                    // ElMessage.warning(res.msg|| "Error")
                    router.push({name: 'Login'})
                }
                return Promise.reject(res.msg || 'Error')
            } else {
                return res.data
            }
        }
    },
    error => {
        console.log('err' + error) // for debug
        // Message({
        //   message: error,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
)
const refreshToken = (response) => {
    console.log('refresh token')

    const userStore = useUserStoreHook()
    const config = response.config
    if (!isRefreshing) {
        return api.post('/api/token/refresh',
            null,
            {
                headers: {
                    'Authorization': 'Bearer ' + store.getters.refreshToken,
                    'refreshToken': true
                },
            }).then(data => {
            userStore.setToken(data.token)
            userStore.setRefreshToken(data.refreshToken)
            refreshSubscribers.forEach(cb => cb(data.token))
            refreshSubscribers = []
            return api(config)
        })
    } else {
        return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            refreshSubscribers.push((token) => {
                config.baseURL = import.meta.env.VITE_BASE_API
                config.headers['Authorization'] = token
                resolve(api(config))
            })
        })
    }

}
const downloadFile = (response) => {
    let url = window.URL.createObjectURL(new Blob([response.data]))
    let disposition = decodeURI(response.headers['content-disposition'])
    // 从响应头中获取文件名称
    let filename = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length)
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.setAttribute('download', filename)
    document.body.appendChild(a)
    a.click() //执行下载
    window.URL.revokeObjectURL(a.href)
    document.body.removeChild(a)

}
export default api
