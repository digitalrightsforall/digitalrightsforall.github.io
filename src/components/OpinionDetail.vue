<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getOpinionById } from '@/content';
import { FileText, Clock } from 'lucide-vue-next';
import { computed } from 'vue';

const route = useRoute();
const opinion = computed(() => getOpinionById(route.params.id as string));
</script>

<template>
  <div class="pt-20">
    <section v-if="opinion" class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <span 
          :class="[
            'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4',
            opinion.type === 'biweekly' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
          ]"
        >
          {{ opinion.type === 'biweekly' ? '双周刊' : opinion.type === 'monthly' ? '月度盘点' : '文章' }}
        </span>
        
        <h1 class="text-4xl font-black mb-6">{{ opinion.title }}</h1>
        
        <div class="flex items-center gap-6 mb-8 text-sm text-on-surface-variant">
          <span class="font-medium">{{ opinion.author }}</span>
          <span>{{ opinion.date }}</span>
          <div class="flex items-center gap-1">
            <Clock :size="14" />
            <span>{{ opinion.readTime }}</span>
          </div>
        </div>

        <div class="aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
          <img 
            :src="opinion.image" 
            :alt="opinion.title"
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div v-if="opinion.tips" class="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-12">
          <h3 class="font-bold text-primary mb-2">{{ opinion.tips.title }}</h3>
          <p class="text-on-surface-variant">{{ opinion.tips.content }}</p>
        </div>

        <div v-if="opinion.content" class="prose prose-lg max-w-none" v-html="opinion.content"></div>
      </div>
    </section>
    
    <section v-else class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该文章</p>
    </section>
  </div>
</template>
