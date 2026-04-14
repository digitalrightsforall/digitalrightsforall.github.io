<script setup lang="ts">
import { ArrowRight, Users, FileText, GraduationCap, Target, Calendar, Sparkles } from 'lucide-vue-next';
import { campaigns, publications, workshops, events } from '@/content';
import { cn } from '@/lib/utils';

const activeCampaign = campaigns.find(c => c.status === 'active') || campaigns[0];
const latestPublications = publications.slice(0, 3);
const upcomingEvents = events.slice(0, 2);
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
          帮助每一个普通人在算法时代保护自己。
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <router-link to="/campaign" class="w-full sm:w-auto px-10 py-5 bg-primary text-on-primary rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
            了解我们在做什么 <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
          </router-link>
          <router-link to="/about" class="w-full sm:w-auto px-10 py-5 bg-white border-2 border-outline-variant/30 text-on-surface rounded-2xl font-black text-lg hover:bg-surface-container transition-all">
            了解更多
          </router-link>
        </div>
      </div>
    </section>

    <!-- Module 1: What we're doing (Current Campaign) -->
    <section class="py-20 px-6 bg-primary text-on-primary">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1">
            <div class="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-4 opacity-80">
              <Target :size="16" />
              当前进行中
            </div>
            <h2 class="text-4xl md:text-5xl font-black mb-6">{{ activeCampaign.title }}</h2>
            <p class="text-on-primary/80 text-lg leading-relaxed mb-8 max-w-xl">
              {{ activeCampaign.goal }}
            </p>
            <div class="flex items-center gap-6 mb-8">
              <div class="flex items-center gap-2">
                <Users :size="18" />
                <span class="font-bold">{{ activeCampaign.participants }}位普通人参与</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-3 mb-8">
              <span 
                v-for="output in activeCampaign.outputs" 
                :key="output.name"
                class="px-4 py-2 bg-white/10 rounded-full text-sm font-bold"
              >
                {{ output.name }}
              </span>
            </div>
            <router-link :to="`/campaign/${activeCampaign.id}`" class="inline-flex items-center gap-2 text-on-primary font-black text-lg hover:gap-4 transition-all">
              查看项目详情 <ArrowRight :size="20" />
            </router-link>
          </div>
          <div class="flex-1">
            <div class="aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                :src="activeCampaign.image" 
                :alt="activeCampaign.title"
                class="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Module 2: Latest News -->
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold flex items-center gap-3">
            <FileText class="text-primary" :size="32" />
            最近更新
          </h2>
          <router-link to="/news" class="text-primary font-bold hover:gap-2 transition-all inline-flex items-center gap-1">
            查看全部 <ArrowRight :size="16" />
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link 
            v-for="pub in latestPublications" 
            :key="pub.id"
            :to="`/news/${pub.id}`"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <span 
              :class="[
                'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4',
                pub.type === 'biweekly' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
              ]"
            >
              {{ pub.type === 'biweekly' ? '双周刊' : '月度盘点' }}
            </span>
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
            想了解更多？
          </h2>
          <p class="text-on-surface-variant text-lg max-w-xl mx-auto">
            参加我们的互动工作坊，手把手教你保护自己的数字权利
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div 
            v-for="workshop in workshops" 
            :key="workshop.id"
            class="group p-8 bg-surface-container-low rounded-2xl hover:shadow-xl transition-all"
          >
            <div class="text-4xl mb-4">
              {{ workshop.type === 'personal-data' ? '📱' : workshop.type === 'algorithm' ? '⚖️' : '🤖' }}
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {{ workshop.shortTitle || workshop.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4">
              {{ workshop.goal }}
            </p>
            <span class="text-xs font-bold text-primary">
              {{ workshop.participants }}人参与
            </span>
          </div>
        </div>

        <div class="text-center">
          <router-link to="/learn" class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
            探索数字素养 <ArrowRight :size="18" />
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
          <router-link to="/events" class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar class="text-primary" :size="32" />
            </div>
            <h3 class="text-xl font-bold mb-2">参加活动</h3>
            <p class="text-on-surface-variant text-sm mb-4">工作坊、圆桌派线下活动</p>
            <span class="text-primary font-bold text-sm group-hover:gap-2 transition-all inline-flex items-center gap-1">
              查看活动 <ArrowRight :size="14" />
            </span>
          </router-link>

          <button class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all text-center">
            <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users class="text-secondary" :size="32" />
            </div>
            <h3 class="text-xl font-bold mb-2">成为志愿者</h3>
            <p class="text-on-surface-variant text-sm mb-4">用你的专业帮助社区</p>
            <span class="text-secondary font-bold text-sm group-hover:gap-2 transition-all inline-flex items-center gap-1">
              加入我们 <ArrowRight :size="14" />
            </span>
          </button>

          <button class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all text-center">
            <div class="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target class="text-tertiary" :size="32" />
            </div>
            <h3 class="text-xl font-bold mb-2">参与项目</h3>
            <p class="text-on-surface-variant text-sm mb-4">加入行动项目共创</p>
            <span class="text-tertiary font-bold text-sm group-hover:gap-2 transition-all inline-flex items-center gap-1">
              了解更多 <ArrowRight :size="14" />
            </span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>