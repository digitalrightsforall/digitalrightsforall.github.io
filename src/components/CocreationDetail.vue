<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getCocreationById, getProjectById, parseContentLinks } from '@/content';
import { Target, FileText, Users, Calendar, Trophy, Link2, ChevronRight, ExternalLink, BookOpen, ArrowRight } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import VueMarkdown from 'vue-markdown-render';

const route = useRoute();
const item = computed(() => getCocreationById(route.params.id as string));
const relatedProject = computed(() => item.value?.projectId ? getProjectById(item.value.projectId) : null);

const activeTab = ref('overview');

const tabs = [
  { id: 'overview', label: '活动概览', icon: Target },
  { id: 'review', label: '共创回顾', icon: FileText },
  { id: 'outputs', label: '共创产出', icon: Trophy },
];

const getSectionContent = (sectionId: string) => {
  if (!item.value?.content) return '';
  
  const content = item.value.content;
  const dividerIndex = content.indexOf('\n---\n');
  
  const sections: Record<string, { start: number; end: number }> = {
    overview: { start: 0, end: dividerIndex > 0 ? dividerIndex : content.length },
    review: { start: dividerIndex > 0 ? dividerIndex + 5 : 0, end: content.length },
  };
  
  const section = sections[sectionId];
  if (!section) return '';
  
  return content.substring(section.start, section.end);
};

const getSeasonLabel = (season: number | undefined) => {
  if (!season) return '';
  const labels = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  return `第${labels[season - 1]}期`;
};
</script>

<template>
  <div class="pt-20">
    <section v-if="item" class="py-16 px-6 md:py-24 bg-gradient-to-b from-primary/10 to-transparent">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-6 opacity-60">
          <Target :size="16" />
          {{ item.status === 'active' ? '进行中' : '已完成' }}
        </div>

        <div class="flex items-center gap-3 mb-6">
          <span
            :class="[
              'px-4 py-1.5 text-xs font-bold uppercase rounded-full',
              item.status === 'active' ? 'bg-green-400 text-green-900' : 'bg-primary/20 text-primary'
            ]"
          >
            {{ item.status === 'active' ? '进行中' : '已完成' }}
          </span>
          <span v-if="item.season" class="px-3 py-1 text-xs font-bold bg-secondary/20 text-secondary rounded-full">
            {{ getSeasonLabel(item.season) }}
          </span>
          <span v-if="item.year" class="text-sm opacity-80">{{ item.year }}</span>
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          {{ item.title }}
        </h1>

        <div v-if="item.subtitle" class="text-xl text-on-surface-variant mb-6">
          {{ item.subtitle }}
        </div>

        <div class="flex items-center gap-8 mb-8 text-sm">
          <div v-if="item.participants && item.participants > 0" class="flex items-center gap-2">
            <Users :size="18" />
            <span class="font-semibold">{{ item.participants }} 位普通人参与</span>
          </div>
          <div v-if="item.projectId && relatedProject" class="flex items-center gap-2">
            <FileText :size="18" />
            <router-link :to="`/projects/${relatedProject.id}`" class="font-semibold text-secondary hover:underline">
              关联项目：{{ relatedProject.title }}
            </router-link>
          </div>
        </div>

        <p v-if="item.goal" class="text-xl md:text-2xl leading-relaxed mb-10 opacity-90 max-w-3xl">
          {{ item.goal }}
        </p>

        <div v-if="item.image" class="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-10">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    <section v-if="item" class="py-8 px-6 bg-surface-container-low sticky top-16 z-10">
      <div class="max-w-4xl mx-auto">
        <div class="flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300',
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-on-surface-variant hover:bg-surface-container'
            ]"
          >
            <component :is="tab.icon" :size="18" />
            {{ tab.label }}
            <ChevronRight :size="16" v-if="activeTab === tab.id" />
          </button>
        </div>
      </div>
    </section>

    <section v-if="item?.content && activeTab === 'overview'" class="py-16 px-6 bg-surface">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="prose-custom">
            <VueMarkdown :source="getSectionContent('overview')" />
          </div>
        </article>
      </div>
    </section>

    <section v-if="item?.content && activeTab === 'review'" class="py-16 px-6 bg-surface">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div class="prose-custom">
            <VueMarkdown :source="getSectionContent('review')" />
          </div>
        </article>
      </div>
    </section>

    <section v-if="activeTab === 'outputs'" class="py-16 px-6 bg-surface">
      <div class="max-w-4xl mx-auto">
        <div v-if="item?.outputs?.length" class="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Trophy :size="24" class="text-primary" />
            </div>
            共创产出
          </h2>
          <div class="prose-custom">
            <VueMarkdown :source="getSectionContent('outputs')" />
          </div>
        </div>

        <div v-if="item?.outputs?.length" class="grid gap-4">
          <a
            v-for="output in item.outputs"
            :key="output.name"
            :href="output.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between p-6 bg-surface-container-low rounded-xl hover:bg-surface-container hover:shadow-lg transition-all"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center">
                <FileText :size="20" class="text-primary" />
              </div>
              <div>
                <div class="font-bold text-lg group-hover:text-primary transition-colors">{{ output.name }}</div>
                <div class="text-sm text-on-surface-variant">{{ output.type }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="text-sm font-medium">查看</span>
              <ExternalLink :size="18" />
            </div>
          </a>
        </div>

        <div v-if="!item?.outputs?.length" class="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p class="text-on-surface-variant">暂无共创产出</p>
        </div>

        <div v-if="relatedProject" class="mt-12 bg-gradient-to-r from-secondary/10 to-transparent rounded-2xl p-8">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
              <Link2 :size="24" class="text-secondary" />
            </div>
            <div>
              <h3 class="font-bold text-lg">关联项目</h3>
              <p class="text-sm text-on-surface-variant">{{ relatedProject.title }}</p>
            </div>
          </div>
          <router-link
            :to="`/projects/${relatedProject.id}`"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-colors"
          >
            查看项目详情
            <ArrowRight :size="18" />
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="item?.articles?.length && activeTab === 'overview'" class="py-16 px-6 bg-surface-container-low">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <div class="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
            <BookOpen :size="24" class="text-secondary" />
          </div>
          相关文章
        </h2>
        <div class="grid gap-4">
          <a
            v-for="article in item.articles"
            :key="article.url"
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between p-6 bg-white rounded-xl hover:shadow-lg transition-all"
          >
            <div class="flex-1">
              <div class="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">{{ article.title }}</div>
              <div class="text-sm text-on-surface-variant mt-1">{{ article.date }}</div>
            </div>
            <div class="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="text-sm font-medium">阅读</span>
              <ArrowRight :size="18" />
            </div>
          </a>
        </div>
      </div>
    </section>

    <section v-if="item?.wikiUrl && activeTab === 'overview'" class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <a
          :href="item.wikiUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center justify-between p-8 bg-gradient-to-r from-primary to-primary/80 rounded-2xl hover:shadow-xl transition-all"
        >
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Link2 :size="28" class="text-white" />
            </div>
            <div>
              <div class="font-bold text-xl text-white">项目 Wiki</div>
              <div class="text-white/80">查看完整的项目文档和资料</div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-white">
            <span class="font-medium">访问</span>
            <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
          </div>
        </a>
      </div>
    </section>

    <section v-if="!item" class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该共创项目</p>
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
