// src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式
import '@/styles/shared-prompts.css';

// 引入 Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
