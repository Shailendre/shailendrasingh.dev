'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageSquare, X, Send, Github, Link2, Check } from 'lucide-react'
import type { WhiteboardIdeaMeta } from '@/lib/types'

interface Comment {
  id: string
  username: string
  text: string
  date: string
}

interface Props {
  idea: WhiteboardIdeaMeta
  topBarOnly?: boolean
}

function storageKey(type: 'upvotes' | 'comments', slug: string) {
  return `whiteboard-${type}-${slug}`
}

export default function WhiteboardClient({ idea, topBarOnly }: Props) {
  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [comments, setComments] = useState<Comment[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [commentText, setCommentText] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey('upvotes', idea.slug))
    if (stored) {
      const parsed = JSON.parse(stored) as { count: number; voted: boolean }
      setUpvoteCount(parsed.count)
      setUpvoted(parsed.voted)
    }
    const storedComments = localStorage.getItem(storageKey('comments', idea.slug))
    if (storedComments) {
      setComments(JSON.parse(storedComments) as Comment[])
    }
  }, [idea.slug])

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function toggleUpvote() {
    const newVoted = !upvoted
    const newCount = newVoted ? upvoteCount + 1 : Math.max(0, upvoteCount - 1)
    setUpvoted(newVoted)
    setUpvoteCount(newCount)
    localStorage.setItem(
      storageKey('upvotes', idea.slug),
      JSON.stringify({ count: newCount, voted: newVoted }),
    )
  }

  function submitComment() {
    if (!username.trim() || !commentText.trim()) return
    const newComment: Comment = {
      id: crypto.randomUUID(),
      username: username.trim(),
      text: commentText.trim(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    }
    const updated = [...comments, newComment]
    setComments(updated)
    localStorage.setItem(storageKey('comments', idea.slug), JSON.stringify(updated))
    setCommentText('')
    setUsername('')
    setModalOpen(false)
  }

  /* ── Top-bar mode: just the copy-link button ── */
  if (topBarOnly) {
    return (
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111111] text-xs font-medium text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-all"
        aria-label="Copy link"
      >
        {copied ? <Check size={13} className="text-emerald-500" /> : <Link2 size={13} />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    )
  }

  /* ── Full mode: upvote + comment + media ── */
  return (
    <>
      {/* Actions row */}
      <div className="flex items-center gap-3 pt-8 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={toggleUpvote}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
            upvoted
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400'
              : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-500 dark:hover:text-rose-400 bg-white dark:bg-[#111111]'
          }`}
        >
          <Heart size={15} className={upvoted ? 'fill-current' : ''} />
          {upvoted ? 'Upvoted' : 'Upvote'}
          {upvoteCount > 0 && (
            <span className="font-mono text-xs">{upvoteCount}</span>
          )}
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111111] text-sm font-medium text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-all"
        >
          <MessageSquare size={15} />
          Comment
          {comments.length > 0 && (
            <span className="font-mono text-xs">{comments.length}</span>
          )}
        </button>

        {idea.github && (
          <a
            href={idea.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111111] text-sm font-medium text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-all"
          >
            <Github size={15} />
            GitHub
          </a>
        )}
      </div>

      {/* Comments list */}
      {comments.length > 0 && (
        <div className="mt-8 space-y-3">
          <p className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Comments
          </p>
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111111]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                  {c.username[0]}
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {c.username}
                </span>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{c.date}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Images */}
      {idea.images.length > 0 && (
        <div className="mt-10">
          <p className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Images
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {idea.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${idea.title} image ${i + 1}`}
                className="rounded-xl border border-slate-200 dark:border-slate-800 w-full object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {idea.videos.length > 0 && (
        <div className="mt-10">
          <p className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Videos
          </p>
          <div className="space-y-4">
            {idea.videos.map((src, i) => (
              <video
                key={i}
                src={src}
                controls
                className="rounded-xl border border-slate-200 dark:border-slate-800 w-full"
              />
            ))}
          </div>
        </div>
      )}

      {/* Comment modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111111] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Leave a comment</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">
                  Your name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1a1a1a] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition font-sans"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">
                  Comment
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="What do you think about this idea?"
                  rows={4}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1a1a1a] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition resize-none font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-5">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitComment}
                disabled={!username.trim() || !commentText.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
              >
                <Send size={13} />
                Post comment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
