<script setup lang="ts">
import { seasons } from '@/content';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <header class="mb-20">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        主题季回顾：<br/>
        <span class="hand-drawn-underline">沉淀与回响</span>
      </h1>
      <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
        每一个季度，我们都聚焦一个核心权利议题。通过深度的社会调研、技术实验与社区共创，将抽象的权利转化为可感知的行动。
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div 
        v-for="(season, idx) in seasons" 
        :key="season.id"
        class="group"
      >
        <div class="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden border border-outline-variant/10 hover:shadow-2xl transition-all duration-500">
          <div class="h-64 overflow-hidden relative">
            <img 
              :src="season.image" 
              :alt="season.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div :class="[
              'absolute top-6 left-6 px-4 py-2 rounded-full text-white font-bold text-sm backdrop-blur-md',
              season.color === 'primary' ? 'bg-primary/80' : 
              season.color === 'secondary' ? 'bg-secondary/80' : 'bg-tertiary/80'
            ]">
              {{ season.number }}
            </div>
          </div>
          <div class="p-10">
            <h3 class="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{{ season.title }}</h3>
            <div class="space-y-6">
              <div>
                <h4 class="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2">核心目标</h4>
                <p class="text-on-surface-variant font-medium">{{ season.goal }}</p>
              </div>
              <div>
                <h4 class="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-3">关键产出</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(output, i) in season.outputs" 
                    :key="i" 
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high rounded-lg text-sm font-bold text-on-surface"
                  >
                    <CheckCircle2 :size="14" class="text-primary" />
                    {{ output }}
                  </span>
                </div>
              </div>
            </div>
            <button class="mt-10 flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              查看完整报告 <ArrowRight :size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <section class="mt-32 bg-primary rounded-[3rem] p-12 md:p-20 text-on-primary text-center relative overflow-hidden">
      <div class="relative z-10 max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-black mb-6">每一个权利的进步，<br/>都离不开你的关注。</h2>
        <p class="text-on-primary/80 text-lg mb-10">
          订阅我们的季度简报，第一时间获取下一季主题预告及社区共创邀请。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <input 
            type="email" 
            placeholder="输入您的邮箱地址" 
            class="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/20 transition-all sm:w-80"
          />
          <button class="px-8 py-4 bg-tertiary-container text-on-tertiary-container rounded-xl font-bold hover:shadow-lg transition-all">
            立即订阅
          </button>
        </div>
      </div>
      <div class="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-tertiary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
    </section>
  </div>
</template>
