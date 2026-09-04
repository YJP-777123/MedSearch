<script setup lang="ts">
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <div class="logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M12 2.5v19M12 2.5c-2.2 0-3.5 1.6-3.5 3.5v3c0 1.9 1.3 3.5 3.5 3.5s3.5-1.6 3.5-3.5V6c0-1.9-1.3-3.5-3.5-3.5z"
            stroke="#fff"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="titles">
        <h1 class="brand">MedSearch</h1>
        <p class="slogan">PubMed医学文献AI查询系统</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 55%, #3b82f6 100%);
  color: #fff;
}
.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.brand {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.2;
}
.slogan {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.3;
}
</style>
