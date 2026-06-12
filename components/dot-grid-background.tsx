"use client"

import { useEffect, useRef } from "react"

const DOT_R = 1.5
const SPACING = 14
const CURSOR_R = 500
const BULGE_S = 67
const GLOW_R = 80

interface Dot {
  x: number
  y: number
  ox: number
  oy: number
  sparkle: number
}

interface Ripple {
  x: number
  y: number
  start: number
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0
    let H = 0
    let dots: Dot[] = []
    // Start the cursor off-screen so nothing is disturbed until the mouse moves.
    const mouse = { x: -9999, y: -9999 }
    let ripples: Ripple[] = []
    let raf = 0

    function buildDots() {
      dots = []
      const cols = Math.ceil(W / SPACING) + 1
      const rows = Math.ceil(H / SPACING) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * SPACING,
            y: r * SPACING,
            ox: c * SPACING,
            oy: r * SPACING,
            sparkle: Math.random(),
          })
        }
      }
    }

    function resize() {
      if (!canvas) return
      // Fixed to the viewport, so the canvas is always exactly the window size.
      W = window.innerWidth
      H = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.scale(dpr, dpr)
      buildDots()
    }

    function draw(ts: number) {
      raf = requestAnimationFrame(draw)
      ctx!.clearRect(0, 0, W, H)
      const st = ts * 0.001

      // Expire finished ripples (1.1s lifetime).
      ripples = ripples.filter((rp) => ts - rp.start < 1100)

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const dx = mouse.x - d.ox
        const dy = mouse.y - d.oy
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Target position starts from the cursor bulge.
        let targetX = d.ox
        let targetY = d.oy
        if (dist < CURSOR_R) {
          const t = 1 - dist / CURSOR_R
          const push = t * t * BULGE_S
          const ang = Math.atan2(dy, dx)
          targetX = d.ox - Math.cos(ang) * push
          targetY = d.oy - Math.sin(ang) * push
        }

        // Layer click ripples on top of the cursor displacement.
        let rippleBoost = 0
        for (let rI = 0; rI < ripples.length; rI++) {
          const rp = ripples[rI]
          const age = (ts - rp.start) / 1100
          const radius = age * 520
          const rdx = d.ox - rp.x
          const rdy = d.oy - rp.y
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy)
          const band = Math.abs(rdist - radius)
          if (band < 46) {
            const intensity = (1 - band / 46) * (1 - age)
            const ang = Math.atan2(rdy, rdx)
            const push = intensity * 26
            targetX += Math.cos(ang) * push
            targetY += Math.sin(ang) * push
            rippleBoost = Math.max(rippleBoost, intensity)
          }
        }

        const ease = dist < CURSOR_R || rippleBoost > 0 ? 0.2 : 0.08
        d.x = lerp(d.x, targetX, ease)
        d.y = lerp(d.y, targetY, ease)

        const ddx = mouse.x - d.x
        const ddy = mouse.y - d.y
        const ddist = Math.sqrt(ddx * ddx + ddy * ddy)
        let alpha = 0.18
        let r = DOT_R
        if (ddist < GLOW_R) {
          const gt = 1 - ddist / GLOW_R
          alpha = lerp(0.18, 0.9, gt * gt)
          r = lerp(DOT_R, DOT_R * 2.5, gt * 0.5)
        }
        if (rippleBoost > 0) {
          alpha = Math.min(1, alpha + rippleBoost * 0.8)
          r = lerp(r, r * 2.2, rippleBoost)
        }
        const sp = (st * 2 + d.sparkle * 6.28) % 6.28
        const pulse = Math.sin(sp) * 0.5 + 0.5
        if (pulse > 0.92) alpha = Math.min(1, alpha + 0.4)
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx!.fillStyle =
          ddist < GLOW_R || rippleBoost > 0
            ? `rgba(200,160,255,${alpha})`
            : `rgba(180,140,220,${alpha})`
        ctx!.fill()
      }
    }

    function onMove(e: MouseEvent) {
      // Canvas is fixed to the viewport, so client coords map 1:1 — no scroll drift.
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function onClick(e: MouseEvent) {
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() })
    }

    function onTouch(e: TouchEvent) {
      mouse.x = e.touches[0].clientX
      mouse.y = e.touches[0].clientY
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("click", onClick)
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("click", onClick)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
