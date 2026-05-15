<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getRoundtableById, parseContentLinks } from '@/content';
import { computed } from 'vue';
import VueMarkdown from 'vue-markdown-render';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-vue-next';

const route = useRoute();
const item = computed(() => getRoundtableById(route.params.id as string));
</script>

<template>
  <div class="pt-20">
    <section v-if="item" class="py-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
      <div class="max-w-4xl mx-auto">
        <router-link to="/roundtable" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold transition-colors mb-8">
          <ArrowLeft :size="18" /> 返回圆桌派
        </router-link>
        
        <span class="inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4 bg-secondary/10 text-secondary">
          {{ item.category }}
        </span>
        
        <h1 class="text-4xl md:text-5xl font-black mb-6">{{ item.title }}</h1>
        
        <div class="flex flex-wrap items-center gap-6 mb-8 text-sm">
          <div v-if="item.date" class="flex items-center gap-2">
            <Calendar :size="16" />
            <span class="font-bold">{{ item.date }}</span>
          </div>
          <div v-if="item.time" class="flex items-center gap-2">
            <Clock :size="16" />
            <span class="font-bold">{{ item.time }}</span>
          </div>
          <div v-if="item.location" class="flex items-center gap-2">
            <MapPin :size="16" />
            <span class="font-bold">{{ item.location }}</span>
          </div>
        </div>

        <div v-if="item.image" class="aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
          <img 
            :src="item.image" 
            :alt="item.title"
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    <section v-if="item?.description" class="py-12 px-6 bg-surface-container-low">
      <div class="max-w-4xl mx-auto">
        <p class="text-lg text-on-surface-variant">{{ item.description }}</p>
      </div>
    </section>

    <section v-if="item?.content" class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="prose-custom">
            <VueMarkdown :source="parseContentLinks(item.content)" />
          </div>
        </article>
      </div>
    </section>
    
    <section v-else class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该圆桌派活动</p>
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
