import 'tailwindcss/tailwind.css';

import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import "element-plus/theme-chalk/dark/css-vars.css";
import './style.css'
import App from './App.vue'
import store from "@/stores/index.js"
import router from "@/routers/index.js"

const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
