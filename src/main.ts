import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import ECharts from 'vue-echarts'
// import { use } from "echarts/core";

const app = createApp(App)
// app.config.globalProperties.$echarts = echarts
app.use(router).use(ElementPlus).mount('#app')