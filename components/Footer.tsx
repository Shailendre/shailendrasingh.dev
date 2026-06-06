'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              Shailendra Singh
            </span>
            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mt-1">
              Senior Backend &amp; AI Platform Engineer
            </p>
          </div>

          <a
            href="mailto:goforsunny1994@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Mail size={13} />
            goforsunny1994@gmail.com
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Currently architecting at SAP&nbsp;&nbsp;·&nbsp;&nbsp;Learning German (A1)&nbsp;&nbsp;·&nbsp;&nbsp;Probably playing badminton
          </motion.div>
          <span className="text-xs font-mono text-slate-300 dark:text-slate-700">
            © {new Date().getFullYear()} Shailendra Singh
          </span>
        </div>
      </div>
    </footer>
  )
}
