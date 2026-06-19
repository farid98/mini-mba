import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ChapterFrontmatter, Chapter } from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getAllChapters(subject: string): ChapterFrontmatter[] {
  const dir = path.join(CONTENT_DIR, subject)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data } = matter(raw)
      return data as ChapterFrontmatter
    })
    .sort((a, b) => a.order - b.order)
}

export function getChapter(subject: string, slug: string): Chapter | null {
  const dir = path.join(CONTENT_DIR, subject)
  if (!fs.existsSync(dir)) return null

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    if (data.slug === slug) {
      return { ...(data as ChapterFrontmatter), content }
    }
  }
  return null
}

export function getAllSubjectSlugs(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter(f =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  )
}

export function resolveChapter(ref: string): ChapterFrontmatter | null {
  const [subject, slug] = ref.split('/')
  if (!subject || !slug) return null
  const chapters = getAllChapters(subject)
  return chapters.find(ch => ch.slug === slug) ?? null
}
