'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Link2, Check } from 'lucide-react'
import type { WhiteboardIdeaMeta } from '@/lib/types'

type FilterOption = 'All' | 'In Progress' | 'Playground' | 'Done' | 'Idea'

const FILTERS: FilterOption[] = ['All', 'In Progress', 'Playground', 'Done', 'Idea']

const filterDot: Record<FilterOption, string> = {
  All: 'bg-slate-400 dark:bg-slate-500',
  'In Progress': 'bg-sky-500',
  Playground: 'bg-violet-500',
  Done: 'bg-emerald-500',
  Idea: 'bg-amber-500',
}

const statusBadge: Record<string, string> = {
  amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
  green: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
  blue: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400',
  violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400',
}

const statusDot: Record<string, string> = {
  amber: 'bg-amber-500',
  green: 'bg-emerald-500',
  blue: 'bg-sky-500',
  violet: 'bg-violet-500',
}

interface Props {
  ideas: WhiteboardIdeaMeta[]
}

export default function ProjectsBoard({ ideas }: Props) {
  const [active, setActive] = useState<FilterOption>('All')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  function copyLink(e: React.MouseEvent, slug: string) {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}/whiteboard/${slug}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    })
  }

  const filtered = active === 'All' ? ideas : ideas.filter((i) => i.status === active)

  const countFor = (f: FilterOption) =>
    f === 'All' ? ideas.length : ideas.filter((i) => i.status === f).length

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Builds &amp; Ideas
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Projects
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
            Everything I'm shipping, building, experimenting with, or whiteboarding — from shipped products to early-stage concepts.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTERS.map((f) => {
            const isActive = active === f
            const count = countFor(f)
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111111] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isActive ? (f === 'All' ? 'bg-white dark:bg-slate-900' : filterDot[f]) : filterDot[f]
                  }`}
                />
                {f}
                <span
                  className={`font-mono text-xs rounded px-1 ${
                    isActive
                      ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                      : 'text-slate-400 dark:text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((idea) => (
              <motion.div
                key={idea.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -4, transition: { duration: 0.18, ease: 'easeOut' } }}
              >
                <Link
                  href={`/whiteboard/${idea.slug}`}
                  className="group flex flex-col h-full p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111111] hover:shadow-lg dark:hover:shadow-black/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {idea.rfc && (
                        <>
                          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">
                            {idea.rfc}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                        </>
                      )}
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono truncate">
                        {idea.sector}
                      </span>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${statusBadge[idea.statusColor]}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${idea.status !== 'Done' ? 'animate-pulse' : ''} ${statusDot[idea.statusColor]}`} />
                      {idea.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    {idea.title}
                  </h3>

                  {/* Brief */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {idea.brief}
                  </p>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {idea.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-mono rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#1a1a1a]"
                      >
                        {tech}
                      </span>
                    ))}
                    {idea.stack.length > 5 && (
                      <span className="px-2 py-0.5 text-xs font-mono rounded-md border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-[#1a1a1a]">
                        +{idea.stack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      Open board
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <button
                      onClick={(e) => copyLink(e, idea.slug)}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors px-1.5 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label="Copy link"
                    >
                      {copiedSlug === idea.slug
                        ? <><Check size={12} className="text-emerald-500" /><span className="text-emerald-500">Copied</span></>
                        : <><Link2 size={12} /><span>Copy link</span></>
                      }
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111111]"
          >
            <p className="font-mono text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              Nothing here yet
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
