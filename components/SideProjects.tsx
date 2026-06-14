'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'shailendrasingh.dev',
    tagline:
      'This portfolio — statically prerendered Next.js 14 App Router site with an MDX content layer, Framer Motion animations, and a server/client component split that keeps fs reads strictly server-side. Deployed to Vercel via GitHub push.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MDX', 'Vercel'],
    status: 'Shipping',
    statusColor: 'green' as const,
    github: 'https://github.com/Shailendre/shailendrasingh.dev',
    demo: 'https://shailendrasinghdev.vercel.app',
  },
]

const statusBadge = {
  green: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
  blue: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400',
  amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
  violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400',
}

const statusDot = {
  green: 'bg-emerald-500',
  blue: 'bg-sky-500',
  amber: 'bg-amber-500',
  violet: 'bg-violet-500',
}

export default function SideProjects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Side Projects
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Active Builds &amp; Shipping
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm max-w-xl">
            Things I build in the margins — solving real problems, exploring new stacks, and occasionally shipping.
          </p>
        </motion.div>

        <div className={`grid gap-5 ${projects.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              className="group flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111111] hover:shadow-lg dark:hover:shadow-black/40 transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">
                  {project.title}
                </h3>
                <span
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${statusBadge[project.statusColor]}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[project.statusColor]}`} />
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {project.tagline}
              </p>

              {/* Stack badges */}
              <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#1a1a1a]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={project.github}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Github size={13} />
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
