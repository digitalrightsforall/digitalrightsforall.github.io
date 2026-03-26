<script setup lang="ts">
import { ArrowRight, History, CheckCircle, Book } from 'lucide-vue-next';
import { seasons } from '@/src/content';
import { cn } from '@/src/lib/utils';
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
          <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          数字时代，权利由你掌控
        </div>
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          守护你的<br/>
          <span class="hand-drawn-underline">数字边界</span>
        </h1>
        <p class="text-on-surface-variant text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12">
          我们是一个共创社区，致力于通过知识、工具与行动，<br class="hidden md:block"/>
          让每一个人都能在算法时代重获自由。
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button class="w-full sm:w-auto px-10 py-5 bg-primary text-on-primary rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
            立即加入社区 <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
          </button>
          <button class="w-full sm:w-auto px-10 py-5 bg-white border-2 border-outline-variant/30 text-on-surface rounded-2xl font-black text-lg hover:bg-surface-container transition-all">
            了解我们的愿景
          </button>
        </div>
      </div>
    </section>

    <!-- Current Season Highlight -->
    <section class="py-32 bg-surface-container-lowest px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row items-center gap-20">
          <div class="flex-1">
            <div class="text-xs font-black uppercase tracking-widest text-primary mb-4">当前主题季</div>
            <h2 class="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
              {{ seasons[0].title }}
            </h2>
            <p class="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
              {{ seasons[0].goal }}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div v-for="output in seasons[0].outputs" :key="output" class="flex items-center gap-3 p-4 bg-white rounded-2xl border border-outline-variant/10 shadow-sm">
                <CheckCircle class="text-primary" :size="24" />
                <span class="font-bold text-on-surface">{{ output }}</span>
              </div>
            </div>
            <router-link to="/seasons" class="inline-flex items-center gap-2 text-primary font-black text-lg hover:gap-4 transition-all">
              回顾往期主题 <History :size="20" />
            </router-link>
          </div>
          <div class="flex-1 relative">
            <div class="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                :src="seasons[0].image" 
                :alt="seasons[0].title"
                class="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary rounded-[2rem] -z-10 -rotate-6"></div>
            <div class="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Knowledge & Help -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h3 class="text-3xl font-bold mb-10 flex items-center gap-3">
            <Book class="text-primary" :size="36" />
            推荐知识库
          </h3>
          <div class="space-y-6">
            <div v-for="i in [1, 2, 3]" :key="i" class="group p-8 bg-white rounded-3xl border border-outline-variant/10 hover:shadow-xl transition-all cursor-pointer">
              <div class="flex items-center gap-4 mb-4">
                <span class="px-3 py-1 bg-secondary/10 text-secondary text-xs font-black rounded-full uppercase tracking-widest">
                  法律解读
                </span>
                <span class="text-xs text-on-surface-variant font-bold">5 分钟阅读</span>
              </div>
              <h4 class="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                数字时代的“遗忘权”：我们真的能彻底消失吗？
              </h4>
              <p class="text-on-surface-variant text-sm leading-relaxed mb-6">
                在互联网永不遗忘的今天，如何行使你的“被遗忘权”？本文将为你深度拆解相关法律条款与技术手段。
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-on-surface-variant">作者：李明 · 数字法学博士</span>
                <ArrowRight :size="20" class="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-surface-container-low rounded-[3rem] p-12 md:p-20 flex flex-col justify-center">
          <h3 class="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
            遇到数字权利侵害？<br/>
            <span class="text-primary">我们在这里。</span>
          </h3>
          <p class="text-on-surface-variant text-lg mb-12 leading-relaxed">
            无论是隐私泄露、算法歧视还是账号被封，社区的法律与技术专家将为你提供公益咨询与支持。
          </p>
          <div class="space-y-4">
            <button class="w-full p-6 bg-white rounded-2xl font-black text-left flex items-center justify-between group hover:shadow-lg transition-all">
              <span>申请公益法律援助</span>
              <ArrowRight :size="24" class="text-primary group-hover:translate-x-2 transition-transform" />
            </button>
            <button class="w-full p-6 bg-white rounded-2xl font-black text-left flex items-center justify-between group hover:shadow-lg transition-all">
              <span>提交技术侵权案例</span>
              <ArrowRight :size="24" class="text-primary group-hover:translate-x-2 transition-transform" />
            </button>
            <button class="w-full p-6 bg-primary text-on-primary rounded-2xl font-black text-left flex items-center justify-between group hover:shadow-lg transition-all">
              <span>加入志愿者专家库</span>
              <ArrowRight :size="24" class="text-on-primary group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
