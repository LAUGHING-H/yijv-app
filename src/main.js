import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.replace('/home/recommend')
