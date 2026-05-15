import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  ForkKnife, Barbell, Camera, Lightning, Users, Storefront, ArrowsClockwise
} from '@phosphor-icons/react'
import type { ElementType } from 'react'
import { NcCardFill, type AccentColor } from './ui/nc-card'
import { NcEyebrow } from './ui/nc-badge'

gsap.registerPlugin(ScrollTrigger)

interface Feature {
  Icon: ElementType
  accent: AccentColor
  title: string
  body: string
  span: string
  emoji?: string
}

const features: Feature[] = [
  {
    Icon: ForkKnife,
    accent: 'yellow',
    title: 'Personalized Diet Plans',
    body: '7-day Indian meal plans with calories and ₹ cost per meal. Dal, Idli, Ragi, Paneer — your culture, your macros. Updated every 15 days as you progress.',
    span: 'col-span-12 md:col-span-7',
    emoji: '🥗',
  },
  {
    Icon: Barbell,
    accent: 'mint',
    title: 'Fitness & Exercise Plans',
    body: 'Beginner-friendly home or gym routines matched to your fitness level and goals.',
    span: 'col-span-12 md:col-span-5',
    emoji: '🏋️',
  },
  {
    Icon: Camera,
    accent: 'peach',
    title: 'Food Photo AI Logger',
    body: 'Snap a photo of your meal — NutriCore identifies it, logs the macros, and tracks your streak. Supports Kannada, Hindi, English voice input too.',
    span: 'col-span-12 md:col-span-5',
    emoji: '📸',
  },
  {
    Icon: Storefront,
    accent: 'sky',
    title: 'Swiggy & Instamart Integration',
    body: 'Healthy restaurant picks and grocery lists that fit your calorie and budget goals. Order smart, every single day.',
    span: 'col-span-12 md:col-span-7',
    emoji: '🛵',
  },
  {
    Icon: Lightning,
    accent: 'lavender',
    title: 'Streaks & Rewards',
    body: 'Daily logging streaks, milestones, and a rewards system that keeps you motivated beyond week one.',
    span: 'col-span-12 md:col-span-4',
    emoji: '🔥',
  },
  {
    Icon: Users,
    accent: 'pink',
    title: 'Community Showcase',
    body: 'Share progress, meal photos, and transformation stories. Inspire and be inspired.',
    span: 'col-span-12 md:col-span-4',
    emoji: '🏆',
  },
  {
    Icon: ArrowsClockwise,
    accent: 'yellow',
    title: '15-Day Full Body Check',
    body: 'Every 15 days, re-assess your body stats and goals. Your plan auto-adjusts as your body and habits change.',
    span: 'col-span-12 md:col-span-4',
    emoji: '📊',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.feature-card')
    if (!cards) return
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          delay: (i % 3) * 0.1,
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
    <section ref={sectionRef} id="features" className="py-32 bg-nc-surface-deep">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 gs-heading">
          <NcEyebrow className="mb-4">Core Features</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Everything you need<br />to eat and move better
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base leading-relaxed max-w-xl">
            7 features designed around the real life of an Indian — budget meals, local food database, Swiggy integration, and AI that learns you.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {features.map((f) => (
            <div key={f.title} className={`feature-card ${f.span}`}>
              <NcCardFill accent={f.accent} padding="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-nc-md bg-nc-dark/8 flex items-center justify-center">
                    <f.Icon size={20} weight="duotone" className="text-nc-dark" />
                  </div>
                  <span className="text-2xl">{f.emoji}</span>
                </div>
                <h3 className="font-semibold text-nc-dark text-base mb-2">{f.title}</h3>
                <p className="text-sm text-nc-dark/70 leading-relaxed">{f.body}</p>
              </NcCardFill>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
