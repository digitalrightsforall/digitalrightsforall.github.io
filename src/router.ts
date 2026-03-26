import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/Home.vue';
import Events from './components/Events.vue';
import Seasons from './components/Seasons.vue';
import Knowledge from './components/Knowledge.vue';
import Article from './components/Article.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/events', component: Events },
  { path: '/seasons', component: Seasons },
  { path: '/knowledge', component: Knowledge },
  { path: '/article/:id', component: Article },
  { path: '/about', component: { template: '<div class="pt-40 text-center text-4xl font-black">关于我们 - 建设中</div>' } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
