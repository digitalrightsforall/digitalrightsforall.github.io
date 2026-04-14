<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import VueMarkdown from 'vue-markdown-render';
import { campaigns, getCampaignById } from '@/content';
import { ArrowLeft, Users, CheckCircle2, Download, ArrowRight, FileText, Calendar, MessageSquare, Sparkles } from 'lucide-vue-next';

const route = useRoute();
const campaign = getCampaignById(route.params.id as string) || campaigns[0];

const activeTab = ref('intro');

const tabs = [
  { id: 'intro', label: '项目议题', icon: Sparkles },
  { id: 'activities', label: '活动', icon: Calendar },
  { id: 'outputs', label: '产出', icon: FileText },
  { id: 'articles', label: '观点', icon: MessageSquare },
];

const getOutputIcon = (type: string) => {
  const icons: Record<string, string> = {
    pdf: '📄',
    ppt: '📊',
    video: '🎬',
    article: '📝',
  };
  return icons[type] || '📄';
};
</script>

<template>
  <div class="pt-32 pb-20">
    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-6 mb-16">
      <router-link to="/campaign" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold transition-colors mb-8">
        <ArrowLeft :size="18" /> 返回行动项目
      </router-link>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-4 mb-6">
            <span 
              :class="[
                'px-4 py-2 rounded-full text-sm font-bold',
                campaign.status === 'active' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
              ]"
            >
              {{ campaign.status === 'active' ? '进行中' : campaign.year + '年' }}
            </span>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            {{ campaign.title }}
          </h1>
          <p class="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8">
            {{ campaign.goal }}
          </p>
          
          <div class="flex flex-wrap items-center gap-8 mb-8">
            <div class="flex items-center gap-2">
              <Users :size="18" class="text-primary" />
              <span class="font-bold">{{ campaign.participants }}位普通人参与</span>
            </div>
            <div class="flex items-center gap-2">
              <CheckCircle2 :size="18" class="text-secondary" />
              <span class="font-bold">{{ campaign.outputs.length }}项产出</span>
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-5">
          <div class="aspect-video rounded-[2rem] overflow-hidden shadow-xl">
            <img 
              :src="campaign.image" 
              :alt="campaign.title"
              class="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="max-w-7xl mx-auto px-6 mb-12">
      <div class="flex flex-wrap gap-2 border-b border-outline-variant/20">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 rounded-t-xl font-bold transition-all flex items-center gap-2',
            activeTab === tab.id 
              ? 'bg-primary text-on-primary' 
              : 'text-on-surface-variant hover:bg-surface-container-low'
          ]"
        >
          <component :is="tab.icon" :size="18" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="max-w-7xl mx-auto px-6 mb-16">
      <!-- Intro Tab -->
      <div v-if="activeTab === 'intro'" class="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-100">
        <vue-markdown :source="campaign.content" class="campaign-content" />
      </div>

      <!-- Activities Tab -->
      <div v-if="activeTab === 'activities'" class="text-center py-20">
        <div class="text-6xl mb-6">📅</div>
        <h3 class="text-2xl font-bold mb-4">活动信息准备中</h3>
        <p class="text-on-surface-variant">该板块内容正在整理中，敬请期待</p>
      </div>

      <!-- Outputs Tab -->
      <div v-if="activeTab === 'outputs'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a 
            v-for="output in campaign.outputs" 
            :key="output.name"
            :href="output.url"
            target="_blank"
            class="group p-6 bg-white rounded-2xl border border-outline-variant/10 hover:shadow-xl transition-all cursor-pointer"
          >
            <div class="aspect-video rounded-xl overflow-hidden mb-4 bg-surface-container-low">
              <div class="w-full h-full flex items-center justify-center text-4xl bg-surface-container-low">
                {{ getOutputIcon(output.type) }}
              </div>
            </div>
            <h4 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{{ output.name }}</h4>
            <div class="flex items-center gap-2 text-sm text-on-surface-variant">
              <span class="uppercase">{{ output.type }}</span>
              <ArrowRight :size="14" class="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        </div>
      </div>

      <!-- Articles Tab -->
      <div v-if="activeTab === 'articles'">
        <div v-if="campaign.articles && campaign.articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            v-for="article in campaign.articles" 
            :key="article.url"
            :href="article.url"
            target="_blank"
            class="group p-6 bg-white rounded-2xl border border-outline-variant/10 hover:shadow-xl transition-all cursor-pointer"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-2xl">
                📝
              </div>
              <div class="flex-1">
                <h4 class="font-bold mb-1 group-hover:text-primary transition-colors">{{ article.title }}</h4>
                <span class="text-sm text-on-surface-variant">{{ article.date }}</span>
              </div>
              <ArrowRight :size="18" class="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        </div>
        <div v-else class="text-center py-20">
          <div class="text-6xl mb-6">📝</div>
          <h3 class="text-2xl font-bold mb-4">观点文章整理中</h3>
          <p class="text-on-surface-variant">该板块内容正在整理中，敬请期待</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="max-w-7xl mx-auto px-6">
      <div class="bg-primary rounded-[3rem] p-12 text-center text-on-primary">
        <h3 class="text-2xl font-bold mb-4">想让你的声音被听见？</h3>
        <p class="text-on-primary/80 mb-8 max-w-xl mx-auto">
          参与我们的下一个项目，一起定义数字权利的未来
        </p>
        <button class="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:shadow-lg transition-all">
          关注下一期
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.campaign-content {
  color: var(--on-surface-variant, #1a1a1a);
  line-height: 1.7;
}

.campaign-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 32px;
  color: var(--on-surface, #1a1a1a);
}

.campaign-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 40px;
  color: var(--on-surface, #1a1a1a);
  border-bottom: 2px solid var(--primary, #5e40e0);
  padding-bottom: 8px;
}

.campaign-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 28px;
  color: var(--on-surface, #1a1a1a);
}

.campaign-content p {
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.7;
}

.campaign-content ul,
.campaign-content ol {
  margin-bottom: 16px;
  padding-left: 24px;
}

.campaign-content li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.campaign-content ul li {
  list-style-type: disc;
}

.campaign-content ol li {
  list-style-type: decimal;
}

.campaign-content blockquote {
  border-left: 4px solid var(--primary, #5e40e0);
  padding: 16px 20px;
  margin: 20px 0;
  background-color: var(--surface-container-low, #f5f5f5);
  font-style: italic;
  color: var(--on-surface-variant, #666);
}

.campaign-content strong {
  font-weight: 600;
}

.campaign-content hr {
  margin: 32px 0;
  border: none;
  border-top: 1px solid var(--outline-variant, #e0e0e0);
}
</style>