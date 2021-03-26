import { h } from '@vue/runtime-core';
import { createRouter, createWebHashHistory } from 'vue-router';
import NotFound from '../components/NotFound.vue'


// 用工厂函数来创建router的实例
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', name: 'DashBorad', component: () => import('../components/DashBorad.vue')},
        {path: '/todos', name: 'todos', component: () => import('../components/todos/todos.vue')},
        {path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound}
    ],
    // scrollBehavior(to,from,savedPosition){
    //     // before {x: 0, y: 0}
    //     // now {left: 0, top: 0}
    //     if (savedPosition){
    //         return savedPosition
    //     } else {
    //         return {top: 0}
    //     }
    // }
});
// 使用命名导航到404页面
router.resolve({
    name: 'not-found',
    params: {
        pathMatch: ['not', 'found'] // 比如你在路由上输入 /not/found，会得到一个用/分隔组成的数组
    }
}).href // 最后会得到一个url,是编码之后的url,例如/not%2ffound
//vue-router新特性 动态路由
router.addRoute({
    path: '/about',
    name: 'about',
    component: () => import('../components/About.vue')
})
// 第一个参数，是父级路由的name
router.addRoute('about', {
    path: '/about/info',
    name: 'info',
    component: {
        render(){
            return h('div', 'info page')
        }
    }
})

export default router