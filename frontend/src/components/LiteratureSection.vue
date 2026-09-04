<script setup lang="ts">
import { useStore } from '../store'

const {
  state,
  totalPages,
  currentPage,
  currentPageLiteratures,
  loadMore,
  toggleSelect,
  doSummarize
} = useStore()
</script>

<template>
  <section class="section" v-if="state.hasSearched">
    <h2 class="section-title">文献列表</h2>
    <p class="section-subtitle">
      检索到{{ state.totalCount }}条PubMed医学文献，已为您筛选 9 篇相关文献，请勾选文献，MedSearch将为您生成专业的总结报告。
    </p>

    <!-- 检索中骨架屏 -->
    <div v-if="state.searching" class="skeleton-list">
      <div v-for="i in 5" :key="i" class="skeleton-row">
        <div class="skeleton" style="width: 20px; height: 20px"></div>
        <div class="skeleton" style="flex: 1; height: 20px"></div>
        <div class="skeleton" style="width: 90px; height: 20px"></div>
      </div>
    </div>

    <!-- 文献列表 -->
    <ul v-else class="literature-list">
      <li
        v-for="(lit, i) in currentPageLiteratures"
        :key="lit.pmid"
        class="lit-row"
        :class="{ checked: state.selectedPmids.includes(lit.pmid) }"
      >
        <span class="lit-index">{{ (currentPage - 1) * 9 + i + 1 }}</span>
        <label class="lit-check">
          <input
            type="checkbox"
            :checked="state.selectedPmids.includes(lit.pmid)"
            @change="toggleSelect(lit.pmid)"
          />
          <span class="checkmark"></span>
        </label>
        <div class="lit-body">
          <p class="lit-title">{{ lit.titleZh }}</p>
          <p class="lit-pmid">PMID: {{ lit.pmid }}</p>
        </div>
      </li>
    </ul>

    <!-- 选择信息 -->
    <div class="lit-footer">
      <span class="selected-info">已选择 <strong>{{ state.selectedPmids.length }}</strong> 篇文献</span>
      <span class="page-info">当前第{{ currentPage }}页，共{{ totalPages }}页</span>
    </div>

    <!-- 操作按钮 -->
    <div class="lit-actions">
      <button class="btn btn-secondary" :disabled="currentPage >= totalPages" @click="loadMore">
        更多文献
      </button>
      <button class="btn btn-primary" :disabled="state.summarizing" @click="doSummarize">
        <span v-if="state.summarizing" class="spinner"></span>
        {{ state.summarizing ? '生成中' : '生成AI总结' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.skeleton-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeleton-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.literature-list {
  margin-top: 16px;
  list-style: none;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  overflow: hidden;
}
.lit-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: #fff;
  transition: background 0.12s ease;
}
.lit-row + .lit-row {
  border-top: 1px solid var(--gray-100);
}
.lit-row.checked {
  background: var(--brand-50);
}
.lit-index {
  width: 22px;
  text-align: center;
  color: var(--gray-400);
  font-size: 13px;
  flex-shrink: 0;
}
.lit-check {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
}
.lit-check input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 0;
}
.checkmark {
  position: absolute;
  inset: 0;
  border: 1.5px solid var(--gray-400);
  border-radius: 5px;
  background: #fff;
  transition: all 0.12s ease;
}
.lit-check input:checked + .checkmark {
  background: var(--brand-500);
  border-color: var(--brand-500);
}
.lit-check input:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.lit-body {
  flex: 1;
  min-width: 0;
}
.lit-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-900);
  line-height: 1.45;
}
.lit-pmid {
  font-size: 12px;
  color: var(--gray-400);
  margin-top: 2px;
}
.lit-footer {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--gray-500);
}
.selected-info strong {
  color: var(--brand-600);
  font-weight: 700;
}
.lit-actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
}
.lit-actions .btn {
  flex: 1;
}
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 560px) {
  .lit-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
