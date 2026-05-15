<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { topics, projects } from '@/content';
import { cn, isValidImage } from '@/lib/utils';

export interface CarouselItem {
  id: string;
  type: 'topic' | 'project' | 'guide' | 'opinion' | 'cocreation';
  title: string;
  description?: string;
  excerpt?: string;
  goal?: string;
  image: string;
  url: string;
  participants?: number;
  date?: string;
  status?: string;
  order: number;
}

const currentIndex = ref(0);
const isAutoPlaying = ref(true);
let autoPlayInterval: ReturnType<typeof setInterval> | null = null;

const getAllCarouselItems = computed<CarouselItem[]>(() => {
  const items: CarouselItem[] = [];

  topics.filter(t => t.homeFeatured && isValidImage(t.image)).forEach(topic => {
    items.push({
      id: topic.id,
      type: 'topic',
      title: topic.title,
      description: topic.description,
      image: topic.image,
      url: `/topic/${topic.id}`,
      order: topic.homeOrder || topic.order,
    });
  });

  projects.filter(p => p.homeFeatured && isValidImage(p.image)).forEach(project => {
    items.push({
      id: project.id,
      type: 'project',
      title: project.title,
      description: project.goal,
      image: project.image,
      url: `/project/${project.id}`,
      participants: project.participants,
      status: project.status,
      order: project.homeOrder || 100,
    });
  });

  return items.sort((a, b) => a.order - b.order);
});

const carouselItems = computed(() => getAllCarouselItems.value.slice(-3));

const currentItem = computed(() => carouselItems.value[currentIndex.value]);

const typeLabels: Record<string, string> = {
  topic: '议题',
  project: '项目',
  guide: '指北',
  opinion: '观点',
  cocreation: '共创营',
};

const typeColors: Record<string, string> = {
  topic: 'bg-primary',
  project: 'bg-secondary',
  guide: 'bg-tertiary',
  opinion: 'bg-on-surface-variant',
  cocreation: 'bg-primary',
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
};

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 
    ? carouselItems.value.length - 1 
    : currentIndex.value - 1;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const startAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

onMounted(() => {
  if (carouselItems.value.length > 1) {
    startAutoPlay();
  }
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <section class="py-20 px-6 bg-surface-container-low">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold flex items-center gap-3">
          <span class="text-3xl">🎠</span>
          我们在探索
        </h2>
        <div v-if="carouselItems.length > 1" class="flex items-center gap-2">
          <button 
            @click="prevSlide"
            class="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            aria-label="上一张"
          >
            <ChevronLeft :size="20" />
          </button>
          <div class="flex gap-1.5">
            <button 
              v-for="(_, index) in carouselItems" 
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex ? 'bg-primary w-6' : 'bg-outline-variant hover:bg-outline'
              ]"
              :aria-label="`切换到第 ${index + 1} 张`"
            />
          </div>
          <button 
            @click="nextSlide"
            class="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            aria-label="下一张"
          >
            <ChevronRight :size="20" />
          </button>
        </div>
      </div>

      <div 
        class="relative overflow-hidden rounded-[2rem]"
        @mouseenter="stopAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <div 
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for="item in carouselItems" 
            :key="item.id"
            class="w-full flex-shrink-0"
          >
            <router-link 
              :to="item.url"
              class="group block relative overflow-hidden"
            >
              <div class="aspect-[16/9] relative">
                <img 
                  :src="item.image" 
                  :alt="item.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div class="flex items-center gap-3 mb-4">
                    <span 
                      :class="[
                        'px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full',
                        typeColors[item.type]
                      ]"
                    >
                      {{ typeLabels[item.type] }}
                    </span>
                    <span 
                      v-if="item.status"
                      class="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full"
                      :class="item.status === 'active' ? 'bg-green-500' : 'bg-gray-500'"
                    >
                      {{ item.status === 'active' ? '进行中' : '已完结' }}
                    </span>
                  </div>
                  <h3 class="text-2xl md:text-4xl font-black text-white mb-3 group-hover:text-primary/90 transition-colors">
                    {{ item.title }}
                  </h3>
                  <p class="text-white/80 text-sm md:text-base max-w-2xl mb-6 line-clamp-2">
                    {{ item.description || item.excerpt || item.goal }}
                  </p>
                  <div class="flex items-center gap-6">
                    <div v-if="item.participants && item.participants > 0" class="flex items-center gap-2 text-white/70 text-sm">
                      <span class="font-bold text-white">{{ item.participants }}</span> 人参与
                    </div>
                    <div v-if="item.date" class="flex items-center gap-2 text-white/70 text-sm">
                      {{ item.date }}
                    </div>
                    <span class="inline-flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                      查看详情 <ArrowRight :size="18" />
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
