"use client"

import Link from "next/link"
import { useEffect, useRef, type ReactNode } from "react"

interface DockItem {
  label: string
  href: string
  icon: ReactNode
}

const ICON_CLASS = "h-[26px] w-[26px]"

const items: DockItem[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLASS}>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLASS}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    label: "Stuff",
    href: "/stuff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLASS}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "About",
    href: "/about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLASS}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: "Socials",
    href: "/socials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLASS}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
        <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
      </svg>
    ),
  },
  {
    label: "Get in touch",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLASS}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
]

const BASE = 48 // resting icon-button size in px
const MAX = 84 // peak size at the cursor
const RANGE = 150 // px of influence on either side of the cursor

export function MagnifyDock() {
  const panelRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  // Live cursor x in viewport space; null when the pointer is away.
  const mouseX = useRef<number | null>(null)
  // Current animated size of each item, lerped toward its target each frame.
  const sizes = useRef<number[]>(items.map(() => BASE))
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function tick() {
      itemRefs.current.forEach((item, i) => {
        if (!item) return
        const rect = item.getBoundingClientRect()
        const cx = rect.left + rect.width / 2

        let target = BASE
        if (mouseX.current !== null) {
          const dist = Math.abs(mouseX.current - cx)
          if (dist < RANGE) {
            // Smooth cosine falloff for a natural macOS-style bulge.
            const t = 0.5 + 0.5 * Math.cos((dist / RANGE) * Math.PI)
            target = BASE + (MAX - BASE) * t
          }
        }

        // Critically-damped easing toward the target for buttery motion.
        const next = sizes.current[i] + (target - sizes.current[i]) * 0.2
        sizes.current[i] = next

        const scale = next / BASE
        item.style.width = `${next}px`
        item.style.height = `${next}px`
        const iconEl = item.firstElementChild as HTMLElement | null
        if (iconEl) iconEl.style.transform = `scale(${scale})`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  function handleMove(e: React.MouseEvent) {
    mouseX.current = e.clientX
  }

  function handleLeave() {
    mouseX.current = null
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="fixed bottom-3 left-1/2 z-[100] flex w-fit -translate-x-1/2 items-end gap-2 rounded-2xl border border-border bg-popover/90 px-2.5 py-2 backdrop-blur-md"
    >
      {items.map((item, i) => (
        <Link
          key={item.label}
          href={item.href}
          ref={(el) => {
            itemRefs.current[i] = el
          }}
          aria-label={item.label}
          className="group relative inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-popover text-primary shadow-md outline-none"
          style={{ width: BASE, height: BASE }}
        >
          <span className="flex items-center justify-center will-change-transform">{item.icon}</span>
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-pre rounded-md border border-border bg-popover px-2 py-0.5 text-xs text-popover-foreground opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  )
}
