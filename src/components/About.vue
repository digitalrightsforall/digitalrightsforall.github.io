<script setup lang="ts">
import { Shield, Users, Target, ArrowRight, Sparkles } from 'lucide-vue-next';
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <!-- Hero -->
    <section class="mb-24 text-center max-w-4xl mx-auto">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-black uppercase tracking-widest mb-8">
        <Sparkles :size="16" />
        关于我们
      </div>
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
        帮助每一个人<br/>
        <span class="hand-drawn-underline">在算法时代保护自己的权利</span>
      </h1>
      <p class="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
        我们是一个共创社区，致力于通过知识、工具与行动，让每一个普通人都能在数字时代重获自由。
      </p>
    </section>

    <!-- Context -->
    <section class="mb-24">
      <div class="bg-surface-container-low rounded-[3rem] p-10 md:p-16">
        <h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
          <span class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Shield class="text-primary" :size="24" />
          </span>
          我们为什么存在？
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <p class="text-on-surface-variant text-lg leading-relaxed">
              在中国，数字权利领域主要由政府政策、技术公司和学术讨论驱动，关注的是确保企业遵守保护公民利益的法规和框架。
            </p>
            <p class="text-on-surface-variant text-lg leading-relaxed">
              尽管有这些努力，现有的结构是自上而下的，导致基层社区和普通公众很少有机会积极参与塑造这些政策。
            </p>
          </div>
          <div class="space-y-6">
            <p class="text-on-surface-variant text-lg leading-relaxed">
              中国的公民社会相对新兴，很少有组织将数字权利问题纳入其运营范围。
            </p>
            <p class="text-on-surface-variant text-lg leading-relaxed">
              专门关注数字权利的民间组织（CSO）明显缺失，这表明在倡导和维护这些关键问题方面存在差距。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision -->
    <section class="mb-24">
      <h2 class="text-3xl font-bold mb-12 text-center">我们的愿景</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-10 bg-white rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl transition-all">
          <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Users class="text-primary" :size="32" />
          </div>
          <h3 class="text-2xl font-bold mb-4">赋能个人</h3>
          <p class="text-on-surface-variant leading-relaxed">
            加强个人能力，确保他们拥有必要的知识和技能来驾驭数据权利和隐私领域。让公民能够积极参与塑造政策。
          </p>
        </div>
        
        <div class="p-10 bg-white rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl transition-all">
          <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
            <Shield class="text-secondary" :size="32" />
          </div>
          <h3 class="text-2xl font-bold mb-4">完善制度</h3>
          <p class="text-on-surface-variant leading-relaxed">
            完善和加强支撑个人数据权利保护和行使的制度框架。建立强有力的机构，创造可靠有效的治理和权利保障体系。
          </p>
        </div>
        
        <div class="p-10 bg-white rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl transition-all">
          <div class="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center mb-6">
            <Target class="text-tertiary" :size="32" />
          </div>
          <h3 class="text-2xl font-bold mb-4">改变社会</h3>
          <p class="text-on-surface-variant leading-relaxed">
            重塑社会政治环境，使其更具包容性和参与性。培养一个公民不仅是参与者，更是个人数据权利治理领导者的景观。
          </p>
        </div>
      </div>
    </section>

    <!-- What We Do -->
    <section class="mb-24">
      <h2 class="text-3xl font-bold mb-12">我们在做什么</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 bg-surface-container-low rounded-[2rem]">
          <h3 class="text-xl font-bold mb-4">📡 资讯传播</h3>
          <p class="text-on-surface-variant">双周刊和月度盘点，带你了解数字权利领域的最新动态。</p>
        </div>
        <div class="p-8 bg-surface-container-low rounded-[2rem]">
          <h3 class="text-xl font-bold mb-4">📚 数字素养教育</h3>
          <p class="text-on-surface-variant">通过互动工作坊和实用指南，帮助普通人了解和保护自己的数字权利。</p>
        </div>
        <div class="p-8 bg-surface-container-low rounded-[2rem]">
          <h3 class="text-xl font-bold mb-4">🎯 行动项目</h3>
          <p class="text-on-surface-variant">通过公众参与的项目，发出普通人的声音，推动制度改进。</p>
        </div>
        <div class="p-8 bg-surface-container-low rounded-[2rem]">
          <h3 class="text-xl font-bold mb-4">🤝 社区活动</h3>
          <p class="text-on-surface-variant">组织工作坊、圆桌派等活动，连接关注数字权利的普通人。</p>
        </div>
      </div>
    </section>

    <!-- Join -->
    <section class="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-on-primary">
      <h2 class="text-4xl md:text-5xl font-black mb-6">加入我们</h2>
      <p class="text-on-primary/80 text-lg mb-10 max-w-2xl mx-auto">
        每一个权利的进步，都离不开你的关注。成为社区一员，一起守护数字权利。
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:shadow-lg transition-all">
          成为社区一员
        </button>
        <button class="px-8 py-4 bg-white/10 text-on-primary rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
          了解更多
        </button>
      </div>
    </section>
  </div>
</template>