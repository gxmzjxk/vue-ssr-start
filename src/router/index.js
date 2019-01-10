import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            {
                path: '/z/', component: () => import('../views/sports/index.vue'),
                children: [
                    {
                        path: '/', component: () => import('../views/sports/home/Page.vue'),
                    }
                ]
            },
            {
                path: '/live/', component: () => import('../views/zhibo/index.vue'),
                children: [
                    {
                        path: '/', component: () => import('../views/zhibo/item/page.vue'),
                    }
                ]
            }
        ]
    });
}