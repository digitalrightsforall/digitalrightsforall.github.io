import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Events from './components/Events.vue';
import Seasons from './components/Seasons.vue';
import Knowledge from './components/Knowledge.vue';
import Article from './components/Article.vue';
import NewsList from './components/NewsList.vue';
import LearnIndex from './components/LearnIndex.vue';
import WorkshopDetail from './components/WorkshopDetail.vue';
import CampaignList from './components/CampaignList.vue';
import CampaignDetail from './components/CampaignDetail.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/news', component: NewsList },
  { path: '/news/:id', component: Article },
  { path: '/learn', component: LearnIndex },
  { path: '/learn/workshop/:id', component: WorkshopDetail },
  { path: '/campaign', component: CampaignList },
  { path: '/campaign/:id', component: CampaignDetail },
  { path: '/events', component: Events },
  { path: '/seasons', component: Seasons },
  { path: '/knowledge', component: Knowledge },
  { path: '/about', component: About },
  { path: '/article/:id', component: Article },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
