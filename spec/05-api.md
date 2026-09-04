# 05 · 接口与数据模型

## 5.1 后端 API 契约

统一约定：请求/响应均为 JSON；响应结构 `{ code, message, data }`，`code=0` 表示成功。

### 5.1.1 生成关键词

```
POST /api/keywords/generate
请求：{ "description": "肺腺癌的EGFR突变与预后相关性" }
响应：{ "code": 0, "message": "ok", "data": { "keywords": ["肺腺癌", "EGFR突变", "预后"] } }
```

### 5.1.2 检索文献

```
POST /api/literature/search
请求：{ "keywords": ["肺腺癌", "EGFR突变"], "page": 1 }
响应：
{
  "code": 0, "message": "ok",
  "data": {
    "totalCount": 156,
    "page": 1,
    "pageSize": 9,
    "totalPages": 18,
    "literatures": [
      {
        "pmid": "12345",
        "titleEn": "EGFR Mutation and Prognosis in Lung Adenocarcinoma",
        "titleZh": "肺腺癌患者EGFR突变与预后的相关性研究",
        "authors": ["Zhang San", "Li Si", "Wang Wu"],
        "authorCount": 8,
        "pubDate": "2023-01-15",
        "abstractZh": "该研究分析了肺腺癌患者中EGFR突变与预后的关系……（≤100字）"
      }
    ]
  }
}
```

### 5.1.3 生成 AI 总结

```
POST /api/summary/generate
请求：{ "pmids": ["12345", "67890"] }
响应：
{
  "code": 0, "message": "ok",
  "data": {
    "summaries": [
      {
        "pmid": "12345",
        "titleZh": "肺腺癌患者EGFR突变与预后的相关性研究",
        "titleEn": "EGFR Mutation and Prognosis in Lung Adenocarcinoma",
        "authors": ["张三", "李四", "王五"],
        "pubDate": "2023-01-15",
        "keyFindings": ["EGFR突变在肺腺癌患者中发生率为15-30%", "19号外显子缺失患者预后较好"],
        "trends": ["靶向治疗药物研发持续升温", "联合治疗策略成为研究热点"],
        "clinicalSignificance": ["建议对所有肺腺癌患者进行EGFR检测", "根据突变类型选择个体化治疗方案"]
      }
    ]
  }
}
```

## 5.2 数据模型

### 5.2.1 Keyword

| 字段 | 类型 | 说明 |
|------|------|------|
| keywords | string[] | 中文关键词列表，1-5 个 |

### 5.2.2 Literature

| 字段 | 类型 | 说明 |
|------|------|------|
| pmid | string | 文献唯一标识 |
| titleEn | string | 英文标题 |
| titleZh | string | 中文标题（AI 翻译） |
| authors | string[] | 作者列表（前 3 位） |
| authorCount | number | 作者总数 |
| pubDate | string | 发布日期（YYYY-MM-DD） |
| abstractZh | string | 中文摘要（AI 精炼 ≤100 字） |

### 5.2.3 Summary

| 字段 | 类型 | 说明 |
|------|------|------|
| pmid | string | 文献唯一标识 |
| titleZh | string | 中文标题 |
| titleEn | string | 英文标题 |
| authors | string[] | 作者（前 3 位，超出显示"..."） |
| pubDate | string | 发布日期 |
| keyFindings | string[] | 关键发现要点 |
| trends | string[] | 研究趋势要点 |
| clinicalSignificance | string[] | 临床意义要点 |

## 5.3 外部服务集成

### 5.3.1 PubMed E-utilities

| 接口 | 用途 | 说明 |
|------|------|------|
| `esearch.fcgi` | 检索 PMID | 参数 `db=pubmed`、`term=<检索式>`、`retmax`、`retmode=json`，返回 PMID 列表与 `count`（总数） |
| `efetch.fcgi` | 获取详情 | 参数 `db=pubmed`、`id=<pmids>`、`rettype=abstract`、`retmode=xml/json`，返回标题/作者/摘要/日期 |

**检索式构建示例**：`"lung adenocarcinoma"[MeSH] AND "EGFR mutation"[All Fields] AND "prognosis"[All Fields]`

### 5.3.2 华为云 MaaS

| 用途 | 说明 |
|------|------|
| 关键词生成 | 输入疾病描述，输出 3 个中文关键词 |
| 中文翻译 | 关键词翻译为英文、标题翻译为中文 |
| 摘要精炼 | 英文摘要精炼为 ≤100 字中文摘要 |
| 结构化总结 | 输出关键发现/研究趋势/临床意义三部分 |

## 5.4 Prompt 设计（后端模板）

### 关键词生成 Prompt
```
你是医学文献检索专家。根据用户提供的疾病/研究方向描述，
提取 3 个最核心的中文医学关键词，直接以 JSON 数组返回：
{"keywords":["关键词1","关键词2","关键词3"]}
用户描述：{description}
```

### 关键词翻译 Prompt
```
请将以下中文医学关键词翻译为英文医学术语，直接以 JSON 数组返回：
{"keywords":["keyword1","keyword2"]}
关键词：{keywords}
```

### 标题翻译 Prompt
```
请将以下英文医学文献标题翻译为简洁准确的中文：
标题：{title}
```

### 摘要精炼 Prompt
```
请将以下英文医学摘要精炼为不超过 100 字的中文摘要，突出研究目的与结论：
摘要：{abstract}
```

### 结构化总结 Prompt
```
你是资深医学研究员。请基于以下文献，生成结构化总结，严格输出 JSON：
{
  "keyFindings": ["关键发现1", "关键发现2"],
  "trends": ["研究趋势1", "研究趋势2"],
  "clinicalSignificance": ["临床意义1", "临床意义2"]
}
每个数组 2-3 条。文献标题：{title}；摘要：{abstract}
```

## 5.5 错误码约定

| code | 含义 |
|------|------|
| 0 | 成功 |
| 400 | 参数错误（描述过短/无关键词/未勾选） |
| 502 | 上游服务失败（MaaS/PubMed） |
| 503 | 服务限流 |
| 500 | 服务器内部错误 |
