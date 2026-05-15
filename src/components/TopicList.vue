<script setup lang="ts">
import { topics } from '@/content';
</script>

<template>
  <div class="pt-20">
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-black mb-8">议题</h1>
        <p class="text-on-surface-variant text-lg mb-12 max-w-2xl">
          探索与普通人数字权利相关的核心议题，从不同角度切入理解数据时代的权益。
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="topic in topics"
            :key="topic.id"
            :to="`/topic/${topic.id}`"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 bg-primary/10 text-primary">
              议题
            </span>
            <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {{ topic.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4 line-clamp-2">
              {{ topic.description }}
            </p>
            <span class="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
              了解更多
              <i class="ri-arrow-right-line"></i>
            </span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
