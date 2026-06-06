'use client'

import { motion } from 'framer-motion'
import { PenLine } from 'lucide-react'

const ghostRows = [
  { rfc: 'RFC-001', title: 'AI-Powered Code Review Platform', sector: 'SaaS Tooling', date: 'Jun 2025' },
  { rfc: 'RFC-002', title: 'Agentic DevOps Pipeline Orchestrator', sector: 'DevOps Automation', date: 'May 2025' },
  { rfc: 'RFC-003', title: 'B2B AI Knowledge Fabric', sector: 'B2B AI Platforms', date: 'Apr 2025' },
  { rfc: 'RFC-004', title: 'Distributed Observability Co-Pilot', sector: 'DevOps Automation', date: 'Mar 2025' },
]

export default function HuddleRoom() {
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
            The Huddle Area
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
            Startup concepts &amp; architecture drafts — blueprints, open-source ideas,
            and startup theories I&apos;m actively whiteboarding.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-[#111111]"
          style={{ minHeight: 240 }}
        >
          {/* Ghost rows — blurred, aria-hidden */}
          <div
            className="opacity-25 blur-[3px] select-none pointer-events-none"
            aria-hidden="true"
          >
            {/* Column header strip */}
            <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0f0f0f]">
              {['RFC', 'Title', 'Sector', 'Date', ''].map((h) => (
                <div
                  key={h}
                  className={`font-mono text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest ${
                    h === 'RFC' ? 'col-span-1' : h === 'Title' ? 'col-span-5' : h === 'Sector' ? 'col-span-3' : h === 'Date' ? 'col-span-2' : 'col-span-1'
                  }`}
                >
                  {h}
                </div>
              ))}
            </div>
            {ghostRows.map((row, i) => (
              <div
                key={row.rfc}
                className={`px-4 py-4 grid grid-cols-12 gap-3 items-center ${
                  i > 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''
                }`}
              >
                <div className="col-span-2 sm:col-span-1 font-mono text-xs text-slate-400 dark:text-slate-500">
                  {row.rfc}
                </div>
                <div className="col-span-8 sm:col-span-5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {row.title}
                </div>
                <div className="hidden sm:flex sm:col-span-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {row.sector}
                  </span>
                </div>
                <div className="hidden sm:block sm:col-span-2 font-mono text-xs text-slate-400">
                  {row.date}
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  <div className="w-3 h-3 rounded-sm border border-slate-300 dark:border-slate-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Frosted overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/75 dark:bg-[#111111]/80 backdrop-blur-[3px]">
            <div className="text-center px-8 max-w-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-5">
                <PenLine size={20} className="text-slate-500 dark:text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Architecture Drafts in Progress
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Whiteboarding new B2B SaaS frameworks, agentic automation blueprints,
                and interactive technical RFCs. Check back soon.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Sandbox Hub — Maintenance Mode
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
