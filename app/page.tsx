import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HighlightReel from '@/components/HighlightReel'
import ProjectsBoard from '@/components/ProjectsBoard'
import WritingSection from '@/components/WritingSection'
import Footer from '@/components/Footer'
import { getAllPosts, getAllWhiteboardIdeas } from '@/lib/mdx'

export default function Home() {
  const allPosts = getAllPosts()
  const technicalPosts = allPosts.filter((p) => p.category === 'technical')
  const personalPosts = allPosts.filter((p) => p.category === 'personal')
  const ideas = getAllWhiteboardIdeas()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100">
      <Navbar />
      <HeroSection />
      <HighlightReel />
      <ProjectsBoard ideas={ideas} />
      <WritingSection technicalPosts={technicalPosts} personalPosts={personalPosts} />
      <Footer />
    </main>
  )
}
