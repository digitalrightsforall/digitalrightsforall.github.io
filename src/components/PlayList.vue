<script setup lang="ts">
import { Gamepad2, ExternalLink } from 'lucide-vue-next';

const playItems = [
  {
    id: 'survival-of-the-best-fit',
    title: 'Survival of the Best Fit',
    description: '探索算法对就业市场的影响。',
    type: 'game',
    url: 'https://putongren.org/survivalofthebestfit-zh_CN/',
    image: '/images/play-mbti.png'
  },
  {
    id: 'can-you-break-the-algorithm',
    title: 'Can You Break The Algorithm',
    description: '挑战算法，看看你能否突破信息茧房。',
    type: 'game',
    url: 'https://putongren.org/can-you-break-the-algorithm-zh_CN/zh.html#/',
    image: '/images/play-algorithm.png'
  },
  {
    id: 'digital-rights-mbti',
    title: '数字灵魂 MBTI',
    description: '通过24道情境测试，深度解析你的数字主权、算法信任、代理授权与能动性。',
    type: 'assessment',
    url: 'https://persona.putongren.org/',
    image: '/images/play-survival.png'
  }
];
</script>

<template>
  <div class="pt-20">
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-3 mb-8">
          <Gamepad2 :size="40" class="text-primary" />
          <h1 class="text-4xl font-black">Play</h1>
        </div>
        <p class="text-on-surface-variant text-lg mb-12 max-w-2xl">
          互动体验与工具，通过游戏化方式帮助你理解数字权利相关概念。
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="item in playItems" 
            :key="item.id"
            class="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all"
          >
            <div class="aspect-video relative overflow-hidden">
              <img 
                :src="item.image" 
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div class="absolute bottom-4 left-4 right-4">
                <span 
                  :class="[
                    'inline-block px-2 py-1 rounded text-xs font-bold uppercase',
                    item.type === 'assessment' ? 'bg-primary text-white' : 'bg-secondary text-white'
                  ]"
                >
                  {{ item.type === 'assessment' ? '测评' : '游戏' }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
              <p class="text-on-surface-variant text-sm mb-4 line-clamp-2">
                {{ item.description }}
              </p>
              <a 
                :href="item.url"
                target="_blank"
                class="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                立即体验
                <ExternalLink :size="16" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
