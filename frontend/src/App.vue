<script setup lang="ts">
import HeaderSection from './components/HeaderSection.vue'
import SearchSection from './components/SearchSection.vue'
import LiteratureSection from './components/LiteratureSection.vue'
import SummarySection from './components/SummarySection.vue'
import { useStore } from './store'

const { state } = useStore()
</script>

<template>
  <div class="app">
    <HeaderSection />
    <main class="page">
      <SearchSection />
      <LiteratureSection />
      <SummarySection />

      <!-- 初始引导 -->
      <div v-if="!state.hasSearched" class="hero">
        <div class="hero-card">
          <h2>给医学文献查询装上 AI 大脑</h2>
          <p>
            输入疾病描述，AI 自动提取关键词、检索 PubMed 文献并生成专业总结，让你从「大海捞针」中解放出来。
          </p>
          <div class="hero-steps">
            <div class="step"><span class="step-num">1</span>描述研究方向</div>
            <div class="step"><span class="step-num">2</span>生成关键词</div>
            <div class="step"><span class="step-num">3</span>检索并总结</div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>MedSearch · PubMed医学文献AI查询系统</p>
      <p class="footer-note">AI 生成内容仅供参考</p>
    </footer>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="state.toast.show" class="toast" :class="state.toast.type === 'error' ? 'toast-error' : ''">
        {{ state.toast.message }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page {
  flex: 1;
}
.hero {
  margin-top: 20px;
}
.hero-card {
  background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-align: center;
}
.hero-card h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-900);
}
.hero-card p {
  margin-top: 8px;
  font-size: 13.5px;
  color: var(--gray-600);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.hero-steps {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--gray-700);
}
.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--brand-500);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
.footer {
  padding: 24px 16px;
  text-align: center;
  font-size: 12.5px;
  color: var(--gray-500);
}
.footer-note {
  color: var(--gray-400);
  margin-top: 4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
