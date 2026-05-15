<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, Shield, MessageSquare, GraduationCap, Target, FileText, Gamepad2, BookOpen } from 'lucide-vue-next';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navLinks = [
  { name: '议题', path: '/topics', icon: BookOpen },
  { name: '圆桌派', path: '/roundtable', icon: MessageSquare },
  { name: '共创营', path: '/cocreation', icon: Target },
  { name: '指北', path: '/guide', icon: GraduationCap },
  { name: '观点', path: '/opinions', icon: FileText },
  { name: 'Play', path: '/play', icon: Gamepad2 },
];
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2 group">
        <img src="/images/logo.png" alt="普通人的数字权利" class="w-10 h-10 object-contain group-hover:rotate-12 transition-transform" />
        <span class="text-xl font-black tracking-tighter text-on-surface">普通人的数字权利</span>
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors relative group"
          active-class="text-primary"
        >
          {{ link.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </router-link>
        <button class="px-6 py-2.5 bg-primary text-on-primary rounded-full text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all">
          成为社区一员
        </button>
      </div>

      <!-- Mobile Toggle -->
      <button 
        class="md:hidden p-2 text-on-surface"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <component :is="isMobileMenuOpen ? X : Menu" :size="24" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div 
        v-if="isMobileMenuOpen"
        class="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 md:hidden shadow-xl"
      >
        <div class="flex flex-col gap-4">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="flex items-center gap-3 p-4 rounded-xl hover:bg-surface-container transition-colors font-bold text-on-surface-variant"
            active-class="bg-primary/5 text-primary"
            @click="isMobileMenuOpen = false"
          >
            <component :is="link.icon" :size="20" />
            {{ link.name }}
          </router-link>
          <button class="w-full mt-4 py-4 bg-primary text-on-primary rounded-xl font-bold">
            加入社区
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
