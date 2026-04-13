<script setup lang="ts">
import { campaigns } from '@/content';
import { ArrowRight, CheckCircle2, Users, Target } from 'lucide-vue-next';

const activeCampaign = campaigns.find(c => c.status === 'active');
const pastCampaigns = campaigns.filter(c => c.status === 'completed');
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <header class="mb-20">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-6">
        <Target :size="16" />
        行动
      </div>
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        行动项目
      </h1>
      <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
        我们相信，普通人的声音很重要。通过参与式项目，我们一起定义数字权利的未来。
      </p>
    </header>

    <!-- Active Campaign -->
    <section v-if="activeCampaign" class="mb-20">
      <div class="text-xs font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        进行中
      </div>
      <div class="bg-primary rounded-[3rem] p-10 md:p-16 text-on-primary relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://picsum.photos/1200/600')] opacity-10 bg-cover bg-center"></div>
        <div class="relative z-10">
          <div class="flex flex-col md:flex-row gap-12">
            <div class="flex-1">
              <h2 class="text-4xl md:text-5xl font-black mb-6">{{ activeCampaign.title }}</h2>
              <p class="text-on-primary/80 text-lg leading-relaxed mb-8 max-w-2xl">
                {{ activeCampaign.goal }}
              </p>
              <div class="flex items-center gap-8 mb-8">
                <div class="flex items-center gap-2">
                  <Users :size="20" class="text-on-primary/60" />
                  <span class="font-bold">{{ activeCampaign.participants }}人参与</span>
                </div>
                <div class="flex items-center gap-2">
                  <CheckCircle2 :size="20" class="text-on-primary/60" />
                  <span class="font-bold">{{ activeCampaign.outputs.length }}项产出</span>
                </div>
              </div>
              <router-link :to="`/campaign/${activeCampaign.id}`" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-2">
                查看详情 <ArrowRight :size="18" />
              </router-link>
            </div>
            <div class="md:w-1/3">
              <div class="aspect-video rounded-2xl overflow-hidden">
                <img 
                  :src="activeCampaign.image" 
                  :alt="activeCampaign.title"
                  class="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Past Campaigns -->
    <section v-if="pastCampaigns.length > 0">
      <h2 class="text-3xl font-bold mb-10 flex items-center gap-3">
        <CheckCircle2 class="text-primary" :size="32" />
        往期项目
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="campaign in pastCampaigns" 
          :key="campaign.id"
          class="group bg-surface-container-lowest rounded-[2.5rem] overflow-hidden border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 cursor-pointer"
          @click="$router.push(`/campaign/${campaign.id}`)"
        >
          <div class="h-48 overflow-hidden relative">
            <img 
              :src="campaign.image" 
              :alt="campaign.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div class="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-sm font-bold text-on-surface">
              {{ campaign.year }}年
            </div>
          </div>
          <div class="p-10">
            <h3 class="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{{ campaign.title }}</h3>
            <p class="text-on-surface-variant leading-relaxed mb-6">
              {{ campaign.goal }}
            </p>
            <div class="flex items-center justify-between pt-6 border-t border-outline-variant/10">
              <div class="flex items-center gap-4">
                <span class="text-sm font-bold text-on-surface-variant flex items-center gap-1">
                  <Users :size="14" /> {{ campaign.participants }}人
                </span>
                <span class="text-sm font-bold text-on-surface-variant flex items-center gap-1">
                  <CheckCircle2 :size="14" /> {{ campaign.outputs.length }}项产出
                </span>
              </div>
              <ArrowRight :size="20" class="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mt-20 bg-surface-container-low rounded-[3rem] p-12 text-center">
      <h3 class="text-2xl font-bold mb-4">想让你的声音被听见？</h3>
      <p class="text-on-surface-variant mb-8">参与我们的下一个项目，一起定义数字权利的未来</p>
      <button class="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg transition-all">
        关注下一期
      </button>
    </section>
  </div>
</template>