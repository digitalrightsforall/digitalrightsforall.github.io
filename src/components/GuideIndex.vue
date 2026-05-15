<script setup lang="ts">
import { guides } from '@/content';
import { GraduationCap } from 'lucide-vue-next';
</script>

<template>
  <div class="pt-20">
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-black mb-8">指北</h1>
        <p class="text-on-surface-variant text-lg mb-12 max-w-2xl">
          学习如何保护个人数据权益，算法时代如何保护自身，如何与AI共处。
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="guide in guides" 
            :key="guide.id"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <div class="text-4xl mb-4">
              {{ guide.type === 'personal-data' ? '📱' : guide.type === 'algorithm' ? '⚖️' : '🤖' }}
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {{ guide.shortTitle || guide.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4 line-clamp-3">
              {{ guide.goal }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-primary">
                {{ guide.participants }}人参与
              </span>
              <a 
                :href="guide.feishuUrl"
                target="_blank"
                class="text-sm font-bold text-primary hover:gap-2 transition-all inline-flex items-center gap-1"
              >
                查看详情 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
