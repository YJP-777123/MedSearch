# 04 · 技术架构

## 4.1 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| 前端 | Vue3 + Vite + TypeScript | H5 单页应用 |
| 后端 | Flask (Python) | RESTful API |
| AI 服务 | 华为云 MaaS 平台 | 关键词生成、翻译、摘要、总结 |
| 文献检索 | PubMed E-utilities API | esearch / efetch |

## 4.2 系统架构

```
┌─────────────────────────────────────────────────────┐
│                    前端（H5）                         │
│   Vue3 + Vite + TS                                   │
│   Header / Search / Literature / Summary 组件        │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP (RESTful JSON)
┌──────────────────────▼──────────────────────────────┐
│                   后端（Flask）                       │
│  ┌──────────────┬──────────────┬──────────────────┐  │
│  │ keyword 服务  │ pubmed 服务   │ summary 服务      │  │
│  └──────┬───────┴──────┬───────┴────────┬─────────┘  │
└─────────┼──────────────┼────────────────┼────────────┘
          │              │                │
   ┌──────▼──────┐  ┌────▼─────┐   ┌──────▼────────┐
   │  华为云 MaaS │  │ PubMed    │   │  华为云 MaaS   │
   │ (关键词/翻译) │  │ E-utilities│   │  (总结/摘要)  │
   └─────────────┘  └──────────┘   └───────────────┘
```

## 4.3 目录结构（规划）

```
MedSearch/
├── README.md
├── spec/                        # 本规格文档目录
│   ├── 01-overview.md
│   ├── 02-requirements.md
│   ├── 03-flows.md
│   ├── 04-architecture.md
│   ├── 05-api.md
│   ├── 06-design.md
│   └── 07-tasks.md
├── frontend/                    # 前端工程
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── src/
│       ├── main.ts
│       ├── App.vue
│       ├── api/                 # 后端接口封装
│       │   └── index.ts
│       ├── types/               # TypeScript 类型
│       │   └── index.ts
│       ├── components/
│       │   ├── HeaderSection.vue
│       │   ├── SearchSection.vue
│       │   ├── LiteratureSection.vue
│       │   └── SummarySection.vue
│       ├── stores/              # 状态管理（pinia，可选）
│       └── styles/
└── backend/                     # 后端工程
    ├── app.py                   # Flask 入口
    ├── config.py                # 配置（MaaS 密钥、PubMed 参数）
    ├── requirements.txt
    └── services/
        ├── keyword_service.py   # 关键词生成/翻译
        ├── pubmed_service.py    # PubMed 检索
        └── summary_service.py   # 摘要/总结
```

## 4.4 配置项（config）

| 配置 | 说明 | 示例 |
|------|------|------|
| `MAAS_ENDPOINT` | 华为云 MaaS 接口地址 | `https://...` |
| `MAAS_API_KEY` | MaaS 访问密钥 | 环境变量注入，不硬编码 |
| `MAAS_MODEL` | 使用的模型名称 | 按 MaaS 平台提供 |
| `PUBMED_BASE_URL` | E-utilities 基础地址 | `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/` |
| `PUBMED_PAGE_SIZE` | 每页文献数 | `9` |
| `PUBMED_RATE_LIMIT` | 每秒请求上限 | `3` |

## 4.5 关键决策记录（ADR）

| 决策 | 选择 | 理由 |
|------|------|------|
| 前端框架 | Vue3 + Vite + TS | 需求指定，生态成熟，TS 类型安全 |
| 后端框架 | Flask | 需求指定，轻量、与 AI 服务对接简单 |
| 翻译方式 | 后端调用 MaaS | 统一处理，前端只消费结果 |
| 分页策略 | 待确认（页码分页 vs 更多文献累加） | 见 02 板块三待确认项 |
| 状态管理 | pinia（可选） | 组件间共享勾选/关键词状态 |

## 4.6 安全与合规

- MaaS 密钥仅存于后端环境变量，不暴露给前端。
- 前端不直接调用 PubMed/MaaS（避免 CORS 与密钥泄露）。
- 医疗内容 AI 生成结果仅供科研参考，界面需提示「AI 生成内容仅供参考」。
