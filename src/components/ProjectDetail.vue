<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { ArrowRight, Users, Calendar, FileText, Target, ExternalLink, BookOpen } from 'lucide-vue-next';
import { getProjectById, getTopicById, parseContentLinks, roundtables, guides, opinions, cocreations } from '@/content';
import VueMarkdown from 'vue-markdown-render';

const route = useRoute();

const project = computed(() => getProjectById(route.params.id as string));
const topic = computed(() => project.value ? getTopicById(project.value.topicId) : undefined);

const projectRoundtables = computed(() => {
  if (!project.value) return [];
  return roundtables.filter(r => r.projectId === project.value!.id);
});

const projectGuides = computed(() => {
  if (!project.value) return [];
  return guides.filter(g => g.projectId === project.value!.id);
});

const projectOpinions = computed(() => {
  if (!project.value) return [];
  return opinions.filter(o => o.projectId === project.value!.id);
});

const projectCocreations = computed(() => {
  if (!project.value) return [];
  return cocreations.filter(c => c.projectId === project.value!.id);
});

const colorClasses = {
  primary: 'bg-gradient-to-br from-primary to-primary/80 text-on-primary',
  secondary: 'bg-gradient-to-br from-secondary to-secondary/80 text-on-secondary',
  tertiary: 'bg-gradient-to-br from-tertiary to-tertiary/80 text-on-tertiary',
};
</script>

<template>
  <div class="pt-20">
    <section v-if="project" class="py-16 px-6 md:py-24" :class="topic ? colorClasses[topic.color || 'primary'] : colorClasses.primary">
      <div class="max-w-5xl mx-auto">
        <div v-if="topic" class="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-6 opacity-80">
          <Target :size="16" />
          <router-link :to="`/topic/${topic.id}`" class="hover:underline transition-all">
            {{ topic.title }}
          </router-link>
        </div>

        <div class="flex items-center gap-3 mb-6">
          <span
            :class="[
              'px-4 py-1.5 text-xs font-bold uppercase rounded-full',
              project.status === 'active' ? 'bg-green-400 text-green-900' : 'bg-white/20 text-white'
            ]"
          >
            {{ project.status === 'active' ? '进行中' : '已完成' }}
          </span>
          <span v-if="project.year" class="text-sm opacity-80">{{ project.year }}</span>
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          {{ project.title }}
        </h1>

        <div class="flex items-center gap-8 mb-8 text-sm">
          <div v-if="project.participants && project.participants > 0" class="flex items-center gap-2">
            <Users :size="18" />
            <span class="font-semibold">{{ project.participants }} 位普通人参与</span>
          </div>
        </div>

        <p v-if="project.goal" class="text-xl md:text-2xl leading-relaxed mb-10 opacity-90 max-w-3xl">
          {{ project.goal }}
        </p>

        <div v-if="project.image" class="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-10">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    <section v-if="project?.content" class="py-16 px-6 bg-surface">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="prose-custom">
            <VueMarkdown :source="parseContentLinks(project.content)" />
          </div>
        </article>
      </div>
    </section>

    <section v-if="project?.outputs?.length" class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <FileText :size="24" class="text-primary" />
          </div>
          项目成果
        </h2>
        <div class="grid gap-4">
          <a
            v-for="output in project.outputs"
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
      </div>
    </section>

    <section v-if="project?.articles?.length" class="py-16 px-6 bg-surface-container-low">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <div class="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
            <BookOpen :size="24" class="text-secondary" />
          </div>
          相关文章
        </h2>
        <div class="grid gap-4">
          <router-link
            v-for="article in project.articles"
            :key="article.url"
            :to="article.url"
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
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="project?.wikiUrl" class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <a
          :href="project.wikiUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center justify-between p-8 bg-gradient-to-r from-primary to-primary/80 rounded-2xl hover:shadow-xl transition-all"
        >
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText :size="28" class="text-white" />
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

    <section v-if="projectGuides.length" class="py-16 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <div class="w-10 h-10 bg-tertiary/10 rounded-xl flex items-center justify-center">
            <FileText :size="24" class="text-tertiary" />
          </div>
          指北
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link
            v-for="guide in projectGuides"
            :key="guide.id"
            to="/guide"
            class="group p-6 bg-white rounded-xl hover:shadow-lg transition-all"
          >
            <h3 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
              {{ guide.title }}
            </h3>
            <p class="text-on-surface-variant text-sm line-clamp-2 mb-4">
              {{ guide.description }}
            </p>
            <div class="flex items-center gap-2 text-xs text-on-surface-variant">
              <Users :size="14" />
              {{ guide.participants }} 人参与
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="projectOpinions.length" class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <BookOpen :size="24" class="text-primary" />
          </div>
          观点
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link
            v-for="opinion in projectOpinions"
            :key="opinion.id"
            :to="`/opinions/${opinion.id}`"
            class="group p-6 bg-surface-container-low rounded-xl hover:shadow-lg transition-all"
          >
            <h3 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {{ opinion.title }}
            </h3>
            <p class="text-on-surface-variant text-sm line-clamp-2 mb-3">
              {{ opinion.excerpt }}
            </p>
            <span class="text-xs text-on-surface-variant">{{ opinion.date }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="!project" class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该项目</p>
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
