export interface Literature {
  pmid: string
  titleEn: string
  titleZh: string
  authors: string[]
  authorCount: number
  pubDate: string
  abstractZh: string
}

export interface SummarySection {
  keyFindings: string[]
  trends: string[]
  clinicalSignificance: string[]
}

export interface Summary extends Literature {
  keyFindings: string[]
  trends: string[]
  clinicalSignificance: string[]
}
