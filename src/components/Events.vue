<script setup lang="ts">
import { events } from '@/src/content';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <header class="mb-20">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        社区活动：<br/>
        <span class="hand-drawn-underline">从共识到行动</span>
      </h1>
      <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
        我们不只是在讨论权利，我们正在通过每一场工作坊、黑客松与线下沙龙，实实在在地改变数字世界的规则。
      </p>
    </header>

    <!-- Upcoming Events (Bento Grid) -->
    <section class="mb-32">
      <h2 class="text-3xl font-bold mb-10 flex items-center gap-3">
        <Calendar class="text-primary" :size="32" />
        即将开始
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div 
          v-for="(event, idx) in events.slice(0, 3)" 
          :key="event.id"
          :class="[
            'group rounded-[2.5rem] p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl border border-outline-variant/10',
            idx === 0 ? 'md:col-span-8 bg-primary text-on-primary min-h-[500px]' : 
            idx === 1 ? 'md:col-span-4 bg-tertiary text-on-tertiary' : 
            'md:col-span-4 bg-surface-container-low text-on-surface'
          ]"
        >
          <div>
            <div class="flex flex-wrap items-center gap-4 mb-8">
              <span class="px-4 py-1.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-widest backdrop-blur-md">
                {{ event.type }}
              </span>
              <span class="flex items-center gap-1.5 text-sm font-bold opacity-80">
                <Calendar :size="16" /> {{ event.date }}
              </span>
            </div>
            <h3 class="text-3xl md:text-4xl font-black mb-6 leading-tight group-hover:translate-x-2 transition-transform">{{ event.title }}</h3>
            <p class="text-lg opacity-80 leading-relaxed mb-8 max-w-md">{{ event.description }}</p>
          </div>
          
          <div class="flex items-center justify-between pt-8 border-t border-white/10">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1.5 text-sm font-bold opacity-80">
                <MapPin :size="16" /> {{ event.location }}
              </div>
              <div class="flex items-center gap-1.5 text-sm font-bold opacity-80">
                <Users :size="16" /> {{ event.attendees }}
              </div>
            </div>
            <button :class="[
              'w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110',
              idx === 0 ? 'bg-white text-primary' : 
              idx === 1 ? 'bg-on-tertiary text-tertiary' : 
              'bg-primary text-on-primary'
            ]">
              <ArrowRight :size="24" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Past Events Gallery -->
    <section>
      <h2 class="text-3xl font-bold mb-10 flex items-center gap-3">
        <CheckCircle2 class="text-primary" :size="32" />
        精彩回顾
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in [1, 2, 3, 4]" :key="i" class="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer">
          <img 
            :src="`https://picsum.photos/seed/event-${i}/600/600`" 
            alt="Past Event"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
            <h4 class="text-white font-bold text-lg mb-2">数字权利工作坊 #{{ i }}</h4>
            <p class="text-white/70 text-xs font-bold uppercase tracking-widest">2025年12月 · 上海</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
