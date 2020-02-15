import Home from '../pages/Home.vue';
import Chat from '../pages/Chat.vue';
import auth from './middleware/auth';
import guest from './middleware/guest';
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
    path: '/chat',
    name: 'chat',
    component: Chat,
    meta: {
      middleware: [auth]
    }
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
