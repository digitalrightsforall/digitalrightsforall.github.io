<script setup lang="ts">
import { opinions } from '@/content';
import { FileText } from 'lucide-vue-next';
</script>

<template>
  <div class="pt-20">
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-black mb-8">观点</h1>
        <p class="text-on-surface-variant text-lg mb-12 max-w-2xl">
          深度分析与思考，小区数据权益、AI记忆自主掌控等核心议题。
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link 
            v-for="item in opinions" 
            :key="item.id"
            :to="`/opinions/${item.id}`"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <span 
              :class="[
                'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4',
                item.type === 'biweekly' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
              ]"
            >
              {{ item.type === 'biweekly' ? '双周刊' : item.type === 'monthly' ? '月度盘点' : '文章' }}
            </span>
            <h3 class="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {{ item.title }}
            </h3>
            <p class="text-on-surface-variant text-sm line-clamp-2 mb-4">
              {{ item.excerpt }}
            </p>
            <div class="flex items-center justify-between text-xs font-bold text-on-surface-variant">
              <span>{{ item.author }}</span>
              <span>{{ item.date }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
