import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getWhiteboardIdea, getAllWhiteboardIdeas } from '@/lib/mdx'
import WhiteboardClient from './WhiteboardClient'

function IdeaSection({ label, bullets, dotColor }: { label: string; bullets: string[]; dotColor: string }) {
  return (
    <div>
      <p className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
        {label}
      </p>
      <ul className="space-y-2.5">
        {bullets.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
            <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function generateStaticParams() {
  const ideas = getAllWhiteboardIdeas()
  return ideas.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const idea = getWhiteboardIdea(slug)
  if (!idea) return {}
  return {
    title: `${idea.title} | Shailendra Singh`,
    description: idea.brief,
  }
}

const statusBadge: Record<string, string> = {
  amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  green: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  blue: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800',
  violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800',
}

const statusDot: Record<string, string> = {
  amber: 'bg-amber-500',
  green: 'bg-emerald-500',
  blue: 'bg-sky-500',
  violet: 'bg-violet-500',
}

export default async function WhiteboardIdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const idea = getWhiteboardIdea(slug)
  if (!idea) notFound()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* Top bar — back nav + copy link (client) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <ArrowLeft size={15} />
              Projects
            </Link>
            {idea.rfc && (
              <>
                <span className="text-slate-300 dark:text-slate-700">/</span>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{idea.rfc}</span>
              </>
            )}
          </div>
          {/* Copy link lives in client component */}
          <WhiteboardClient idea={idea} topBarOnly />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* Sector + date row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {idea.rfc && (
            <>
              <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {idea.rfc}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
            </>
          )}
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {idea.sector}
          </span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
            {new Date(idea.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
          {idea.title}
        </h1>

        {/* Status badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${statusBadge[idea.statusColor]} mb-6`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${idea.status !== 'Done' ? 'animate-pulse' : ''} ${statusDot[idea.statusColor]}`} />
          {idea.status}
        </span>

        {/* Brief */}
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          {idea.brief}
        </p>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800 mb-8" />

        {/* Stack */}
        <div className="mb-8">
          <p className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {idea.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#1a1a1a]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Structured What / Why / How */}
        <div className="space-y-8 mb-8">
          {idea.what.length > 0 && (
            <IdeaSection label="What" bullets={idea.what} dotColor="bg-sky-500" />
          )}
          {idea.why.length > 0 && (
            <IdeaSection label="Why" bullets={idea.why} dotColor="bg-amber-500" />
          )}
          {idea.how.length > 0 && (
            <IdeaSection label="How" bullets={idea.how} dotColor="bg-emerald-500" />
          )}
        </div>

        {/* Interactive: upvotes, comments, media (full mode) */}
        <WhiteboardClient idea={idea} />
      </div>
    </main>
  )
}
