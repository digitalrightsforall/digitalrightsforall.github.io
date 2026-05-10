<script setup lang="ts">
import { Github, Twitter, Mail, Shield, ArrowUpRight } from 'lucide-vue-next';

const footerLinks = [
  { title: '资源', links: ['知识库', '主题季', '社区活动', '常见问题'] },
  { title: '关于', links: ['我们的愿景', '核心团队', '合作伙伴', '加入我们'] },
  { title: '法律', links: ['隐私政策', '服务条款', '权利声明', '免责声明'] },
];
</script>

<template>
  <footer class="bg-surface-container-lowest border-t border-outline-variant/10 pt-20 pb-10 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
        <div class="lg:col-span-2">
          <router-link to="/" class="flex items-center gap-2 mb-6">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <Shield :size="24" />
            </div>
            <span class="text-xl font-black tracking-tighter text-on-surface">普通人的数字权利</span>
          </router-link>
          <p class="text-on-surface-variant max-w-sm leading-relaxed mb-8">
            我们是共创社区，通过资讯、工作坊和行动项目，帮助每一个普通人在机器时代保护自己。
          </p>
          <div class="flex gap-4">
            <a href="#" class="p-3 rounded-xl bg-surface-container hover:bg-primary hover:text-white transition-all">
              <Twitter :size="18" />
            </a>
            <a href="#" class="p-3 rounded-xl bg-surface-container hover:bg-primary hover:text-white transition-all">
              <Github :size="18" />
            </a>
            <a href="#" class="p-3 rounded-xl bg-surface-container hover:bg-primary hover:text-white transition-all">
              <Mail :size="18" />
            </a>
          </div>
        </div>

        <div v-for="section in footerLinks" :key="section.title">
          <h4 class="text-sm font-black uppercase tracking-widest text-on-surface mb-6">{{ section.title }}</h4>
          <ul class="space-y-4">
            <li v-for="link in section.links" :key="link">
              <a href="#" class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group">
                {{ link }}
                <ArrowUpRight :size="14" class="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-sm text-on-surface-variant font-medium">
          © 2026 普通人的数字权利. 保留所有权利.
        </p>
        <div class="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
          <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          构建令人放心的数字时代
        </div>
      </div>
    </div>
  </footer>
</template>
