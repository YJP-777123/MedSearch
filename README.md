# MedSearch - PubMed 医学文献 AI 查询系统

> 给医学文献查询装上 AI 大脑

## 项目简介

为医生和医学生提供 H5 AI 助手应用，用于查询疾病相关的 PubMed 文献资料并生成 AI 总结。

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | Vue3 + Vite + TypeScript |
| 后端 | Flask (Python) |
| AI 服务 | 华为云 MaaS 平台 |
| 文献检索 | PubMed E-utilities API |

## 项目状态

- [x] **SDD 规格说明**（当前阶段，待审阅）
- [ ] 前端开发（Vue3 + Vite + TypeScript）
- [ ] 后端开发（Flask）
- [ ] AI 服务集成（华为云 MaaS）
- [ ] 文献检索集成（PubMed E-utilities）

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

## 审阅流程

1. 逐项审阅 `spec/` 下的规格文档。
2. 如有需要修改的地方，直接在文档中指出或告知我修改。
3. 确认无误后，回复「开始开发」，我将按 `07-tasks.md` 的拆解执行开发。
