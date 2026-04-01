<script setup lang="ts">
import { useRoute } from 'vue-router';
import VueMarkdown from 'vue-markdown-render';
import { articles } from '@/content';
import { ArrowLeft, Share2, Bookmark, MessageSquare, Lightbulb, ChevronRight } from 'lucide-vue-next';

const route = useRoute();
const article = articles.find(a => a.id === route.params.id) || articles[0];
</script>

<template>
  <div class="pt-32 pb-20">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      <!-- Sidebar / TOC -->
      <aside class="lg:col-span-3 hidden lg:block">
        <div class="sticky top-32 space-y-10">
          <router-link to="/knowledge" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold transition-colors">
            <ArrowLeft :size="18" /> 返回知识库
          </router-link>
          
          <div class="space-y-4">
            <h4 class="text-xs font-black uppercase tracking-widest text-on-surface-variant">本文目录</h4>
            <ul class="space-y-3 text-sm font-medium text-on-surface-variant">
              <li class="text-primary font-bold flex items-center gap-2">
                <div class="w-1 h-1 bg-primary rounded-full"></div>
                理解你的数字“影子”
              </li>
              <li class="hover:text-primary cursor-pointer transition-colors pl-3">从“被动防御”到“主动管理”</li>
              <li class="hover:text-primary cursor-pointer transition-colors pl-3">建立个人数字防火墙</li>
            </ul>
          </div>

          <div v-if="article.tips" class="bg-tertiary-container/20 p-6 rounded-2xl border border-tertiary-container/30">
            <div class="flex items-center gap-2 text-tertiary font-black mb-4">
              <Lightbulb :size="20" />
              小贴士
            </div>
            <h5 class="font-bold mb-2">{{ article.tips.title }}</h5>
            <p class="text-xs text-on-surface-variant leading-relaxed mb-4">{{ article.tips.content }}</p>
            <img :src="article.tips.image" alt="Tip" class="w-full rounded-lg" referrerPolicy="no-referrer" />
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="lg:col-span-9">
        <article class="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-100">
          <header class="mb-12">
            <div class="flex flex-wrap items-center gap-4 mb-6 text-sm font-bold text-on-surface-variant">
              <span class="text-primary">{{ article.category }}</span>
              <span class="w-1 h-1 bg-outline-variant rounded-full"></span>
              <span>{{ article.date }}</span>
              <span class="w-1 h-1 bg-outline-variant rounded-full"></span>
              <span>{{ article.readTime }} 阅读</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-8">
              {{ article.title }}
            </h1>
            <div class="flex items-center justify-between py-6 border-y border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {{ article.author[0] }}
                </div>
                <div>
                  <div class="font-bold text-sm">{{ article.author }}</div>
                  <div class="text-xs text-on-surface-variant">致力于数字权利普及</div>
                </div>
              </div>
              <div class="flex gap-4">
                <button class="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                  <Bookmark :size="20" />
                </button>
                <button class="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                  <Share2 :size="20" />
                </button>
              </div>
            </div>
          </header>

          <div class="article-content">
            <vue-markdown :source="article.content" />
          </div>

          <footer class="mt-16 pt-10 border-t border-slate-100">
            <div class="bg-surface-container-low p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 class="font-bold mb-1">觉得这篇文章有帮助吗？</h4>
                <p class="text-sm text-on-surface-variant">分享给更多人，共同守护数字权利。</p>
              </div>
              <div class="flex gap-3">
                <button class="px-6 py-2 bg-white border border-outline-variant/30 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-surface-container transition-all">
                  <MessageSquare :size="16" /> 评论
                </button>
                <button class="px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-bold flex items-center gap-2 hover:shadow-lg transition-all">
                  <Share2 :size="16" /> 立即分享
                </button>
              </div>
            </div>
          </footer>
        </article>

        <!-- Related Articles -->
        <section class="mt-16">
          <h3 class="text-2xl font-bold mb-8">相关阅读</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="i in [1, 2]" :key="i" class="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4 items-center group cursor-pointer hover:shadow-md transition-all">
              <div class="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                <img src="https://picsum.photos/seed/digital/200/200" alt="Related" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 class="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2">数字时代的“遗忘权”：我们真的能彻底消失吗？</h4>
                <div class="mt-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">法律解读 · 5 分钟</div>
              </div>
              <ChevronRight class="text-outline-variant ml-auto group-hover:text-primary transition-colors" />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
