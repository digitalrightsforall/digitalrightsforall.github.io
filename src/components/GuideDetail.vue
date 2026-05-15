<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getGuideById, parseContentLinks } from '@/content';
import { GraduationCap, Video, FileText, Users } from 'lucide-vue-next';
import { computed } from 'vue';
import VueMarkdown from 'vue-markdown-render';

const route = useRoute();
const guide = computed(() => getGuideById(route.params.id as string));
</script>

<template>
  <div class="pt-20">
    <section v-if="guide" class="py-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
      <div class="max-w-4xl mx-auto">
        <div class="text-4xl mb-6">
          {{ guide.type === 'personal-data' ? '📱' : guide.type === 'algorithm' ? '⚖️' : '🤖' }}
        </div>
        
        <h1 class="text-4xl md:text-5xl font-black mb-6">{{ guide.title }}</h1>
        
        <div class="flex items-center gap-6 mb-10 text-sm">
          <div class="flex items-center gap-2">
            <Users :size="16" />
            <span class="font-bold">{{ guide.participants }}人参与</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-6 bg-surface-container-low">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl p-8 shadow-lg mb-12">
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

        <div v-if="guide.materials?.length">
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
      </div>
    </section>

    <section v-if="guide?.content" class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="prose-custom">
            <VueMarkdown :source="parseContentLinks(guide.content)" />
          </div>
        </article>
      </div>
    </section>
    
    <section v-else class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该学习资源</p>
    </section>
  </div>
</template>

<style scoped>
.prose-custom :deep(h1) {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.prose-custom :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.prose-custom :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #2a2a2a;
}

.prose-custom :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.8;
  color: #4a4a4a;
}

.prose-custom :deep(ul),
.prose-custom :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose-custom :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #4a4a4a;
}

.prose-custom :deep(a) {
  color: #1e40af;
  text-decoration: underline;
  font-weight: 500;
}

.prose-custom :deep(a:hover) {
  color: #1e3a8a;
}

.prose-custom :deep(strong) {
  font-weight: 700;
  color: #1a1a1a;
}

.prose-custom :deep(blockquote) {
  border-left: 4px solid #1e40af;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-style: italic;
}

.prose-custom :deep(hr) {
  border: none;
  height: 2px;
  background: #f0f0f0;
  margin: 2rem 0;
}

.prose-custom :deep(code) {
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
}

.prose-custom :deep(pre) {
  background: #1a1a1a;
  color: #f0f0f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose-custom :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}
</style>
