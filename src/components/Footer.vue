<script setup lang="ts">
const footerLinks = [
  { title: '导航', links: [
    { name: '圆桌派', path: '/roundtable' },
    { name: '共创营', path: '/cocreation' },
    { name: '指北', path: '/guide' },
    { name: '观点', path: '/opinions' },
    { name: 'Play', path: '/play' },
  ]},
];

const socialLinks = [
  { name: 'Github', href: 'https://github.com/digitalrightsforall?view_as=public', iconClass: 'ri-github-fill' },
  { name: '微博', href: '#', iconClass: 'ri-weibo-fill' },
  { name: '抖音', href: '#', iconClass: 'ri-tiktok-fill' },
  { name: '邮箱', href: 'mailto:digitalrights@opendatachina.org', iconClass: 'ri-mail-line' },
];
</script>

<template>
  <footer class="bg-surface-container-lowest border-t border-outline-variant/10 pt-20 pb-10 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-12 mb-20">
        <div class="flex-1">
          <router-link to="/" class="flex items-center gap-2 mb-6">
            <img src="/images/logo.png" alt="普通人的数字权利" class="w-10 h-10 object-contain" />
            <span class="text-xl font-black tracking-tighter text-on-surface">普通人的数字权利</span>
          </router-link>
          <p class="text-on-surface-variant max-w-sm leading-relaxed mb-8">
            我们是共创社区，通过资讯、工作坊和行动项目，帮助每一个普通人在机器时代保护自己。
          </p>
          <div class="flex gap-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.href"
              target="_blank"
              class="p-3 rounded-xl bg-surface-container hover:bg-primary hover:text-white transition-all"
              :title="social.name"
            >
              <i :class="social.iconClass" class="text-lg"></i>
            </a>
          </div>
        </div>

        <div class="flex flex-wrap items-start gap-8 lg:gap-16">
          <div v-for="section in footerLinks" :key="section.title">
            <h4 class="text-sm font-black uppercase tracking-widest text-on-surface mb-4">{{ section.title }}</h4>
            <ul class="flex flex-wrap gap-x-6 gap-y-3">
              <li v-for="link in section.links" :key="link.name">
                <router-link :to="link.path" class="text-on-surface-variant hover:text-primary transition-colors">
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>
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
