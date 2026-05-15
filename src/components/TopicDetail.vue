<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { ArrowRight, Users, Calendar, FileText, Target } from 'lucide-vue-next';
import { getTopicById, getProjectsByIds, getProjectsByTopic, parseContentLinks, roundtables, guides, opinions, cocreations } from '@/content';
import VueMarkdown from 'vue-markdown-render';

const route = useRoute();

const topic = computed(() => getTopicById(route.params.id as string));
const topicProjects = computed(() => {
  if (!topic.value) return [];
  if (topic.value.projects?.length) {
    return getProjectsByIds(topic.value.projects);
  }
  return getProjectsByTopic(topic.value.id);
});

const topicRoundtables = computed(() => {
  if (!topic.value) return [];
  return roundtables.filter(r => r.topicId === topic.value!.id);
});

const topicGuides = computed(() => {
  if (!topic.value) return [];
  return guides.filter(g => g.topicId === topic.value!.id);
});

const topicOpinions = computed(() => {
  if (!topic.value) return [];
  return opinions.filter(o => o.topicId === topic.value!.id);
});

const topicCocreations = computed(() => {
  if (!topic.value) return [];
  return cocreations.filter(c => c.topicId === topic.value!.id);
});
</script>

<template>
  <div class="pt-20">
    <section v-if="topic" class="py-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-6 opacity-60">
          <Target :size="16" />
          议题
        </div>

        <h1 class="text-4xl md:text-5xl font-black mb-6">{{ topic.title }}</h1>

        <p class="text-xl text-on-surface-variant leading-relaxed mb-10">
          {{ topic.description }}
        </p>
      </div>
    </section>

    <section v-if="topic?.content" class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="prose-custom">
            <VueMarkdown :source="parseContentLinks(topic.content)" />
          </div>
        </article>
      </div>
    </section>

    <section v-if="topicProjects.length" class="py-16 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <Target :size="28" class="text-primary" />
          相关项目
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="project in topicProjects"
            :key="project.id"
            :to="`/project/${project.id}`"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <div class="aspect-video rounded-xl overflow-hidden mb-4">
              <img
                :src="project.image || '/images/placeholder.png'"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div class="flex items-center gap-2 mb-2">
              <span
                :class="[
                  'px-2 py-0.5 text-xs font-bold uppercase rounded',
                  project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                ]"
              >
                {{ project.status === 'active' ? '进行中' : '已完成' }}
              </span>
            </div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4 line-clamp-2">
              {{ project.goal }}
            </p>
            <div class="flex items-center gap-4 text-xs text-on-surface-variant">
              <div v-if="project.participants && project.participants > 0" class="flex items-center gap-1">
                <Users :size="14" />
                {{ project.participants }} 人参与
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="topicGuides.length" class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <FileText :size="28" class="text-secondary" />
          指北
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link
            v-for="guide in topicGuides"
            :key="guide.id"
            to="/guide"
            class="group p-8 bg-surface-container-low rounded-2xl hover:shadow-xl transition-all"
          >
            <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {{ guide.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4 line-clamp-2">
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

    <section v-if="topicRoundtables.length" class="py-16 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <Calendar :size="28" class="text-tertiary" />
          圆桌派
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            v-for="roundtable in topicRoundtables"
            :key="roundtable.id"
            :to="`/roundtable`"
            class="group p-6 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <div class="text-xs font-bold text-primary mb-2">
              {{ roundtable.date }}
            </div>
            <h3 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {{ roundtable.title }}
            </h3>
            <p class="text-on-surface-variant text-sm line-clamp-2">
              {{ roundtable.description }}
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="topicOpinions.length" class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <FileText :size="28" class="text-primary" />
          观点
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link
            v-for="opinion in topicOpinions.slice(0, 6)"
            :key="opinion.id"
            :to="`/opinions/${opinion.id}`"
            class="group p-8 bg-surface-container-low rounded-2xl hover:shadow-xl transition-all"
          >
            <h3 class="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {{ opinion.title }}
            </h3>
            <p class="text-on-surface-variant text-sm mb-4 line-clamp-2">
              {{ opinion.excerpt }}
            </p>
            <span class="text-xs text-on-surface-variant">{{ opinion.date }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="!topic" class="py-20 px-6 text-center">
      <p class="text-on-surface-variant">未找到该议题</p>
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
