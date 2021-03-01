import { createRouter, createWebHashHistory } from 'vue-router';

// 用工厂函数来创建router的实例
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: () => import('../views/home.vue')}
    ]
});

export default router