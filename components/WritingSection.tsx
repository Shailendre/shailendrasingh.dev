'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Calendar, ArrowRight, FileText } from 'lucide-react'
import type { PostMeta } from '@/lib/types'

type Tab = 'technical' | 'personal'

interface Props {
  technicalPosts: PostMeta[]
  personalPosts: PostMeta[]
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
      <FileText size={28} className="text-slate-300 dark:text-slate-700 mb-3" />
      <p className="text-sm text-slate-400 dark:text-slate-600 font-mono">
        No {tab} posts yet — drafts incoming.
      </p>
    </div>
  )
}

export default function WritingSection({ technicalPosts = [], personalPosts = [] }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('technical')

  const posts: Record<Tab, PostMeta[]> = {
    technical: technicalPosts,
    personal: personalPosts,
  }

  return (
    <section id="writing" className="py-24 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Writing
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Selected Writing
          </h2>
        </motion.div>

        {/* Tab toggle */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg bg-slate-100 dark:bg-[#111111] w-fit border border-slate-200 dark:border-slate-800">
          {(['technical', 'personal'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-white dark:bg-[#1e1e1e] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
              <span className="ml-1.5 font-mono text-[10px] opacity-60">
                {posts[tab].length}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {posts[activeTab].length === 0 ? (
              <EmptyState tab={activeTab} />
            ) : (
              <div className="space-y-4">
                {posts[activeTab].map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111111] hover:shadow-md dark:hover:shadow-black/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 dark:text-slate-500">
                        <Calendar size={11} />
                        {formatDate(post.date)}
                      </span>
                      <span className="text-slate-200 dark:text-slate-800">·</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 dark:text-slate-500">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono rounded-md border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-[#1a1a1a]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3">
                        Read more <ArrowRight size={11} />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
