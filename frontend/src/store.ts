import { reactive, computed } from 'vue'
import { generateKeywords, mockSummaries } from './mock/data'
import type { Summary } from './types'

interface ToastState {
  show: boolean
  message: string
  type: 'info' | 'error'
}

const state = reactive({
  description: '',
  newKeyword: '',
  keywords: [] as string[],
  allLiteratures: [] as Summary[],
  totalCount: 0,
  page: 1,
  pageSize: 9,
  selectedPmids: [] as string[],
  summaries: [] as Summary[],
  hasSearched: false,
  generating: false,
  searching: false,
  summarizing: false,
  toast: { show: false, message: '', type: 'info' } as ToastState
})

let toastTimer: ReturnType<typeof setTimeout> | null = null

function showToast(message: string, type: 'info' | 'error' = 'info') {
  state.toast = { show: true, message, type }
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    state.toast.show = false
  }, 2400)
}

/** 生成 3 个中文关键词（模拟 AI，含延迟） */
function doGenerateKeywords() {
  const desc = state.description.trim()
  if (desc.length < 10) {
    showToast('请至少输入 10 字描述', 'error')
    return
  }
  state.generating = true
  setTimeout(() => {
    const keys = generateKeywords(desc)
    // 去重合并，最多 5 个
    const merged = Array.from(new Set([...state.keywords, ...keys])).slice(0, 5)
    state.keywords = merged
    state.generating = false
    showToast('已生成核心关键词')
  }, 900)
}

function addKeyword() {
  const kw = state.newKeyword.trim()
  if (!kw) {
    showToast('请输入关键词', 'error')
    return
  }
  if (state.keywords.includes(kw)) {
    showToast('关键词已存在', 'error')
    return
  }
  if (state.keywords.length >= 5) {
    showToast('最多 5 个关键词', 'error')
    return
  }
  state.keywords.push(kw)
  state.newKeyword = ''
}

function removeKeyword(kw: string) {
  state.keywords = state.keywords.filter((k) => k !== kw)
}

/** 模拟检索：将 9 篇 mock 文献扩展到 156 条，实现分页 */
function doSearch() {
  if (state.keywords.length === 0) {
    showToast('请先生成或添加关键词', 'error')
    return
  }
  state.searching = true
  state.summaries = []
  state.selectedPmids = []
  state.page = 1

  setTimeout(() => {
    const total = 156
    const list: Summary[] = []
    for (let i = 0; i < total; i++) {
      const base = mockSummaries[i % mockSummaries.length]
      const idx = i + 1
      list.push({
        ...base,
        pmid: `${base.pmid}${idx < 10 ? '0' : ''}${idx}`,
        titleZh: idx <= mockSummaries.length ? base.titleZh : `${base.titleZh}（相关研究 ${Math.ceil(idx / mockSummaries.length)}）`
      })
    }
    state.allLiteratures = list
    state.totalCount = total
    state.hasSearched = true
    state.searching = false
    showToast(`检索到 ${total} 条文献`)
  }, 1100)
}

function loadMore() {
  if (currentPage.value < totalPages.value) {
    state.page += 1
  }
}

function toggleSelect(pmid: string) {
  const idx = state.selectedPmids.indexOf(pmid)
  if (idx >= 0) {
    state.selectedPmids.splice(idx, 1)
  } else {
    state.selectedPmids.push(pmid)
  }
}

function doSummarize() {
  if (state.selectedPmids.length === 0) {
    showToast('请先勾选文献', 'error')
    return
  }
  state.summarizing = true
  setTimeout(() => {
    const picked = state.allLiteratures.filter((l) => state.selectedPmids.includes(l.pmid))
    state.summaries = picked.map((p) => ({
      ...p,
      keyFindings: p.keyFindings,
      trends: p.trends,
      clinicalSignificance: p.clinicalSignificance
    }))
    state.summarizing = false
    // 滚动到总结区
    requestAnimationFrame(() => {
      document.getElementById('summary-section')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, 1000)
}

const totalPages = computed(() => Math.ceil(state.totalCount / state.pageSize))
const currentPage = computed(() => state.page)
const currentPageLiteratures = computed(() => {
  const start = (state.page - 1) * state.pageSize
  return state.allLiteratures.slice(start, start + state.pageSize)
})

export function useStore() {
  return {
    state,
    totalPages,
    currentPage,
    currentPageLiteratures,
    doGenerateKeywords,
    addKeyword,
    removeKeyword,
    doSearch,
    loadMore,
    toggleSelect,
    doSummarize
  }
}
