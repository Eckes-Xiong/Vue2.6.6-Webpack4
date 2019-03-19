import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Index from '../../components/admin/index.vue';
import Login from '../../components/admin/login.vue';
import Main from '../../components/admin/main.vue';

import User from '../../components/admin/page/user.vue';
import Infomation from '../../components/admin/page/infomation.vue';
import '../../asset/css/index.scss';

Vue.use(VueRouter);
const router = new VueRouter({
    routes:[
        {path:'/login',component:Login},
        {path:'/main',component:Main,
            children:[
                {path:'user',component:User},
                {path:'infomation',component:Infomation}
            ]
        },
    ]
});

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user:{}
    },
    mutations: {
        setUser (state,newUser) {
            state.user = newUser;
        }
    }
});

const index = new Vue({
    el:'#app',
    store,
    router,
    render:h=>h(Index)
});