'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] },
})

const stats = [
  { value: '8B+', label: 'Monthly Requests', sub: 'distributed data' },
  { value: '99.999%', label: 'Uptime SLA', sub: 'production systems' },
  { value: '+185%', label: 'Throughput Boost', sub: 'via Protobuf' },
  { value: '80%', label: 'Productivity Gain', sub: 'agentic AI workflows' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #94a3b820 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Availability pill */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open to select collaborations &amp; consulting
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.06] max-w-4xl"
        >
          Architecting{' '}
          <span className="relative">
            <span className="text-emerald-600 dark:text-emerald-400">high-performance</span>
          </span>{' '}
          distributed systems and AI-powered platforms.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.35)}
          className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
        >
          Senior Java Backend Engineer bridging the gap between scalable cloud infrastructure,
          side builds, and{' '}
          <span className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 px-1.5 py-0.5 rounded text-base">
            agentic AI
          </span>{' '}
          workflows.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 flex flex-col sm:flex-row items-start gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold text-sm hover:bg-slate-700 dark:hover:bg-slate-100 transition-all shadow-sm"
          >
            Explore Projects
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#huddle"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-[#111111] hover:border-slate-300 dark:hover:border-slate-600 transition-all"
          >
            <Zap size={15} className="text-amber-500" />
            Enter The Huddle
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          {...fadeUp(0.65)}
          className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {s.value}
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                {s.label}
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-600 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
