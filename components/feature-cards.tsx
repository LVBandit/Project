"use client"

import type { ReactNode } from "react"
import { useRef, useState } from "react"
import { ElectricBorder } from "@/components/electric-border"

interface Feature {
  title: string
  desc: string
  icon: ReactNode
}

const features: Feature[] = [
  {
    title: "Brand Identity",
    desc: "Visual systems with depth and character.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 block h-7 w-7">
        <path d="M14 3L25 9.5V18.5L14 25L3 18.5V9.5L14 3Z" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" fill="none" />
        <path d="M14 3V25M3 9.5L25 18.5M25 9.5L3 18.5" stroke="rgba(168,85,247,0.35)" strokeWidth="1" fill="none" />
        <circle cx="14" cy="14" r="2.5" fill="rgba(168,85,247,0.7)" />
      </svg>
    ),
  },
  {
    title: "UI Design",
    desc: "Interfaces built for clarity and delight.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 block h-7 w-7">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" fill="rgba(168,85,247,0.1)" />
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" fill="rgba(168,85,247,0.06)" />
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" fill="rgba(168,85,247,0.06)" />
        <rect x="15" y="15" width="10" height="10" rx="2" stroke="rgba(168,85,247,0.35)" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "Motion",
    desc: "Animation that adds meaning, not noise.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 block h-7 w-7">
        <ellipse cx="14" cy="14" rx="11" ry="5" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" fill="none" />
        <ellipse cx="14" cy="14" rx="11" ry="5" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" fill="none" transform="rotate(60 14 14)" />
        <ellipse cx="14" cy="14" rx="11" ry="5" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" fill="none" transform="rotate(120 14 14)" />
        <circle cx="14" cy="14" r="2.5" fill="rgba(168,85,247,0.8)" />
      </svg>
    ),
  },
]

function CardBody({
  icon,
  title,
  desc,
  width,
}: {
  icon: ReactNode
  title: string
  desc: string
  width: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false })
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setGlow({ x: px * 100, y: py * 100, on: true })
    // Subtle 3D tilt: max ~6deg, inverted so the card leans toward the cursor.
    setTilt({ ry: (px - 0.5) * 12, rx: (0.5 - py) * 12 })
  }

  function handleLeave() {
    setGlow((g) => ({ ...g, on: false }))
    setTilt({ rx: 0, ry: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_8px_40px_-12px_rgba(168,85,247,0.45)]"
      style={{
        width,
        transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease-out, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Cursor-following spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(168,85,247,0.18), transparent 65%)`,
        }}
      />
      <div className="relative">
        {icon}
        <h3 className="mb-1.5 text-sm font-medium text-foreground/85">{title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

export function FeatureCards() {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-6 pb-20 md:px-12">
      {features.map((f) => (
        <CardBody key={f.title} icon={f.icon} title={f.title} desc={f.desc} width="180px" />
      ))}

      <ElectricBorder>
        <CardBody
          width="200px"
          title="LV External"
          desc="soon..."
          icon={
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 block h-7 w-7">
              <polyline points="6,9 2,14 6,19" stroke="rgba(197,50,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <polyline points="22,9 26,14 22,19" stroke="rgba(197,50,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="17" y1="5" x2="11" y2="23" stroke="rgba(197,50,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
      </ElectricBorder>
    </div>
  )
}
