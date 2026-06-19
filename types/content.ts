export interface ChapterFrontmatter {
  slug: string
  title: string
  subject: string
  order: number
  summary: string
  difficulty: 'foundational' | 'intermediate' | 'advanced'
  readTime: number
  prerequisites?: string[]
  related?: string[]
}

export interface Chapter extends ChapterFrontmatter {
  content: string
}

export interface Subject {
  slug: string
  title: string
  description: string
  color: string
  colorBg: string
  order: number
  chapters: ChapterFrontmatter[]
}
