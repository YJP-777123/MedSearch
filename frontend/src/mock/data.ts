import type { Summary } from '../types'

/**
 * Mock 数据：模拟 PubMed 检索返回的文献列表。
 * 开发阶段用模拟数据联调界面，后端接入后替换为真实 API 调用。
 */

export const mockSummaries: Summary[] = [
  {
    pmid: '32908398',
    titleEn: 'EGFR Mutation and Prognosis in Patients with Lung Adenocarcinoma: A Real-World Study',
    titleZh: '肺腺癌患者EGFR突变与预后的相关性研究',
    authors: ['张伟', '李明', '王芳'],
    authorCount: 8,
    pubDate: '2023-01-15',
    abstractZh:
      '本研究纳入586例肺腺癌患者，系统分析EGFR突变状态与总生存期的相关性，发现突变型患者接受靶向治疗后中位生存期显著延长。',
    keyFindings: [
      'EGFR突变在肺腺癌患者中发生率为15-30%',
      '19号外显子缺失患者预后较好',
      'EGFR突变阳性患者中位总生存期显著优于野生型'
    ],
    trends: [
      '靶向治疗药物研发持续升温',
      '联合治疗策略成为研究热点',
      '真实世界研究证据不断累积'
    ],
    clinicalSignificance: [
      '建议对所有肺腺癌患者进行EGFR检测',
      '根据突变类型选择个体化治疗方案',
      '检测结果应纳入多学科诊疗决策'
    ]
  },
  {
    pmid: '33209543',
    titleEn: 'Application of EGFR Tyrosine Kinase Inhibitors in Lung Adenocarcinoma Targeted Therapy',
    titleZh: 'EGFR突变在肺腺癌靶向治疗中的应用',
    authors: ['刘洋', '陈静', '赵磊'],
    authorCount: 6,
    pubDate: '2023-03-22',
    abstractZh:
      '综述EGFR酪氨酸激酶抑制剂在肺腺癌靶向治疗中的应用进展，比较不同代际药物的疗效、耐药特征与不良反应谱。',
    keyFindings: [
      '第三代EGFR-TKI已成为一线标准治疗',
      'T790M突变是常见耐药机制',
      '脑转移控制率显著优于化疗'
    ],
    trends: [
      '第四代药物与双特异性抗体进入临床',
      '联合抗血管生成治疗探索中',
      '耐药后序贯治疗策略优化'
    ],
    clinicalSignificance: [
      '优先进行基因检测以指导用药',
      '耐药后应再次活检明确机制',
      '关注脑转移患者药物选择'
    ]
  },
  {
    pmid: '33511287',
    titleEn: 'Comparison of Different Detection Methods for EGFR Mutation in Lung Adenocarcinoma',
    titleZh: '肺腺癌EGFR突变检测方法比较研究',
    authors: ['孙倩', '周欣', '吴昊'],
    authorCount: 7,
    pubDate: '2022-11-08',
    abstractZh:
      '比较ARMS-PCR、NGS与ddPCR等方法在肺腺癌EGFR突变检测中的灵敏度、特异性与周转时间，为临床选择提供依据。',
    keyFindings: [
      'NGS可检测罕见突变位点',
      'ddPCR适用于低丰度突变样本',
      'ARMS-PCR成本低、周转快'
    ],
    trends: [
      '液体活检替代组织活检趋势明显',
      '多重检测平台整合加速',
      '标准化质控体系逐步建立'
    ],
    clinicalSignificance: [
      '根据样本类型选择合适的检测方法',
      '组织不足时优先考虑液体活检',
      '检测结果需结合临床综合解读'
    ]
  },
  {
    pmid: '33890112',
    titleEn: 'Exon 19 Deletion versus L858R Mutation: Differential Prognosis in Lung Adenocarcinoma',
    titleZh: '19号外显子缺失与L858R突变肺腺癌患者预后的差异',
    authors: ['徐杰', '高峰', '林悦'],
    authorCount: 9,
    pubDate: '2023-05-30',
    abstractZh:
      '对比19外显子缺失与L858R点突变两种主要EGFR激活突变的临床特征与预后差异，提示两种亚型的治疗反应存在不同。',
    keyFindings: [
      '19外显子缺失对TKI应答更优',
      'L858R突变常合并其他驱动基因异常',
      '两亚型耐药谱存在差异'
    ],
    trends: [
      '亚型特异性治疗策略受关注',
      '基于突变亚型的联合方案探索',
      '预后预测模型更加精细化'
    ],
    clinicalSignificance: [
      '区分突变亚型有助于预后评估',
      'L858R患者可考虑更强联合方案',
      '随访策略应依据亚型个体化'
    ]
  },
  {
    pmid: '34123456',
    titleEn: 'Resistance Mechanisms to EGFR-TKIs in Advanced Lung Adenocarcinoma',
    titleZh: '晚期肺腺癌EGFR-TKI耐药机制研究进展',
    authors: ['何平', '马超', '邓丽'],
    authorCount: 5,
    pubDate: '2023-07-18',
    abstractZh:
      '系统梳理EGFR-TKI耐药的分子机制，包括靶内突变、旁路激活与组织学转化，并总结耐药后的治疗应对策略。',
    keyFindings: [
      'T790M突变约占获得性耐药50%',
      'MET扩增是重要旁路耐药机制',
      '小细胞转化发生率约5%'
    ],
    trends: [
      '动态ctDNA监测耐药演变',
      '双靶点联合克服耐药',
      '抗体偶联药物带来新选择'
    ],
    clinicalSignificance: [
      '耐药后应重新活检明确机制',
      '根据耐药类型选择后续治疗',
      '全程管理需动态监测'
    ]
  },
  {
    pmid: '34456789',
    titleEn: 'Combination Therapy Strategies Targeting EGFR in Lung Adenocarcinoma',
    titleZh: '肺腺癌EGFR联合治疗策略研究',
    authors: ['唐波', '曹宇', '冯伟'],
    authorCount: 10,
    pubDate: '2023-09-02',
    abstractZh:
      '评估EGFR-TKI联合化疗、抗血管生成或免疫治疗在肺腺癌中的疗效与安全性，探索延缓耐药与延长生存的策略。',
    keyFindings: [
      'TKI联合化疗可延长无进展生存',
      '联合抗血管生成改善部分人群预后',
      '免疫联合需警惕毒性叠加'
    ],
    trends: [
      '三联方案进入III期临床',
      '基于生物标志物的精准联合',
      '去化疗联合策略探索'
    ],
    clinicalSignificance: [
      '高肿瘤负荷者可考虑联合化疗',
      '联合治疗需个体化评估毒性',
      '探索性联合应在临床试验中进行'
    ]
  },
  {
    pmid: '34789123',
    titleEn: 'Circulating Tumor DNA for Monitoring EGFR Mutation in Lung Adenocarcinoma',
    titleZh: '循环肿瘤DNA监测肺腺癌EGFR突变的应用',
    authors: ['郭翔', '胡静', '蒋涛'],
    authorCount: 7,
    pubDate: '2022-08-15',
    abstractZh:
      '评估循环肿瘤DNA在肺腺癌EGFR突变动态监测中的价值，探讨其在疗效评估与耐药预警中的临床应用前景。',
    keyFindings: [
      'ctDNA与组织检测一致性较高',
      '动态监测可提前发现耐药',
      'ctDNA清除与更好预后相关'
    ],
    trends: [
      '基于ctDNA的微小残留病灶监测',
      '连续监测指导治疗调整',
      '标准化检测流程逐步成熟'
    ],
    clinicalSignificance: [
      '无法活检时可用ctDNA替代',
      '治疗期间定期监测ctDNA',
      'ctDNA变化指导治疗决策'
    ]
  },
  {
    pmid: '35012345',
    titleEn: 'EGFR Mutation Status and Clinical Characteristics in Young-Onset Lung Adenocarcinoma',
    titleZh: '年轻肺腺癌患者EGFR突变状态与临床特征分析',
    authors: ['沈磊', '田敏', '谢楠'],
    authorCount: 6,
    pubDate: '2023-04-10',
    abstractZh:
      '分析年轻发病肺腺癌患者的EGFR突变谱与临床病理特征，发现年轻患者突变率高且以不吸烟者为主。',
    keyFindings: [
      '年轻患者EGFR突变率较高',
      '不吸烟女性比例显著偏高',
      '年轻患者预后相对较好'
    ],
    trends: [
      '年轻患者亚组研究增多',
      '遗传易感基因筛查受关注',
      '长期随访与生育保护议题'
    ],
    clinicalSignificance: [
      '年轻患者应常规进行基因检测',
      '关注年轻患者的遗传咨询需求',
      '制定兼顾生育保护的治疗方案'
    ]
  },
  {
    pmid: '35345678',
    titleEn: 'Cost-Effectiveness of EGFR Testing in Lung Adenocarcinoma: A Systematic Review',
    titleZh: '肺腺癌EGFR检测的成本效益系统评价',
    authors: ['陆斌', '潘琪', '闫瑞'],
    authorCount: 4,
    pubDate: '2023-06-25',
    abstractZh:
      '系统评价EGFR检测在肺腺癌中的成本效益，多数研究显示基于检测的靶向治疗具有良好经济性。',
    keyFindings: [
      '基于EGFR检测的靶向治疗成本效益良好',
      '一线检测策略更具经济性',
      '中低收入地区检测可及性待提升'
    ],
    trends: [
      '卫生经济学评价方法规范化',
      '检测价格下降提升可及性',
      '纳入医保提高检测覆盖率'
    ],
    clinicalSignificance: [
      '推动EGFR检测纳入常规路径',
      '支持检测费用医保覆盖',
      '促进靶向治疗资源合理配置'
    ]
  }
]

/** 模拟：根据描述生成 3 个中文关键词 */
export function generateKeywords(description: string): string[] {
  const map: Record<string, string[]> = {
    肺腺癌: ['肺腺癌', 'EGFR突变', '预后'],
    肺癌: ['肺癌', '靶向治疗', '基因突变'],
    乳腺癌: ['乳腺癌', '内分泌治疗', '预后'],
    糖尿病: ['糖尿病', '血糖控制', '并发症'],
    高血压: ['高血压', '降压治疗', '心血管风险'],
    冠心病: ['冠心病', '介入治疗', '预后']
  }
  const hit = Object.keys(map).find((k) => description.includes(k))
  if (hit) return map[hit]
  // 默认兜底
  return ['肺腺癌', 'EGFR突变', '预后']
}

/** 模拟：根据关键词返回检索结果（默认返回全部 mock 数据） */
export function searchLiterature(keywords: string[]): Summary[] {
  return mockSummaries
}
