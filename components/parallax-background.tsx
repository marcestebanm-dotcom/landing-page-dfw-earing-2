'use client'

import { useEffect, useRef } from 'react'

/**
 * Fixed, full-viewport star field with a subtle scroll parallax.
 * Four-point brand stars are drawn on a canvas across several depth layers;
 * each layer drifts at a different speed on scroll to create depth without
 * abrupt motion. The canvas is position: fixed so it stays visible across
 * every section. Intensity is reduced on mobile and motion is disabled for
 * reduced-motion users.
 */

type Star = {
  x: number // 0..1 relative to width
  y: number // 0..1 relative to virtual height
  size: number
  depth: number // parallax factor, larger = moves more
  alpha: number
}

const DFW_BLUE = '50, 101, 193' // #3265C1

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  alpha: number,
) {
  // Four-point sparkle: concave diamond, matching the brand graphic.
  const inner = r * 0.28
  ctx.beginPath()
  ctx.moveTo(cx, cy - r)
  ctx.quadraticCurveTo(cx + inner * 0.4, cy - inner * 0.4, cx + r, cy)
  ctx.quadraticCurveTo(cx + inner * 0.4, cy + inner * 0.4, cx, cy + r)
  ctx.quadraticCurveTo(cx - inner * 0.4, cy + inner * 0.4, cx - r, cy)
  ctx.quadraticCurveTo(cx - inner * 0.4, cy - inner * 0.4, cx, cy - r)
  ctx.closePath()
  ctx.fillStyle = `rgba(${DFW_BLUE}, ${alpha})`
  ctx.fill()
}

export function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let stars: Star[] = []
    let frame = 0
    let targetY = 0
    let currentY = 0

    const isMobile = () => window.innerWidth < 768

    const buildStars = () => {
      // Density scales with viewport area; fewer on mobile for performance.
      const area = width * height
      const count = Math.round(area / (isMobile() ? 26000 : 17000))
      stars = Array.from({ length: count }, () => {
        const depthPick = Math.random()
        // Three depth bands for layered parallax.
        const depth =
          depthPick < 0.5 ? 0.15 : depthPick < 0.85 ? 0.35 : 0.6
        return {
          x: Math.random(),
          y: Math.random(),
          size:
            depth < 0.2
              ? 2 + Math.random() * 4
              : depth < 0.4
                ? 4 + Math.random() * 7
                : 7 + Math.random() * 12,
          depth,
          alpha:
            depth < 0.2
              ? 0.1 + Math.random() * 0.12
              : depth < 0.4
                ? 0.14 + Math.random() * 0.16
                : 0.18 + Math.random() * 0.22,
        }
      })
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
    }

    const paint = () => {
      ctx.clearRect(0, 0, width, height)
      // Virtual band taller than the viewport so stars wrap smoothly.
      const band = height * 1.6
      for (const s of stars) {
        const offset = currentY * s.depth
        // Wrap within the virtual band, then center over the viewport.
        let y = (s.y * band - offset) % band
        if (y < 0) y += band
        y -= (band - height) / 2
        if (y < -20 || y > height + 20) continue
        drawStar(ctx, s.x * width, y, s.size, s.alpha)
      }
    }

    const render = () => {
      currentY += (targetY - currentY) * 0.08
      if (Math.abs(targetY - currentY) < 0.2) currentY = targetY
      paint()
      frame = 0
      if (currentY !== targetY) frame = requestAnimationFrame(render)
    }

    const getFactor = () =>
      reduceMotion.matches ? 0 : isMobile() ? 0.3 : 0.6

    const onScroll = () => {
      targetY = window.scrollY * getFactor()
      if (!frame) frame = requestAnimationFrame(render)
    }

    resize()
    onScroll()
    paint()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => {
      resize()
      onScroll()
      paint()
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Very light cream wash to unify the field without hiding the stars */}
      <div className="absolute inset-0 bg-background/30" />
    </div>
  )
}
