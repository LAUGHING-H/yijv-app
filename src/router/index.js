import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DailyView from '../views/DailyView.vue'
import VideosView from '../views/VideosView.vue'
import ReadView from '../views/ReadView.vue'
import userView from '../views/userView.vue'
import SearchView from '../views/Search/SearchView.vue'



Vue.use(VueRouter)

// 获取原型对象push函数 
const originalPush = VueRouter.prototype.push
// 获取原型对象replace函数 
const originalReplace = VueRouter.prototype.replace
// 修改原型对象中的push函数 
VueRouter.prototype.push = function push(location) { return originalPush.call(this, location).catch(err => err) }
// 修改原型对象中的replace函数 
VueRouter.prototype.replace = function replace(location) { return originalReplace.call(this, location).catch(err => err) }


const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: ':data',
        name: ':data',
        component: () => import("../components/HomeMainComponent.vue"),
      },
    ]
  },

  {
    path: '/daily',
    name: 'daily',
    component: DailyView
  },

  {
    path: '/videos',
    name: 'videos',
    component: VideosView
  },

  {
    path: '/read',
    name: 'read',
    component: ReadView
  },

  {
    path: '/user',
    name: 'user',
    component: userView
  },

  {
    path: '/search',
    name: "search",
    component: SearchView,
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import("../components/HomeMainComponent.vue"),
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
