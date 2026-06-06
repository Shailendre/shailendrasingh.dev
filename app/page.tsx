import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HighlightReel from '@/components/HighlightReel'
import SideProjects from '@/components/SideProjects'
import HuddleRoom from '@/components/HuddleRoom'
import WritingSection from '@/components/WritingSection'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/mdx'

export default function Home() {
  const allPosts = getAllPosts()
  const technicalPosts = allPosts.filter((p) => p.category === 'technical')
  const personalPosts = allPosts.filter((p) => p.category === 'personal')

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100">
      <Navbar />
      <HeroSection />
      <HighlightReel />
      <SideProjects />
      <HuddleRoom />
      <WritingSection technicalPosts={technicalPosts} personalPosts={personalPosts} />
      <Footer />
    </main>
  )
}
