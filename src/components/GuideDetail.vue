<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getGuideById } from '@/content';
import { GraduationCap, Video, FileText, Users } from 'lucide-vue-next';
import { computed } from 'vue';

const route = useRoute();
const guide = computed(() => getGuideById(route.params.id as string));
</script>

<template>
  <div class="pt-20">
    <section v-if="guide" class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-4xl mb-6">
          {{ guide.type === 'personal-data' ? '📱' : guide.type === 'algorithm' ? '⚖️' : '🤖' }}
        </div>
        
        <h1 class="text-4xl font-black mb-6">{{ guide.title }}</h1>
        
        <div class="flex items-center gap-6 mb-8 text-sm">
          <div class="flex items-center gap-2">
            <Users :size="16" />
            <span class="font-bold">{{ guide.participants }}人参与</span>
          </div>
        </div>

        <div class="bg-surface-container-low rounded-2xl p-8 mb-12">
          <p class="text-lg text-on-surface-variant mb-6">{{ guide.goal }}</p>
          <p class="text-on-surface-variant">{{ guide.description }}</p>
        </div>

        <div v-if="guide.videoUrl" class="mb-8">
          <a 
            :href="guide.videoUrl"
            target="_blank"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg transition-all"
          >
            <Video :size="20" />
            观看视频
          </a>
        </div>

        <div v-if="guide.materials?.length" class="mb-12">
          <h2 class="text-2xl font-bold mb-4">学习材料</h2>
          <div class="space-y-3">
            <a 
              v-for="material in guide.materials"
              :key="material.name"
              :href="material.url"
              target="_blank"
              class="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all"
            >
              <FileText :size="20" class="text-primary" />
              <span class="font-medium">{{ material.name }}</span>
            </a>
          </div>
        </div>

        <div v-if="guide.content" class="prose prose-lg max-w-none" v-html="guide.content"></div>
      </div>
    </section>
    
    <section v-else class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该学习资源</p>
    </section>
  </div>
</template>
