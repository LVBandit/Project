"use client"

import { useEffect, useRef, type ReactNode } from "react"

const COLOR = "#c532ff"
const SPEED = 2.5
const THICKNESS = 2
const BR = 24
const BOFF = 60
const DISP = 60

function rand(x: number) {
  return (Math.sin(x * 12.9898) * 43758.5453) % 1
}

function noise2d(x: number, y: number) {
  const i = Math.floor(x)
  const j = Math.floor(y)
  const fx = x - i
  const fy = y - j
  const a = rand(i + j * 57)
  const b = rand(i + 1 + j * 57)
  const c = rand(i + (j + 1) * 57)
  const d = rand(i + 1 + (j + 1) * 57)
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
}

function octNoise(x: number, time: number, seed: number) {
  let y = 0
  let a = 0.12
  let f = 10
  for (let i = 0; i < 10; i++) {
    y += a * noise2d(f * x + seed * 100, time * f * 0.3)
    f *= 1.6
    a *= 0.7
  }
  return y
}

function getCorner(cx: number, cy: number, r: number, sa: number, al: number, p: number) {
  const ang = sa + p * al
  return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) }
}

function getRRPoint(t: number, l: number, top: number, w: number, h: number, r: number) {
  const sw = w - 2 * r
  const sh = h - 2 * r
  const ca = (Math.PI * r) / 2
  const perim = 2 * sw + 2 * sh + 4 * ca
  const dist = t * perim
  let acc = 0
  if (dist <= acc + sw) return { x: l + r + ((dist - acc) / sw) * sw, y: top }
  acc += sw
  if (dist <= acc + ca) return getCorner(l + w - r, top + r, r, -Math.PI / 2, Math.PI / 2, (dist - acc) / ca)
  acc += ca
  if (dist <= acc + sh) return { x: l + w, y: top + r + ((dist - acc) / sh) * sh }
  acc += sh
  if (dist <= acc + ca) return getCorner(l + w - r, top + h - r, r, 0, Math.PI / 2, (dist - acc) / ca)
  acc += ca
  if (dist <= acc + sw) return { x: l + w - r - ((dist - acc) / sw) * sw, y: top + h }
  acc += sw
  if (dist <= acc + ca) return getCorner(l + r, top + h - r, r, Math.PI / 2, Math.PI / 2, (dist - acc) / ca)
  acc += ca
  if (dist <= acc + sh) return { x: l, y: top + h - r - ((dist - acc) / sh) * sh }
  acc += sh
  return getCorner(l + r, top + r, r, Math.PI, Math.PI / 2, (dist - acc) / ca)
}

export function ElectricBorder({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let ebTime = 0
    let ebLast = 0
    let ebW = 0
    let ebH = 0
    let raf = 0

    function sizeEB() {
      const rect = wrap!.getBoundingClientRect()
      const w = rect.width + BOFF * 2
      const h = rect.height + BOFF * 2
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + "px"
      canvas!.style.height = h + "px"
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.scale(dpr, dpr)
      ebW = w
      ebH = h
    }

    function drawEB(ts: number) {
      raf = requestAnimationFrame(drawEB)
      const dt = (ts - ebLast) / 1000
      ebTime += dt * SPEED
      ebLast = ts
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.scale(dpr, dpr)
      ctx!.strokeStyle = COLOR
      ctx!.lineWidth = THICKNESS
      ctx!.lineCap = "round"
      ctx!.lineJoin = "round"
      const l = BOFF
      const top = BOFF
      const bw = ebW - 2 * BOFF
      const bh = ebH - 2 * BOFF
      const maxR = Math.min(bw, bh) / 2
      const r = Math.min(BR, maxR)
      const perim = 2 * (bw + bh) + 2 * Math.PI * r
      const samples = Math.floor(perim / 2)
      ctx!.beginPath()
      for (let i = 0; i <= samples; i++) {
        const prog = i / samples
        const pt = getRRPoint(prog, l, top, bw, bh, r)
        const xn = octNoise(prog * 8, ebTime, 0) * DISP
        const yn = octNoise(prog * 8, ebTime, 1) * DISP
        if (i === 0) ctx!.moveTo(pt.x + xn, pt.y + yn)
        else ctx!.lineTo(pt.x + xn, pt.y + yn)
      }
      ctx!.closePath()
      ctx!.stroke()
    }

    const startTimer = setTimeout(() => {
      sizeEB()
      raf = requestAnimationFrame(drawEB)
    }, 100)

    function onResize() {
      sizeEB()
    }
    window.addEventListener("resize", onResize)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative isolate inline-block rounded-3xl">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl">
        <div
          className="pointer-events-none absolute inset-0 box-border rounded-3xl"
          style={{ border: "2px solid rgba(197,50,255,0.6)", filter: "blur(1px)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 box-border rounded-3xl"
          style={{ border: "2px solid rgba(197,50,255,0.9)", filter: "blur(4px)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 box-border rounded-3xl"
          style={{
            zIndex: -1,
            transform: "scale(1.1)",
            filter: "blur(32px)",
            opacity: 0.3,
            background:
              "linear-gradient(-30deg, rgba(197,50,255,0.9), transparent, rgba(197,50,255,0.6))",
          }}
        />
      </div>
      <div className="relative z-[1] rounded-3xl">{children}</div>
    </div>
  )
}
