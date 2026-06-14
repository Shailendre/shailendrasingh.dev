import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { PostMeta, ProjectMeta, WhiteboardIdeaMeta } from './types'

export type { PostMeta, ProjectMeta, WhiteboardIdeaMeta }

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

export function getAllWhiteboardIdeas(): WhiteboardIdeaMeta[] {
  return readDir<WhiteboardIdeaMeta>('whiteboard', (slug, d) => ({
    slug,
    rfc: String(d.rfc ?? ''),
    title: String(d.title ?? ''),
    brief: String(d.brief ?? ''),
    description: String(d.description ?? ''),
    what: Array.isArray(d.what) ? (d.what as string[]) : [],
    why: Array.isArray(d.why) ? (d.why as string[]) : [],
    how: Array.isArray(d.how) ? (d.how as string[]) : [],
    sector: String(d.sector ?? ''),
    date: normalizeDate(d.date),
    status: String(d.status ?? 'Whiteboarding'),
    statusColor: (d.statusColor as WhiteboardIdeaMeta['statusColor']) ?? 'amber',
    stack: Array.isArray(d.stack) ? (d.stack as string[]) : [],
    github: d.github ? String(d.github) : undefined,
    images: Array.isArray(d.images) ? (d.images as string[]) : [],
    videos: Array.isArray(d.videos) ? (d.videos as string[]) : [],
  })).sort((a, b) => a.rfc.localeCompare(b.rfc))
}

export function getWhiteboardIdea(slug: string): WhiteboardIdeaMeta | null {
  return getAllWhiteboardIdeas().find((i) => i.slug === slug) ?? null
}
