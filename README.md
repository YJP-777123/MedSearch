# MedSearch · PubMed 医学文献 AI 查询系统

> 给医学文献查询装上 AI 大脑

面向医生和医学生的 H5 AI 助手应用，用于查询疾病相关的 PubMed 文献资料并生成 AI 总结，让科研人员从「大海捞针」的困境中解放出来。

## 核心功能

- **智能关键词生成**：输入疾病/病理/研究方向描述，AI 自动提取 3 个核心中文关键词
- **精准文献检索**：关键词自动翻译为英文，构建 PubMed 检索策略，返回真实文献与总数
- **中文友好**：文献标题自动翻译为中文，摘要由 AI 精炼（≤100 字），降低语言与理解门槛
- **AI 总结报告**：为勾选文献生成「关键发现 / 研究趋势 / 临床意义」结构化总结

## 页面结构（四大板块）

| 板块 | 说明 |
|------|------|
| HeaderSection | 品牌顶栏 |
| SearchSection | 检索关键词：描述输入 → AI 生成关键词 → 增删标签 → 开始检索 |
| LiteratureSection | 文献列表：每页 9 篇、分页、跨页勾选、生成总结 |
| SummarySection | 文献详情卡片：标题/作者/PMID + 三维度总结 + 查看原文 |

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | Vue3 + Vite + TypeScript |
| 后端 | Flask (Python) |
| AI 服务 | 华为云 MaaS 平台 |
| 文献检索 | PubMed E-utilities API |

## 目录结构

```
MedSearch/
├── spec/                    # SDD 规格文档（7 篇）
├── frontend/                # 前端工程（Vue3 + Vite + TS）
│   ├── src/
│   │   ├── components/      # 四大板块组件
│   │   ├── mock/            # 联调模拟数据
│   │   ├── types/           # TypeScript 类型
│   │   ├── store.ts         # 响应式状态
│   │   └── styles/          # 全局样式
│   ├── index.html
│   └── vite.config.ts
└── README.md
```

## 快速开始

### 前端

```bash
cd frontend
npm install
npm run dev
```

启动后访问 http://localhost:5200 （开发服务器固定端口 5200）。

> 演示路径：输入 `肺腺癌的EGFR突变与预后相关性` → 生成关键词 → 开始检索文献 → 勾选文献 → 生成AI总结。

## 项目状态

- [x] SDD 规格说明
- [x] 前端开发（Vue3 + Vite + TS，mock 数据联调界面）
- [ ] 后端开发（Flask）
- [ ] AI 服务集成（华为云 MaaS）
- [ ] 文献检索集成（PubMed E-utilities）

> 当前前端使用 mock 数据联调界面，后端与真实 AI / PubMed 接口待接入。后端接入后，`src/mock/` 下的模拟逻辑将替换为 `src/api/` 真实调用。

## 规格文档索引

| 文档 | 内容 |
|------|------|
| [01 · 项目概述](spec/01-overview.md) | 背景痛点、目标用户、核心价值、成功指标、项目范围 |
| [02 · 功能需求与页面布局](spec/02-requirements.md) | 功能需求总览 + 四大板块详细设计 |
| [03 · 核心功能流程](spec/03-flows.md) | 三大流程、状态机、异常处理 |
| [04 · 技术架构](spec/04-architecture.md) | 技术栈、系统架构、目录结构、配置 |
| [05 · 接口与数据模型](spec/05-api.md) | API 契约、数据模型、PubMed/MaaS 集成、Prompt 设计 |
| [06 · 设计规范](spec/06-design.md) | UI/UX 设计规范、组件规范、去 AI 化要点 |
| [07 · 开发任务与验收](spec/07-tasks.md) | 开发任务拆解、里程碑、验收标准 |

## License

[MIT](LICENSE)
