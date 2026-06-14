export type PostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTime: string
  category: 'technical' | 'personal'
}

export type ProjectMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  stack: string[]
  status: string
  statusColor: 'green' | 'blue' | 'amber' | 'violet'
  github?: string
  demo?: string
}

export type WhiteboardIdeaMeta = {
  slug: string
  rfc: string
  title: string
  brief: string
  description: string
  what: string[]
  why: string[]
  how: string[]
  sector: string
  date: string
  status: string
  statusColor: 'green' | 'blue' | 'amber' | 'violet'
  stack: string[]
  github?: string
  images: string[]
  videos: string[]
}
