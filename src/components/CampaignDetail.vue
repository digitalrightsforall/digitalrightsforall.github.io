<script setup lang="ts">
import { useRoute } from 'vue-router';
import VueMarkdown from 'vue-markdown-render';
import { campaigns, getCampaignById } from '@/content';
import { ArrowLeft, Users, CheckCircle2, Download, ArrowRight } from 'lucide-vue-next';

const route = useRoute();
const campaign = getCampaignById(route.params.id as string) || campaigns[0];
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
            <span class="text-on-surface-variant text-sm font-bold">{{ campaign.year }}年</span>
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

    <!-- Outputs Section -->
    <div class="bg-surface-container-low py-16 mb-16">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
          <CheckCircle2 class="text-primary" :size="24" />
          项目产出
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="output in campaign.outputs" 
            :key="output"
            class="group p-6 bg-white rounded-2xl border border-outline-variant/10 hover:shadow-xl transition-all"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 class="text-secondary" :size="24" />
              </div>
              <h4 class="font-bold text-lg">{{ output }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-6 mb-16">
      <div class="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-100">
        <vue-markdown :source="campaign.content" />
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