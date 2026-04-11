<script setup lang="ts">
import { workshops } from '@/content';
import { ArrowRight, BookOpen, Users, FileText, Sparkles } from 'lucide-vue-next';

const workshopIcons: Record<string, string> = {
  'personal-data': '📱',
  'algorithm': '⚖️',
  'ai-society': '🤖'
};

const workshopDescriptions: Record<string, string> = {
  'personal-data': '了解个人数据流动路径',
  'algorithm': '认识算法如何影响我们的日常生活和决策',
  'ai-society': '探讨 AI 时代我们如何与自动化系统共存'
};

const guides = [
  { title: '如何检索我在各平台的数据', category: '指南' },
  { title: '个人信息保护法实用解读', category: '法律' },
  { title: '数字权利自查清单', category: '工具' }
];
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <header class="mb-20">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-6">
        <Sparkles :size="16" />
        为普通人打造
      </div>
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        数字素养
      </h1>
      <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
        在这里，你可以系统地了解数字权利的基础知识。我们提供互动工作坊和实用指南，帮助你更好地保护自己。
      </p>
    </header>

    <!-- Workshop Cards -->
    <section class="mb-20">
      <h2 class="text-3xl font-bold mb-10 flex items-center gap-3">
        <Users class="text-primary" :size="32" />
        互动工作坊
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div 
            v-for="workshop in workshops" 
            :key="workshop.id"
            class="group p-10 bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            @click="$router.push(`/learn/workshop/${workshop.id}`)"
          >
          <div class="text-5xl mb-6">{{ workshopIcons[workshop.type] || '📖' }}</div>
          <h3 class="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
            {{ workshop.shortTitle || workshop.title }}
          </h3>
          <p class="text-on-surface-variant leading-relaxed mb-6">
            {{ workshopDescriptions[workshop.type] || workshop.description }}
          </p>
          <div class="flex items-center justify-between pt-6 border-t border-outline-variant/10">
            <span class="text-sm font-bold text-on-surface-variant">
              {{ workshop.participants }}人参与
            </span>
            <span class="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
              了解更多 <ArrowRight :size="18" />
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Guides Section -->
    <section class="mb-20">
      <h2 class="text-3xl font-bold mb-10 flex items-center gap-3">
        <FileText class="text-secondary" :size="32" />
        配套指南
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="guide in guides" 
          :key="guide.title"
          class="group p-6 bg-white rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-all cursor-pointer"
        >
          <span class="text-xs font-bold text-secondary bg-secondary/5 px-2 py-1 rounded mb-4 inline-block">
            {{ guide.category }}
          </span>
          <h4 class="text-lg font-bold group-hover:text-primary transition-colors">
            {{ guide.title }}
          </h4>
          <ArrowRight :size="18" class="text-primary mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </section>

    <!-- Getting Started -->
    <section class="bg-surface-container-low rounded-[3rem] p-12 md:p-20">
      <div class="max-w-3xl mx-auto text-center">
        <BookOpen :size="48" class="text-primary mx-auto mb-6" />
        <h3 class="text-3xl font-bold mb-4">数字权利入门</h3>
        <p class="text-on-surface-variant text-lg mb-8">
          第一次接触数字权利？從這裡開始，了解最基本的概念和保護方法。
        </p>
        <button class="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all inline-flex items-center gap-2">
          开始入门 <ArrowRight :size="18" />
        </button>
      </div>
    </section>
  </div>
</template>