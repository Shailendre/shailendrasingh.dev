import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { PostMeta, ProjectMeta } from './types'

export type { PostMeta, ProjectMeta }

const contentDir = path.join(process.cwd(), 'content')

function normalizeDate(d: unknown): string {
  if (d instanceof Date) return d.toISOString().split('T')[0]
  return String(d ?? '')
}

function readDir<T>(
  subdir: string,
  transform: (slug: string, data: Record<string, unknown>) => T,
): T[] {
  const dir = path.join(contentDir, subdir)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const { data } = matter(raw)
      return transform(slug, data as Record<string, unknown>)
    })
}

export function getAllPosts(): PostMeta[] {
  return readDir<PostMeta>('blog', (slug, d) => ({
    slug,
    title: String(d.title ?? ''),
    date: normalizeDate(d.date),
    excerpt: String(d.excerpt ?? ''),
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    readTime: String(d.readTime ?? '5 min read'),
    category: (d.category as PostMeta['category']) ?? 'technical',
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllProjects(): ProjectMeta[] {
  return readDir<ProjectMeta>('projects', (slug, d) => ({
    slug,
    title: String(d.title ?? ''),
    date: normalizeDate(d.date),
    excerpt: String(d.excerpt ?? ''),
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    stack: Array.isArray(d.stack) ? (d.stack as string[]) : [],
    status: String(d.status ?? 'Active'),
    statusColor: (d.statusColor as ProjectMeta['statusColor']) ?? 'green',
    github: d.github ? String(d.github) : undefined,
    demo: d.demo ? String(d.demo) : undefined,
  }))
}
