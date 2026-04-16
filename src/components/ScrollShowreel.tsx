import { useEffect, useRef, useState } from 'react'

const FRAMES_COUNT = 60

function generateFrameColor(progress: number): string {
  // Simulate a showreel by changing color stops based on scroll progress
  const scenes = [
    { bg: '#0A0A0F', accent: '#C8FF00' },
    { bg: '#050815', accent: '#0A7CFF' },
    { bg: '#0A0F0A', accent: '#C8FF00' },
    { bg: '#0A0A0F', accent: '#FF6B35' },
    { bg: '#05080A', accent: '#0A7CFF' },
  ]
  const idx = Math.floor(progress * (scenes.length - 1))
  const scene = scenes[Math.min(idx, scenes.length - 1)]
  return `${scene.bg}|${scene.accent}`
}

export default function ScrollShowreel() {
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const labels = [
      'ZYNX AI — Marketing Synthesis Engine',
      'Generative AI + Industrial Automation',
      'Building the Future of Creative Workflows',
      'Open Source. Scalable. Transformative.',
      'ZENTALIC LABS',
    ]

    const draw = (p: number) => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const W = canvas.width
      const H = canvas.height

      const colorStr = generateFrameColor(p)
      const [bg, accent] = colorStr.split('|')

      // Background
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)



      // Scene index
      const sceneCount = labels.length
      const sceneIdx = Math.floor(p * sceneCount)
      const localP = (p * sceneCount) % 1

      // Central glow
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.6 * (0.8 + localP * 0.4))
      grad.addColorStop(0, `${accent}25`)
      grad.addColorStop(0.5, `${accent}08`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Horizontal scan line
      const scanY = H * localP
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      scanGrad.addColorStop(0, 'transparent')
      scanGrad.addColorStop(0.5, `${accent}40`)
      scanGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 60, W, 120)

      // Label text
      const label = labels[Math.min(sceneIdx, labels.length - 1)]
      const opacity = sceneIdx < sceneCount ? Math.min(1, localP * 3, (1 - localP) * 3) : 1
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.font = `700 ${Math.min(W * 0.04, 48)}px 'Space Grotesk', sans-serif`
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, W / 2, H / 2)

      ctx.restore()

      // Frame counter overlay
      ctx.font = `400 14px 'JetBrains Mono', monospace`
      ctx.fillStyle = `${accent}60`
      ctx.textAlign = 'left'
      ctx.fillText(`FRAME ${String(Math.floor(p * FRAMES_COUNT)).padStart(3, '0')} / ${FRAMES_COUNT}`, 32, H - 32)
    }

    const onScroll = () => {
      if (!section) return
      const rect = section.getBoundingClientRect()
      const totalHeight = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalHeight))
      setProgress(p)
      draw(p)
    }

    draw(0)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => draw(progress))
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', () => draw(progress))
    }
  }, [])

  return (
    <div className="showreel-section" ref={sectionRef}>
      <div className="showreel-sticky" ref={stickyRef}>
        <div className="showreel-label">
          <span className="badge">Scroll Showreel — Zentalic Labs</span>
        </div>
        <canvas
          ref={canvasRef}
          className="showreel-canvas"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="showreel-progress">
          <span>{Math.round(progress * 100)}%</span>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <span>Showreel</span>
        </div>
      </div>
    </div>
  )
}
