<script setup lang="ts">
import { cocreations } from '@/content';
import { Target, Users, Trophy, FileText } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const activeFilter = ref<'all' | 'with-outputs' | 'standalone'>('all');

const filteredCocreations = computed(() => {
  if (activeFilter.value === 'all') {
    return cocreations;
  } else if (activeFilter.value === 'with-outputs') {
    return cocreations.filter(c => c.projectId);
  } else {
    return cocreations.filter(c => !c.projectId);
  }
});

const getStatusIcon = (status: string) => {
  return status === 'active' ? '进行中' : '已完成';
};

const getSeasonLabel = (item: any) => {
  if (item.season) {
    return `第${['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][item.season - 1]}期`;
  }
  return '';
};
</script>

<template>
  <div class="pt-20">
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-black mb-8">共创营</h1>
        <p class="text-on-surface-variant text-lg mb-12 max-w-2xl">
          黑客松与共创计划，普通消费者共同畅想数据权益设计，探索谁能替我们守护和管理个人数据权益。
        </p>

        <div class="flex gap-3 mb-10 overflow-x-auto pb-2">
          <button
            @click="activeFilter = 'all'"
            :class="[
              'px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all',
              activeFilter === 'all'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-on-surface-variant hover:bg-surface-container'
            ]"
          >
            全部活动
          </button>
          <button
            @click="activeFilter = 'with-outputs'"
            :class="[
              'px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all',
              activeFilter === 'with-outputs'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-on-surface-variant hover:bg-surface-container'
            ]"
          >
            共创产出
          </button>
          <button
            @click="activeFilter = 'standalone'"
            :class="[
              'px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all',
              activeFilter === 'standalone'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-on-surface-variant hover:bg-surface-container'
            ]"
          >
            活动概览
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="item in filteredCocreations" 
            :key="item.id"
            class="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all"
          >
            <div class="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-4 opacity-60">
              <Target :size="16" />
              {{ item.status === 'active' ? '进行中' : '已完成' }}
              <span v-if="item.season" class="ml-2">
                {{ getSeasonLabel(item) }}
              </span>
            </div>

            <h3 class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {{ item.title }}
            </h3>
            
            <p v-if="item.goal" class="text-on-surface-variant mb-4">
              {{ item.goal }}
            </p>

            <div class="flex items-center gap-6 mb-4">
              <div v-if="item.participants && item.participants > 0" class="flex items-center gap-2 text-sm font-bold text-on-surface-variant">
                <Users :size="16" />
                {{ item.participants }}人参与
              </div>
              <div v-if="item.outputs?.length" class="flex items-center gap-2 text-sm text-on-surface-variant">
                <Trophy :size="16" />
                {{ item.outputs.length }}项成果
              </div>
              <div v-if="item.projectId" class="flex items-center gap-2 text-sm text-secondary font-bold">
                <FileText :size="16" />
                关联项目
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

        <div v-if="filteredCocreations.length === 0" class="text-center py-12">
          <p class="text-on-surface-variant">暂无符合条件的共创营</p>
        </div>
      </div>
    </section>
  </div>
</template>
