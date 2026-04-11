<script setup lang="ts">
import { useRoute } from 'vue-router';
import VueMarkdown from 'vue-markdown-render';
import { workshops, getWorkshopById } from '@/content';
import { ArrowLeft, Users, FileText, ExternalLink, Video, ClipboardList } from 'lucide-vue-next';

const route = useRoute();
const workshop = getWorkshopById(route.params.id as string) || workshops[0];

const workshopIcons: Record<string, string> = {
  'personal-data': '📱',
  'algorithm': '⚖️',
  'ai-society': '🤖'
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'personal-data': '个人数据',
    'algorithm': '算法社会',
    'ai-society': '机器社会'
  };
  return labels[type] || type;
};

const hasVideo = workshop.videoUrl && workshop.videoUrl.length > 0;
</script>

<template>
  <div class="pt-32 pb-20">
    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-6 mb-16">
      <router-link to="/learn" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold transition-colors mb-8">
        <ArrowLeft :size="18" /> 返回数字素养
      </router-link>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7">
          <div class="text-6xl mb-6">{{ workshopIcons[workshop.type] || '📖' }}</div>
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            {{ workshop.shortTitle || workshop.title }}
          </h1>
          <p class="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8">
            {{ workshop.description }}
          </p>
          
          <div class="flex flex-wrap items-center gap-4 mb-8">
            <a 
              v-for="(material, idx) in workshop.materials" 
              :key="idx"
              :href="material.url"
              target="_blank"
              :class="[
                'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all',
                idx === 0 
                  ? 'bg-primary text-on-primary hover:shadow-lg hover:-translate-y-0.5' 
                  : 'bg-white border-2 border-primary/20 text-primary hover:bg-primary/5'
              ]"
            >
              <FileText :size="18" />
              {{ material.name }}
              <ExternalLink :size="14" />
            </a>
            
            <a 
              v-if="hasVideo"
              :href="workshop.videoUrl"
              target="_blank"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-tertiary text-on-tertiary hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Video :size="18" />
              查看线上视频
            </a>
          </div>

          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 text-on-surface-variant">
              <Users :size="18" />
              <span class="font-bold">{{ workshop.participants }}人参与</span>
            </div>
            <div :class="[
              'px-4 py-2 rounded-full text-sm font-bold',
              workshop.color === 'primary' ? 'bg-primary/10 text-primary' :
              workshop.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
              'bg-tertiary/10 text-tertiary'
            ]">
              {{ getTypeLabel(workshop.type) }}
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-5">
          <div class="aspect-video rounded-[2rem] overflow-hidden shadow-xl">
            <img 
              :src="workshop.image" 
              :alt="workshop.title"
              class="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 工作坊内容 -->
    <div class="bg-surface-container-low py-16 mb-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="workshop-content max-w-4xl">
          <vue-markdown :source="workshop.content" />
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="max-w-7xl mx-auto px-6">
      <div class="bg-surface-container-low rounded-[3rem] p-12 text-center">
        <h3 class="text-2xl font-bold mb-4">想参加我们的工作坊？</h3>
        <p class="text-on-surface-variant mb-8">关注下一期活动报名</p>
        <button class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg transition-all">
          登记参加
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* 工作坊内容样式 */
.workshop-content {
  color: var(--on-surface-variant, #1a1a1a);
  line-height: 1.7;
}

.workshop-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 32px;
  color: var(--on-surface, #1a1a1a);
}

.workshop-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 40px;
  color: var(--on-surface, #1a1a1a);
  border-bottom: 2px solid var(--primary, #5e40e0);
  padding-bottom: 8px;
}

.workshop-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 28px;
  color: var(--on-surface, #1a1a1a);
}

.workshop-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 20px;
}

.workshop-content p {
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.7;
}

.workshop-content hr {
  margin: 32px 0;
  border: none;
  border-top: 1px solid var(--outline-variant, #e0e0e0);
}

.workshop-content ul,
.workshop-content ol {
  margin-bottom: 16px;
  padding-left: 24px;
}

.workshop-content li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.workshop-content ul li {
  list-style-type: disc;
}

.workshop-content ol li {
  list-style-type: decimal;
}

/* 表格样式 */
.workshop-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.95rem;
}

.workshop-content th,
.workshop-content td {
  padding: 14px 16px;
  text-align: left;
  border: 1px solid var(--outline-variant, #e0e0e0);
}

.workshop-content th {
  background-color: var(--surface-container-low, #f5f5f5);
  font-weight: 600;
  color: var(--on-surface, #1a1a1a);
}

.workshop-content tr:nth-child(even) {
  background-color: var(--surface-container-lowest, #fafafa);
}

.workshop-content td {
  vertical-align: top;
}

/* 引用块样式 */
.workshop-content blockquote {
  border-left: 4px solid var(--primary, #5e40e0);
  padding: 16px 20px;
  margin: 20px 0;
  background-color: var(--surface-container-low, #f5f5f5);
  font-style: italic;
  color: var(--on-surface-variant, #666);
}

/* 加粗文本 */
.workshop-content strong {
  font-weight: 600;
}

/* 链接样式 */
.workshop-content a {
  color: var(--primary, #5e40e0);
  text-decoration: underline;
}

.workshop-content a:hover {
  opacity: 0.8;
}
</style>