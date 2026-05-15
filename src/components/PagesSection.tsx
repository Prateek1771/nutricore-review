import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { NcEyebrow } from './ui/nc-badge'

gsap.registerPlugin(ScrollTrigger)

const pages = [
  {
    name: 'Dashboard',
    desc: 'Your daily nutrition overview — calories, macros, streak, upcoming meals, and quick actions all in one glance.',
    img: '/illustrations/01.png',
    accent: 'bg-nc-yellow',
    emoji: '🏠',
  },
  {
    name: 'Food & Diet',
    desc: 'Full 7-day meal plan with Indian foods. Log meals via photo or voice. Real-time macro tracking.',
    img: '/illustrations/02.png',
    accent: 'bg-nc-mint',
    emoji: '🥗',
  },
  {
    name: 'Workout',
    desc: 'Daily exercise plan with GIF demonstrations. Mark sets complete. Progressive overload built in.',
    img: '/illustrations/03.png',
    accent: 'bg-nc-peach',
    emoji: '🏋️',
  },
  {
    name: 'Journal',
    desc: 'Daily check-ins, mood tracking, and body stats. Helps the AI refine your plan every 15 days.',
    img: '/illustrations/04.png',
    accent: 'bg-nc-lavender',
    emoji: '📔',
  },
  {
    name: 'Rewards',
    desc: 'Streak milestones, badges, and community leaderboard. Gamified health that keeps you coming back.',
    img: '/illustrations/05.png',
    accent: 'bg-nc-pink',
    emoji: '🏆',
  },
  {
    name: 'Profile',
    desc: 'Your body stats, goal history, plan timeline, and subscription. Everything personal in one place.',
    img: '/illustrations/06.png',
    accent: 'bg-nc-sky',
    emoji: '👤',
  },
]

export default function PagesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.page-card')
    if (!cards) return
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: (i % 3) * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="pages" className="py-32 bg-nc-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <NcEyebrow className="mb-4">App Pages</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Six powerful pages,<br />one seamless experience
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base leading-relaxed max-w-xl">
            Each page is purpose-built. Clean, warm, and fast — designed to feel like a coach in your pocket, not another app you'll abandon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((page) => (
            <div key={page.name} className="page-card group">
              <div className="p-1.5 rounded-[calc(1.5rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04] h-full">
                <div className="rounded-nc-lg bg-nc-surface h-full overflow-hidden" style={{ boxShadow: 'var(--shadow-nc-card)' }}>
                  {/* Image placeholder / illustration */}
                  <div className={`relative h-48 ${page.accent} overflow-hidden`}>
                    <img
                      src={page.img}
                      alt={page.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const t = e.currentTarget
                        t.style.display = 'none'
                        const parent = t.parentElement
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl">${page.emoji}</div>`
                        }
                      }}
                    />
                  </div>
                  {/* Text */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{page.emoji}</span>
                      <h3 className="font-semibold text-nc-text text-sm">{page.name}</h3>
                    </div>
                    <p className="text-xs text-nc-text-secondary leading-relaxed">{page.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
