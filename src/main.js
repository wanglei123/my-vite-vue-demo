import { createApp, createRenderer, h} from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// vuex
import store from './store'
// 全局样式
import './styles/index.scss'

// element3
import element3 from './plugins/element3'

createApp(App)
    .component('comp', {
        render(){
            // 这里的h需要引入
            return h('div', 'I am comp')
        }
    })
.use(router).use(element3).use(store).mount('#app')

// 自定义渲染器
const nodeOps = {
    // 处理元素的创建逻辑
    createElement(){},
    // 处理元素的插入逻辑
    insert(){}
}
createRenderer({

})
