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
