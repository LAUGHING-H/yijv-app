import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import SearchView from '../views/Search/SearchView.vue'



Vue.use(VueRouter)

// 获取原型对象push函数 
const originalPush = VueRouter.prototype.push
// 获取原型对象replace函数 
const originalReplace = VueRouter.prototype.replace
// 修改原型对象中的push函数 
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 修改原型对象中的replace函数 
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}


const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        mate: {keepAlive: true},
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
        component: () => import("../views/DailyView.vue"),
        mate: {keepAlive: true}
    },

    {
        path: '/videos',
        name: 'videos',
        component: () => import('../views/VideosView.vue'),
        mate: {keepAlive: true}
    },

    {
        path: '/read',
        name: 'read',
        component: () => import("../views/ReadView.vue"),
        mate: {keepAlive: true},
        children: [
            {
                path: 'reading',
                name: 'reading',
                component: () => import("../views/ReadView/ArticleReadingView.vue"),
            }
        ]
    },

    {
        path: '/user',
        name: 'user',
        component: UserView,
        mate: {keepAlive: true}
    },

    {
        path: '/search',
        name: "search",
        component: SearchView,
        mate: {keepAlive: true}
    },

    {
        path: '/favorites',
        name: 'favorites',
        component: () => import("@/views/favoritesListView"),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
