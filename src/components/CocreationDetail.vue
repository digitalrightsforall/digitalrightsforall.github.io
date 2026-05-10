<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getCocreationById } from '@/content';
import { Target, FileText, Users } from 'lucide-vue-next';
import { computed } from 'vue';

const route = useRoute();
const item = computed(() => getCocreationById(route.params.id as string));
</script>

<template>
  <div class="pt-20">
    <section v-if="item" class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-4 opacity-60">
          <Target :size="16" />
          {{ item.status === 'active' ? '进行中' : '已完成' }}
        </div>
        
        <h1 class="text-4xl font-black mb-6">{{ item.title }}</h1>
        
        <div class="flex items-center gap-6 mb-8 text-sm">
          <div v-if="item.participants" class="flex items-center gap-2">
            <Users :size="16" />
            <span class="font-bold">{{ item.participants }}位普通人参与</span>
          </div>
          <div v-if="item.year" class="font-bold">
            {{ item.year }}
          </div>
        </div>

        <div class="aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
          <img 
            :src="item.image" 
            :alt="item.title"
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div v-if="item.goal" class="mb-12">
          <h2 class="text-2xl font-bold mb-4">目标</h2>
          <p class="text-lg text-on-surface-variant">{{ item.goal }}</p>
        </div>

        <div v-if="item.outputs?.length" class="mb-12">
          <h2 class="text-2xl font-bold mb-4">成果</h2>
          <ul class="space-y-3">
            <li v-for="output in item.outputs" :key="output" class="flex items-start gap-3">
              <FileText :size="20" class="text-primary mt-1 flex-shrink-0" />
              <span>{{ output }}</span>
            </li>
          </ul>
        </div>

        <div v-if="item.content" class="prose prose-lg max-w-none" v-html="item.content"></div>
      </div>
    </section>
    
    <section v-else class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该共创项目</p>
    </section>
  </div>
</template>
