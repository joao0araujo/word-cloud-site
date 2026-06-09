'use client'

import { useEffect, useRef } from 'react'

const ORBS = [
  { baseX: 0.22, baseY: 0.38, size: 750, color: '#66EFFF', opacity: 0.65, speed: 0.00038, phase: 0.0 },
  { baseX: 0.68, baseY: 0.28, size: 620, color: '#E860FF', opacity: 0.55, speed: 0.00052, phase: 2.1 }, 
  { baseX: 0.48, baseY: 0.72, size: 680, color: '#18FFFF', opacity: 0.70, speed: 0.00031, phase: 4.2 }, 
  { baseX: 0.12, baseY: 0.62, size: 520, color: '#7B1FA2', opacity: 0.45, speed: 0.00061, phase: 1.0 }, 
  { baseX: 0.82, baseY: 0.58, size: 590, color: '#00B8D4', opacity: 0.60, speed: 0.00044, phase: 3.3 }, 
  { baseX: 0.55, baseY: 0.18, size: 480, color: '#651FFF', opacity: 0.40, speed: 0.00057, phase: 5.1 }, 
]

export default function SmokeBackground() {

  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })

  const orbRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let frame: number

    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {

        const now = performance.now()

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04

      const { x: mx, y: my } = mouseRef.current

      ORBS.forEach((orb, i) => {
        const el = orbRefs.current[i]
        if (!el) return

        const w = window.innerWidth
        const h = window.innerHeight

        const driftX = Math.sin(now * orb.speed + orb.phase) * 130
        const driftY = Math.cos(now * orb.speed * 0.78 + orb.phase * 1.4) * 100

        const intensidadeParalaxeX = 500 
        const intensidadeParalaxeY = 400 
        
        const parallaxStrength = 0.25 + i * 0.1 
        
        const mouseOffsetX = (mx - 0.5) * intensidadeParalaxeX * parallaxStrength
        const mouseOffsetY = (my - 0.5) * intensidadeParalaxeY * parallaxStrength

        const x = orb.baseX * w + driftX + mouseOffsetX - orb.size / 2
        const y = orb.baseY * h + driftY + mouseOffsetY - orb.size / 2

        el.style.transform = `translate(${x}px, ${y}px)`
      })

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 bg-[#09061a] overflow-hidden">
      {ORBS.map((orb, i) => (
        <div
            key={i}
            ref={(el) => { orbRefs.current[i] = el }}
            className="absolute top-0 left-0 rounded-full blur-[70px] will-change-transform pointer-events-none"
            style={{
                width: orb.size,
                height: orb.size,
                opacity: orb.opacity,
                background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            }}
        />
        
      ))}
    </div>
  )
}