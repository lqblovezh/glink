// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from './App'
import home from './components/home/home';
import database from './components/database/database';
import periodical from './components/periodical/periodical';
import curriculum from './components/curriculum/curriculum';
import info from './components/info/info'
import book from './components/book/book';
import './common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false

const routes = [
    {path: '/', component: home},
    {path: '/home', component: home},
    {path: '/curriculum/:cid/:id', component: curriculum},
    {path: '/periodical/:cid/:id', component: periodical},
    {path: '/database/:cid/:id', component: database},
    {path: '/book/:cid/:id', component: book},
    {path: '/info/:cid/:id', component: info}
];

const router = new VueRouter({
    routes: routes,
    linkActiveClass: 'active'
});

new Vue({
    router,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
}).$mount('#app');

// router.push('/home');