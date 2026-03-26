<script setup lang="ts">
import { articles } from '@/src/content';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-vue-next';
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <header class="mb-20">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        知识库：<br/>
        <span class="hand-drawn-underline">武装你的数字头脑</span>
      </h1>
      <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
        从基础的隐私设置到深度的法律解读，我们为你准备了全方位的数字权利指南。在这里，知识就是力量。
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="(article, idx) in articles" 
        :key="article.id"
      >
        <router-link :to="`/article/${article.id}`" class="group block h-full bg-white rounded-2xl overflow-hidden border border-outline-variant/10 hover:shadow-xl transition-all">
          <div class="h-52 overflow-hidden">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div class="p-8">
            <div class="flex items-center gap-4 mb-4">
              <span class="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">
                <Tag :size="12" /> {{ article.category }}
              </span>
              <span class="flex items-center gap-1 text-xs font-medium text-on-surface-variant">
                <Clock :size="12" /> {{ article.readTime }}
              </span>
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{{ article.title }}</h3>
            <p class="text-on-surface-variant text-sm line-clamp-3 mb-6 leading-relaxed">{{ article.excerpt }}</p>
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <span class="text-xs font-bold text-on-surface-variant">{{ article.author }}</span>
              <ArrowRight :size="18" class="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </router-link>
      </div>
      
      <!-- Placeholder for more articles -->
      <div v-for="i in [1, 2]" :key="i" class="bg-surface-container-low rounded-2xl p-8 flex flex-col justify-center items-center text-center border-2 border-dashed border-outline-variant/20">
        <BookOpen :size="48" class="text-outline-variant mb-4 opacity-30" />
        <h3 class="text-lg font-bold text-on-surface-variant opacity-50">更多精彩内容正在编写中...</h3>
      </div>
    </div>
  </div>
</template>
