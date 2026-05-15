<script setup lang="ts">
import { cocreations } from '@/content';
import { Target } from 'lucide-vue-next';
</script>

<template>
  <div class="pt-20">
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-black mb-8">共创营</h1>
        <p class="text-on-surface-variant text-lg mb-12 max-w-2xl">
          黑客松与共创计划，普通消费者共同畅想数据权益设计，探索谁能替我们守护和管理个人数据权益。
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="item in cocreations" 
            :key="item.id"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <div class="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-4 opacity-60">
              <Target :size="16" />
              {{ item.status === 'active' ? '进行中' : '已完成' }}
            </div>
            <h3 class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-on-surface-variant mb-4">
              {{ item.goal }}
            </p>
            <div class="flex items-center gap-6 mb-4">
              <div v-if="item.participants" class="text-sm font-bold text-on-surface-variant">
                {{ item.participants }}人参与
              </div>
              <div v-if="item.outputs?.length" class="text-sm text-on-surface-variant">
                {{ item.outputs.length }}项成果
              </div>
            </div>
            <router-link 
              :to="`/cocreation/${item.id}`"
              class="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
            >
              查看详情 →
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
