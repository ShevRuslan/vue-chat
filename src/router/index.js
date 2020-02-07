import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Chat from '../views/Chat.vue';
import auth from './middleware/auth';
import guest from './middleware/guest';
import store from '../store';
import middlewarePipeline from './middlewarePipeline';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    meta: {
      middleware: [auth]
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});
export default router;
