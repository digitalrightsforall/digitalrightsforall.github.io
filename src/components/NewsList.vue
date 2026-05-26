<script setup lang="ts">
import { publications } from '@/content';
import { ArrowRight, FileText, Calendar, Clock } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const activeFilter = ref<'all' | 'biweekly' | 'monthly'>('all');

const filteredPublications = computed(() => {
  if (activeFilter.value === 'all') return publications;
  return publications.filter(p => p.type === activeFilter.value);
});

const filterLabel = {
  all: '全部',
  biweekly: '双周刊',
  monthly: '月度盘点'
};
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <header class="mb-16">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        资讯动态
      </h1>
      <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
        双周刊和月度盘点，带你了解数字权利领域的最新动态。
      </p>
    </header>

    <!-- Filter Tabs -->
    <div class="flex gap-3 mb-12">
      <button 
        v-for="filter in ['all', 'biweekly', 'monthly']" 
        :key="filter"
        @click="activeFilter = filter as any"
        :class="[
          'px-6 py-3 rounded-full font-bold text-sm transition-all',
          activeFilter === filter 
            ? 'bg-primary text-on-primary' 
            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
        ]"
      >
        {{ filterLabel[filter as keyof typeof filterLabel] }}
      </button>
    </div>

    <!-- Publications List -->
    <div class="space-y-6">
      <router-link 
        v-for="pub in filteredPublications" 
        :key="pub.id"
        :to="`/news/${pub.id}`"
        class="group block p-8 md:p-10 bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 hover:shadow-xl hover:border-primary/20 transition-all"
      >
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-4">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest',
                  pub.type === 'biweekly' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
                ]"
              >
                {{ pub.type === 'biweekly' ? '双周刊' : '月度盘点' }}
              </span>
              <span class="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                <Calendar :size="14" /> {{ pub.date }}
              </span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
              {{ pub.title }}
            </h2>
            <p class="text-on-surface-variant text-lg leading-relaxed max-w-3xl">
              {{ pub.excerpt }}
            </p>
          </div>
          <div class="flex items-center gap-4 text-sm font-bold text-on-surface-variant">
            <span class="flex items-center gap-1">
              <Clock :size="14" /> {{ pub.readTime }}
            </span>
            <ArrowRight :size="20" class="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
          </div>
        </div>
      </router-link>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPublications.length === 0" class="py-20 text-center">
      <FileText :size="64" class="text-outline-variant mx-auto mb-4 opacity-30" />
      <p class="text-on-surface-variant text-lg">暂无相关内容</p>
    </div>

    <!-- Bottom CTA -->
    <section class="mt-20 bg-surface-container-low rounded-[3rem] p-12 text-center">
      <h3 class="text-2xl font-bold mb-4">想要定期收到最新资讯？</h3>
      <p class="text-on-surface-variant mb-8">订阅我们的推送，不错过每一期内容</p>
      <button class="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg transition-all">
        订阅资讯
      </button>
    </section>
  </div>
</template>