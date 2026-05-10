import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Roundtable from './components/RoundtableList.vue';
import CocreationList from './components/CocreationList.vue';
import CocreationDetail from './components/CocreationDetail.vue';
import GuideIndex from './components/GuideIndex.vue';
import GuideDetail from './components/GuideDetail.vue';
import OpinionsList from './components/OpinionsList.vue';
import OpinionDetail from './components/OpinionDetail.vue';
import PlayList from './components/PlayList.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: Home },
  
  { path: '/roundtable', component: Roundtable },
  
  { path: '/cocreation', component: CocreationList },
  { path: '/cocreation/:id', component: CocreationDetail },
  
  { path: '/guide', component: GuideIndex },
  { path: '/guide/:id', component: GuideDetail },
  
  { path: '/opinions', component: OpinionsList },
  { path: '/opinions/:id', component: OpinionDetail },
  
  { path: '/play', component: PlayList },
  
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
