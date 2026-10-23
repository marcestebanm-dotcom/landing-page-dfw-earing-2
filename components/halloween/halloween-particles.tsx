'use client'

import { useEffect, useRef } from 'react'

export function HalloweenParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Particles: glowing orange & purple embers floating up
    const emberCount = 35
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.4 ? 'rgba(255, 117, 24, ' : 'rgba(168, 85, 247, ',
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
    }))

    // Ambient floating bats
    const bats = Array.from({ length: 6 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.6),
      size: Math.random() * 12 + 10,
      speedX: -(Math.random() * 1.5 + 0.8),
      speedY: Math.sin(Math.random() * Math.PI) * 0.5,
      wingState: 0,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw embers
      embers.forEach((ember) => {
        ember.y += ember.speedY
        ember.x += ember.speedX
        ember.opacity += Math.sin(Date.now() * ember.pulse) * 0.01

        if (ember.y < -10) {
          ember.y = height + 10
          ember.x = Math.random() * width
        }

        ctx.beginPath()
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2)
        ctx.fillStyle = `${ember.color}${Math.max(0.1, Math.min(0.8, ember.opacity))})`
        ctx.shadowBlur = 8
        ctx.shadowColor = '#ff6b00'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw bats
      bats.forEach((bat) => {
        bat.x += bat.speedX
        bat.wingState += 0.15
        const wingOffset = Math.sin(bat.wingState) * (bat.size * 0.4)

        if (bat.x < -40) {
          bat.x = width + 40
          bat.y = Math.random() * (height * 0.6)
        }

        ctx.save()
        ctx.translate(bat.x, bat.y)
        ctx.fillStyle = 'rgba(20, 15, 28, 0.45)'
        ctx.beginPath()
        // Simple silhouette of bat with flapping wings
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(-bat.size * 0.5, -wingOffset, -bat.size, -wingOffset * 0.5)
        ctx.quadraticCurveTo(-bat.size * 0.7, wingOffset * 0.3, 0, bat.size * 0.3)
        ctx.quadraticCurveTo(bat.size * 0.7, wingOffset * 0.3, bat.size, -wingOffset * 0.5)
        ctx.quadraticCurveTo(bat.size * 0.5, -wingOffset, 0, 0)
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
