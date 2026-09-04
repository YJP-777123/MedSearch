<script setup lang="ts">
import { useStore } from '../store'

const { state } = useStore()

function openOriginal(pmid: string) {
  window.open(`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, '_blank', 'noopener')
}

function formatAuthors(authors: string[]): string {
  if (authors.length <= 3) return authors.join('，')
  return authors.slice(0, 3).join('，') + '，...'
}
</script>

<template>
  <section id="summary-section" class="section" v-if="state.summaries.length">
    <h2 class="section-title">文献详情</h2>
    <p class="section-subtitle">MedSearch已为您检索的文献生成专业总结</p>

    <!-- 总结生成中骨架屏 -->
    <div v-if="state.summarizing" class="skeleton-cards">
      <div v-for="i in 2" :key="i" class="skeleton-card">
        <div class="skeleton" style="height: 20px; width: 70%"></div>
        <div class="skeleton" style="height: 16px; width: 50%; margin-top: 8px"></div>
        <div class="skeleton" style="height: 16px; width: 90%; margin-top: 16px"></div>
        <div class="skeleton" style="height: 16px; width: 80%; margin-top: 8px"></div>
      </div>
    </div>

    <!-- 文献卡片 -->
    <div v-else class="summary-cards">
      <article v-for="s in state.summaries" :key="s.pmid" class="card">
        <header class="card-head">
          <h3 class="card-title-zh">{{ s.titleZh }}</h3>
          <p class="card-title-en">{{ s.titleEn }}</p>
          <div class="card-meta">
            <span class="authors">{{ formatAuthors(s.authors) }}</span>
            <span class="dot">|</span>
            <span>{{ s.pubDate }}</span>
            <span class="dot">|</span>
            <span>PMID: {{ s.pmid }}</span>
            <button class="link" @click="openOriginal(s.pmid)">查看原文</button>
          </div>
        </header>

        <div class="card-body">
          <div class="block">
            <h4 class="block-title"><span class="block-icon icon-find"></span>关键发现</h4>
            <ul>
              <li v-for="(f, i) in s.keyFindings" :key="i">{{ f }}</li>
            </ul>
          </div>
          <div class="block">
            <h4 class="block-title"><span class="block-icon icon-trend"></span>研究趋势</h4>
            <ul>
              <li v-for="(t, i) in s.trends" :key="i">{{ t }}</li>
            </ul>
          </div>
          <div class="block">
            <h4 class="block-title"><span class="block-icon icon-clinic"></span>临床意义</h4>
            <ul>
              <li v-for="(c, i) in s.clinicalSignificance" :key="i">{{ c }}</li>
            </ul>
          </div>
        </div>
      </article>
    </div>

    <p class="disclaimer">* AI 生成内容仅供参考，请结合原文与临床实践综合判断。</p>
  </section>
</template>

<style scoped>
.skeleton-cards {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.skeleton-card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 18px;
}
.summary-cards {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  background: #fff;
  overflow: hidden;
}
.card-head {
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--gray-100);
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
}
.card-title-zh {
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-900);
  line-height: 1.45;
}
.card-title-en {
  font-size: 13px;
  color: var(--gray-500);
  margin-top: 4px;
  line-height: 1.5;
}
.card-meta {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: var(--gray-500);
}
.dot {
  color: var(--gray-200);
}
.link {
  color: var(--brand-500);
  font-weight: 500;
  margin-left: 4px;
}
.link:hover {
  color: var(--brand-600);
  text-decoration: underline;
}
.card-body {
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.block-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 8px;
}
.block-icon {
  width: 6px;
  height: 16px;
  border-radius: 3px;
  display: inline-block;
  flex-shrink: 0;
}
.icon-find {
  background: var(--brand-500);
}
.icon-trend {
  background: #0ea5e9;
}
.icon-clinic {
  background: #16a34a;
}
.block ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.block li {
  position: relative;
  padding-left: 16px;
  font-size: 13.5px;
  color: var(--gray-700);
  line-height: 1.55;
}
.block li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gray-400);
}
.disclaimer {
  margin-top: 14px;
  font-size: 12px;
  color: var(--gray-400);
}
</style>
