<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { FileText, Clock, ChevronLeft, ChevronRight, Target, BookOpen } from 'lucide-vue-next';
import { getOpinionById, getTopicById, getProjectById, parseContentLinks, opinions } from '@/content';
import VueMarkdown from 'vue-markdown-render';
import { isValidImage } from '@/lib/utils';

const route = useRoute();
const opinion = computed(() => getOpinionById(route.params.id as string));
const topic = computed(() => opinion.value?.topicId ? getTopicById(opinion.value.topicId) : undefined);
const project = computed(() => opinion.value?.projectId ? getProjectById(opinion.value.projectId) : undefined);

const relatedOpinions = computed(() => {
  if (!opinion.value) return [];
  const currentId = opinion.value.id;
  return opinions
    .filter(o => o.id !== currentId && (
      o.topicId === opinion.value?.topicId ||
      o.projectId === opinion.value?.projectId
    ))
    .slice(0, 3);
});

const prevNextOpinion = computed(() => {
  if (!opinion.value) return { prev: null, next: null };
  
  const sortedOpinions = [...opinions].sort((a, b) => {
    if (a.homeOrder !== undefined && b.homeOrder !== undefined) {
      return a.homeOrder - b.homeOrder;
    }
    const idA = String(a.id);
    const idB = String(b.id);
    return idA.localeCompare(idB);
  });
  
  const currentIndex = sortedOpinions.findIndex(o => o.id === opinion.value!.id);
  
  return {
    prev: currentIndex > 0 ? sortedOpinions[currentIndex - 1] : null,
    next: currentIndex < sortedOpinions.length - 1 ? sortedOpinions[currentIndex + 1] : null
  };
});
</script>

<template>
  <div class="pt-20">
    <section v-if="opinion" class="py-12 px-6 bg-gradient-to-b from-primary/5 to-transparent">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-6 text-sm">
          <span 
            :class="[
              'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest',
              opinion.type === 'biweekly' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
            ]"
          >
            {{ opinion.type === 'biweekly' ? '双周刊' : opinion.type === 'monthly' ? '月度盘点' : '文章' }}
          </span>
          <router-link 
            v-if="topic"
            :to="`/topic/${topic.id}`"
            class="flex items-center gap-2 text-primary hover:underline transition-colors"
          >
            <Target :size="14" />
            {{ topic.title }}
          </router-link>
          <router-link 
            v-if="project && !topic"
            :to="`/project/${project.id}`"
            class="flex items-center gap-2 text-primary hover:underline transition-colors"
          >
            <FileText :size="14" />
            {{ project.title }}
          </router-link>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight">{{ opinion.title }}</h1>
        
        <div class="flex items-center gap-6 mb-10 text-sm text-on-surface-variant">
          <span class="font-medium">{{ opinion.author }}</span>
          <span>{{ opinion.date }}</span>
          <div class="flex items-center gap-1">
            <Clock :size="14" />
            <span>{{ opinion.readTime }}</span>
          </div>
        </div>

        <div v-if="isValidImage(opinion.image)" class="aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
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
      </div>
    </section>

    <section v-if="opinion?.content" class="px-6 -mt-16">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="prose-custom">
            <VueMarkdown :source="parseContentLinks(opinion.content)" />
          </div>
        </article>

        <div v-if="prevNextOpinion.prev || prevNextOpinion.next" class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <router-link 
            v-if="prevNextOpinion.prev"
            :to="`/opinions/${prevNextOpinion.prev.id}`"
            class="group flex items-center gap-3 p-4 bg-surface-container-low rounded-xl hover:shadow-lg transition-all"
          >
            <ChevronLeft :size="20" class="text-on-surface-variant group-hover:text-primary transition-colors" />
            <div class="flex-1 min-w-0">
              <div class="text-xs text-on-surface-variant mb-1">上一篇</div>
              <div class="font-medium text-sm truncate group-hover:text-primary transition-colors">{{ prevNextOpinion.prev.title }}</div>
            </div>
          </router-link>
          <div v-else></div>
          
          <router-link 
            v-if="prevNextOpinion.next"
            :to="`/opinions/${prevNextOpinion.next.id}`"
            class="group flex items-center justify-end gap-3 p-4 bg-surface-container-low rounded-xl hover:shadow-lg transition-all text-right"
          >
            <div class="flex-1 min-w-0">
              <div class="text-xs text-on-surface-variant mb-1">下一篇</div>
              <div class="font-medium text-sm truncate group-hover:text-primary transition-colors">{{ prevNextOpinion.next.title }}</div>
            </div>
            <ChevronRight :size="20" class="text-on-surface-variant group-hover:text-primary transition-colors" />
          </router-link>
          <div v-else></div>
        </div>
      </div>
    </section>

    <section v-if="relatedOpinions.length" class="py-16 px-6 bg-surface-container-low">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <BookOpen :size="24" class="text-primary" />
          相关文章
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link
            v-for="related in relatedOpinions"
            :key="related.id"
            :to="`/opinions/${related.id}`"
            class="group p-6 bg-white rounded-xl hover:shadow-lg transition-all"
          >
            <h3 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {{ related.title }}
            </h3>
            <p class="text-on-surface-variant text-sm line-clamp-2 mb-3">
              {{ related.excerpt }}
            </p>
            <span class="text-xs text-on-surface-variant">{{ related.date }}</span>
          </router-link>
        </div>
      </div>
    </section>
    
    <section v-if="!opinion" class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该文章</p>
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
