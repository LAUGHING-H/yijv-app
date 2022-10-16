import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'
import Vant from 'vant';
import 'vant/lib/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/dist/css/swiper.css'

import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')  //按官网引会找不到然后报错，换成下面那个
require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
// import style
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
