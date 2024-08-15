import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/style.css'
import App from './App.vue'
import store from "@/store/index.js"
import router from "@/router/index.js"


import { loadSvg } from "@/icons"
import { loadDirectives } from "@/directives"


const app = createApp(App)

/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
