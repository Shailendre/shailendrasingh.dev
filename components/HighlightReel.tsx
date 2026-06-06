'use client'

import { motion } from 'framer-motion'
import { Server, Zap, Bot, Trophy } from 'lucide-react'

const cards = [
  {
    icon: Server,
    label: 'Scale & Uptime',
    metric: '8B+',
    metricSub: 'requests / month',
    body: 'Distributed data services processing 8B+ monthly requests with >99.999% uptime across production environments.',
    accent: 'emerald' as const,
  },
  {
    icon: Zap,
    label: 'Throughput Optimization',
    metric: '+185%',
    metricSub: 'processing capacity',
    body: 'Boosted processing capacity by migrating payload serialization to Protobuf — delivering dramatic throughput gains at scale.',
    accent: 'orange' as const,
  },
  {
    icon: Bot,
    label: 'Agentic AI',
    metric: '80%',
    metricSub: 'productivity boost',
    body: 'Built LangGraph ReAct architectures and Claude-powered automation agents, boosting end-user productivity by 80%.',
    accent: 'violet' as const,
  },
  {
    icon: Trophy,
    label: 'Hackathon Wins',
    metric: '2×',
    metricSub: 'finalist / winner',
    body: 'Top 10 Finalist — Generative AI Hackathon. Runner-Up — EMEA IoT Hackathon. Built under 48-hour crunch conditions.',
    accent: 'amber' as const,
  },
]

const accents = {
  emerald: {
    badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50',
    metric: 'text-emerald-600 dark:text-emerald-400',
  },
  orange: {
    badge: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/50',
    metric: 'text-orange-600 dark:text-orange-400',
  },
  violet: {
    badge: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900/50',
    metric: 'text-violet-600 dark:text-violet-400',
  },
  amber: {
    badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50',
    metric: 'text-amber-600 dark:text-amber-400',
  },
}

export default function HighlightReel() {
  return (
    <section id="work" className="py-24 px-6 bg-slate-50 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Impact Metrics
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            The Highlight Reel
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon
            const a = accents[card.accent]
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
                className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] hover:shadow-xl dark:hover:shadow-black/40 transition-shadow cursor-default"
              >
                <div className={`inline-flex p-2 rounded-lg border ${a.badge} mb-5`}>
                  <Icon size={17} />
                </div>

                <div className={`font-mono text-3xl font-bold tabular-nums ${a.metric} mb-0.5`}>
                  {card.metric}
                </div>
                <div className="font-mono text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4">
                  {card.metricSub}
                </div>

                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  {card.label}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
