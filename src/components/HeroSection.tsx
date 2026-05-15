import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { NcEyebrow } from './ui/nc-badge'
import { NcButtonPrimary, NcButtonSecondary } from './ui/nc-button'

const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(5px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 180, damping: 24 },
  },
}

const mealItems = ['Oats + banana', 'Dal + 2 roti', 'Grilled paneer', 'Curd + salad']

export default function HeroSection() {
  const floatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!floatRef.current) return
    const cards = floatRef.current.querySelectorAll('.float-card')
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -10 : 10,
        duration: 2.5 + i * 0.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      })
    })
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-nc-bg">
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 28% 50%, rgba(235,229,195,0.5) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_0.88fr] gap-10 md:gap-8 items-center py-20 pt-28">
        {/* LEFT — text */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.22 } } }}
        >
          <motion.div variants={fadeUp}>
            <NcEyebrow>India's AI Dietitian — Now Pitching</NcEyebrow>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl md:text-[4.25rem] font-bold text-nc-text leading-[1.06] tracking-tight"
            variants={fadeUp}
          >
            Your personal<br />
            dietitian,{' '}
            <span className="text-nc-text-secondary">
              building<br className="hidden md:block" /> a healthier you
            </span>
            {' '}— every day
          </motion.h1>

          <motion.p
            className="text-base md:text-[1.05rem] text-nc-text-secondary leading-relaxed max-w-[46ch]"
            variants={fadeUp}
          >
            NutriCore gives every Indian a personalized 7-day meal plan, workout routine,
            and Swiggy ordering guide — powered by AI, built around your budget and body.
          </motion.p>

          <motion.div className="flex items-center gap-3 flex-wrap" variants={fadeUp}>
            <NcButtonPrimary
              size="lg"
              trailingArrow
              onClick={() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Leave Your Feedback
            </NcButtonPrimary>
            <NcButtonSecondary
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Features
            </NcButtonSecondary>
          </motion.div>

          <motion.div className="flex items-center gap-4 pt-2" variants={fadeUp}>
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-nc-bg"
                  style={{ background: ['#F5E6A3','#C8EFD4','#FDDBB8','#D9D4F0'][i] }}
                />
              ))}
            </div>
            <p className="text-xs text-nc-text-muted">Launching across <span className="text-nc-text font-medium">India</span> · MVP Q3 2026</p>
          </motion.div>
        </motion.div>

        {/* RIGHT — floating preview cards */}
        <div ref={floatRef} className="relative h-[480px] md:h-[540px] hidden md:block">
          {/* Meal Plan Card */}
          <div className="float-card absolute top-6 left-4 w-56 p-1.5 rounded-[calc(1.25rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04]">
            <div className="rounded-[1.25rem] bg-nc-yellow p-4">
              <p className="text-[10px] uppercase tracking-widest text-nc-dark/60 font-medium mb-2">Today's Meals</p>
              <ul className="space-y-1.5">
                {mealItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-medium text-nc-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-nc-dark/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-nc-dark/10 flex justify-between text-[10px] text-nc-dark/60">
                <span>1,840 kcal</span>
                <span>₹ 110 / day</span>
              </div>
            </div>
          </div>

          {/* Macro Ring Card */}
          <div className="float-card absolute top-4 right-4 w-44 p-1.5 rounded-[calc(1.25rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04]">
            <div className="rounded-[1.25rem] bg-nc-surface p-4" style={{ boxShadow: 'var(--shadow-nc-card)' }}>
              <p className="text-[10px] uppercase tracking-widest text-nc-text-muted font-medium mb-3">Macros</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Protein', val: 72, color: 'bg-nc-mint-dark', pct: '72%' },
                  { label: 'Carbs',   val: 220, color: 'bg-nc-yellow-dark', pct: '88%' },
                  { label: 'Fat',     val: 48, color: 'bg-nc-peach-dark', pct: '60%' },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex justify-between text-[10px] text-nc-text-secondary mb-0.5">
                      <span>{m.label}</span>
                      <span>{m.val}g</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/8">
                      <div className={`h-full rounded-full ${m.color}`} style={{ width: m.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="float-card absolute bottom-24 left-8 w-48 p-1.5 rounded-[calc(1.25rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04]">
            <div className="rounded-[1.25rem] bg-nc-surface p-4" style={{ boxShadow: 'var(--shadow-nc-card)' }}>
              <div className="flex items-center gap-2 mb-2">
                <img src="/clock.png" alt="" className="w-6 h-6 object-contain" />
                <span className="text-sm font-semibold text-nc-streak">14-Day Streak</span>
              </div>
              <p className="text-[10px] text-nc-text-muted">Keep going! You're on a roll 🎯</p>
              <div className="mt-2 flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full ${i < 5 ? 'bg-nc-streak' : 'bg-black/10'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Speed Badge */}
          <div className="float-card absolute bottom-16 right-6 p-1.5 rounded-[calc(1rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04]">
            <div className="rounded-nc-md bg-nc-mint p-3 flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-xs font-semibold text-nc-dark">AI in 3 sec</p>
                <p className="text-[10px] text-nc-dark/60">Personalized plan</p>
              </div>
            </div>
          </div>

          {/* Swiggy integration badge */}
          <div className="float-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-[calc(1rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04]">
            <div className="rounded-nc-md bg-nc-peach p-3 flex items-center gap-2">
              <span className="text-xl">🛵</span>
              <div>
                <p className="text-xs font-semibold text-nc-dark">Swiggy picks</p>
                <p className="text-[10px] text-nc-dark/60">Healthy & on-budget</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-nc-text-muted">Scroll</span>
        <motion.div
          className="w-px h-8 bg-nc-text-muted/30"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
