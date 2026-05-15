<script setup lang="ts">
import { ArrowRight, FileText, GraduationCap, Gamepad2, MessageSquare } from 'lucide-vue-next';
import { guides, opinions } from '@/content';
import HomeCarousel from './HomeCarousel.vue';
import { isValidImage } from '@/lib/utils';

interface HomeItem {
  type: 'cocreation' | 'guide' | 'opinion' | 'roundtable' | 'play';
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  goal?: string;
  image: string;
  url: string;
  participants?: number;
  date?: string;
  order: number;
}

function getFeaturedItems<T extends { homeFeatured?: boolean; homeOrder?: number; image?: string }>(items: T[], type: HomeItem['type'], getUrl: (item: T) => string): HomeItem[] {
  return items
    .filter(item => item.homeFeatured && isValidImage(item.image))
    .map(item => ({
      type,
      id: item.id,
      title: item.title,
      description: item.description || item.goal,
      excerpt: (item as any).excerpt,
      goal: item.goal,
      image: item.image || '',
      url: getUrl(item),
      participants: item.participants,
      date: (item as any).date,
      order: item.homeOrder || 999,
    }))
    .sort((a, b) => a.order - b.order);
}

const featuredGuides = getFeaturedItems(guides, 'guide', (g) => g.feishuUrl);
const featuredOpinions = getFeaturedItems(opinions, 'opinion', (o) => `/opinions/${o.id}`);

const latestOpinions = featuredOpinions.length >= 3 
  ? featuredOpinions.slice(0, 3) 
  : [
      ...featuredOpinions,
      ...opinions.filter(o => !o.homeFeatured).slice(0, 3 - featuredOpinions.length)
    ];

const latestGuides = featuredGuides.length >= 3
  ? featuredGuides.slice(0, 3)
  : [
      ...featuredGuides,
      ...guides.filter(g => !g.homeFeatured).slice(0, 3 - featuredGuides.length)
    ];
</script>

<template>
  <div class="pt-20">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
      <div class="absolute inset-0 bg-surface-container-lowest -z-10">
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(94,64,224,0.05),transparent_70%)]"></div>
        <div class="absolute top-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 left-20 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-8 border border-primary/10">
          <Sparkles :size="14" />
          为普通人打造
        </div>
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          在数字时代<br/>
          <span class="hand-drawn-underline">掌握自己的权利</span>
        </h1>
        <p class="text-on-surface-variant text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12">
          我们是共创社区，通过资讯、工作坊和行动项目，<br class="hidden md:block"/>
          帮助每一个普通人在机器时代保护自己。
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <router-link to="/cocreation" class="w-full sm:w-auto px-10 py-5 bg-primary text-on-primary rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
            了解我们在做什么 <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
          </router-link>
          <router-link to="/guide" class="w-full sm:w-auto px-10 py-5 bg-white border-2 border-outline-variant/30 text-on-surface rounded-2xl font-black text-lg hover:bg-surface-container transition-all">
            了解更多
          </router-link>
        </div>
      </div>
    </section>

    <!-- Module 1: Featured Carousel -->
    <HomeCarousel />

    <!-- Module 2: Featured Opinions -->
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold flex items-center gap-3">
            <FileText class="text-primary" :size="32" />
            推荐阅读
          </h2>
          <router-link to="/opinions" class="text-primary font-bold hover:gap-2 transition-all inline-flex items-center gap-1">
            查看全部 <ArrowRight :size="16" />
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link 
            v-for="pub in latestOpinions" 
            :key="pub.id"
            :to="pub.url"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <h3 class="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {{ pub.title }}
            </h3>
            <p class="text-on-surface-variant text-sm line-clamp-2 mb-4">
              {{ pub.excerpt }}
            </p>
            <span class="text-xs font-bold text-on-surface-variant">{{ pub.date }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Module 3: Digital Literacy -->
    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <GraduationCap class="text-primary" :size="32" />
            想学习更多？
          </h2>
          <p class="text-on-surface-variant text-lg max-w-xl mx-auto">
            参加我们的互动工作坊，手把手教你保护自己的数字权利
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <a 
            v-for="guide in latestGuides" 
            :key="guide.id"
            :href="guide.url"
            target="_blank"
            class="group p-8 bg-surface-container-low rounded-2xl hover:shadow-xl transition-all"
          >
            <div class="text-4xl mb-4">
              {{ guide.type === 'guide' ? '📚' : '📱' }}
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {{ guide.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4">
              {{ guide.description }}
            </p>
            <span class="text-xs font-bold text-primary">
              {{ guide.participants }}人参与
            </span>
          </a>
        </div>

        <div class="text-center">
          <router-link to="/guide" class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
            探索指北 <ArrowRight :size="18" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Module 4: Get Involved -->
    <section class="py-20 px-6 bg-surface-container-lowest">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Users class="text-primary" :size="32" />
            想参与行动？
          </h2>
          <p class="text-on-surface-variant text-lg max-w-xl mx-auto">
            多种方式参与，总有一款适合你
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link to="/roundtable" class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare class="text-primary" :size="32" />
            </div>
            <h3 class="text-xl font-bold mb-2">圆桌派</h3>
            <p class="text-on-surface-variant text-sm mb-4">专家分享与讨论</p>
            <span class="text-primary font-bold text-sm group-hover:gap-2 transition-all inline-flex items-center gap-1">
              查看全部 <ArrowRight :size="14" />
            </span>
          </router-link>

          <router-link to="/play" class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all text-center">
            <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gamepad2 class="text-secondary" :size="32" />
            </div>
            <h3 class="text-xl font-bold mb-2">Play</h3>
            <p class="text-on-surface-variant text-sm mb-4">互动体验与工具</p>
            <span class="text-secondary font-bold text-sm group-hover:gap-2 transition-all inline-flex items-center gap-1">
              探索体验 <ArrowRight :size="14" />
            </span>
          </router-link>

          <router-link to="/cocreation" class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all text-center">
            <div class="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target class="text-tertiary" :size="32" />
            </div>
            <h3 class="text-xl font-bold mb-2">共创营</h3>
            <p class="text-on-surface-variant text-sm mb-4">加入行动项目共创</p>
            <span class="text-tertiary font-bold text-sm group-hover:gap-2 transition-all inline-flex items-center gap-1">
              了解更多 <ArrowRight :size="14" />
            </span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>