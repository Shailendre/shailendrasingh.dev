'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { WhiteboardIdeaMeta } from '@/lib/types'

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

export default function HuddleRoom({ ideas }: Props) {
  return (
    <section id="huddle" className="py-24 px-6 bg-slate-50 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Open Ideas
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            The Whiteboard
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
            Startup concepts &amp; architecture drafts — blueprints, open-source ideas, and B2B SaaS theories
            I&apos;m actively whiteboarding. Click any card to dive in, leave a comment, or upvote.
          </p>
        </motion.div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {ideas.map((idea, i) => (
            <motion.div
              key={idea.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <Link
                href={`/whiteboard/${idea.slug}`}
                className="group flex flex-col h-full p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111111] hover:shadow-lg dark:hover:shadow-black/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {idea.rfc}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      {idea.sector}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${statusBadge[idea.statusColor]}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusDot[idea.statusColor]}`} />
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
                <div className="flex items-center gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  Open whiteboard
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
