import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../../components/index/index.vue';

import Article from '../../components/index/page/article.vue';
import '../../asset/css/index.scss';

Vue.use(VueRouter);
const router = new VueRouter({
    routes:[
        {path:'/article/:id',component:Article}
    ]
});


const index = new Vue({
    el:'#app',
    router,
    render:h=>h(Index)
});