<script setup lang="ts">
import { useStore } from '../store'

const { state, doGenerateKeywords, addKeyword, removeKeyword, doSearch } = useStore()
</script>

<template>
  <section class="section">
    <h2 class="section-title">MedSearch检索关键词</h2>
    <p class="section-subtitle">
      输入疾病/病理/研究方向，MedSearch将自动提取核心关键词并构建PubMed检索策略。例：肺腺癌的EGFR突变与预后相关性
    </p>

    <!-- 第一行：描述输入 + 生成关键词 -->
    <div class="row-desc">
      <textarea
        v-model="state.description"
        class="textarea"
        rows="2"
        maxlength="300"
        placeholder="请输入疾病描述或研究方向..."
      ></textarea>
      <div class="desc-meta">
        <span>{{ state.description.length }}/300</span>
      </div>
      <button
        class="btn btn-secondary"
        :disabled="state.generating || state.description.trim().length < 10"
        @click="doGenerateKeywords"
      >
        <span v-if="state.generating" class="spinner"></span>
        {{ state.generating ? '生成中' : '生成关键词' }}
      </button>
    </div>

    <!-- 第二行：关键词标签 -->
    <div class="tags" v-if="state.keywords.length">
      <span v-for="kw in state.keywords" :key="kw" class="tag">
        {{ kw }}
        <button class="tag-close" @click="removeKeyword(kw)" aria-label="删除">×</button>
      </span>
    </div>

    <!-- 第三行：新关键词 + 添加 + 开始检索 -->
    <div class="row-add">
      <input
        v-model="state.newKeyword"
        class="input"
        type="text"
        maxlength="40"
        placeholder="新的关键词"
        @keyup.enter="addKeyword"
      />
      <button class="btn btn-secondary" @click="addKeyword">添加</button>
      <button class="btn btn-primary" :disabled="state.searching" @click="doSearch">
        <span v-if="state.searching" class="spinner"></span>
        {{ state.searching ? '检索中' : '开始检索文献' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.row-desc {
  margin-top: 16px;
  position: relative;
}
.desc-meta {
  position: absolute;
  right: 12px;
  bottom: 8px;
  font-size: 11px;
  color: var(--gray-400);
  pointer-events: none;
}
.row-desc .textarea {
  padding-bottom: 26px;
}
.row-desc .btn {
  margin-top: 10px;
  width: 100%;
}
.tags {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
}
.tag-close {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  line-height: 1;
  padding: 0 2px;
}
.tag-close:hover {
  color: #fff;
}
.row-add {
  margin-top: 16px;
  display: flex;
  gap: 10px;
}
.row-add .input {
  flex: 1;
  min-width: 0;
}
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.btn-secondary .spinner {
  border-color: rgba(37, 99, 235, 0.3);
  border-top-color: var(--brand-500);
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 560px) {
  .row-add {
    flex-wrap: wrap;
  }
  .row-add .input {
    flex: 1 1 100%;
  }
  .row-add .btn {
    flex: 1;
  }
}
</style>
