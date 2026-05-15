<script setup lang="ts">
import { roundtables } from '@/content';
</script>

<template>
  <div class="pt-20">
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-black mb-8">圆桌派</h1>
        <p class="text-on-surface-variant text-lg mb-12 max-w-2xl">
          专家分享与讨论，围绕数字权利相关主题的讲座型活动回顾。
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link 
            v-for="item in roundtables" 
            :key="item.id"
            :to="`/roundtable/${item.id}`"
            class="group p-6 bg-white rounded-2xl hover:shadow-xl transition-all block"
          >
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 bg-secondary/10 text-secondary">
              {{ item.category }}
            </span>
            <h3 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4 line-clamp-2">
              {{ item.description }}
            </p>
            <div class="flex items-center justify-between text-xs font-bold text-on-surface-variant">
              <span>{{ item.date }}</span>
              <span v-if="item.location" class="truncate max-w-[150px]">{{ item.location }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
