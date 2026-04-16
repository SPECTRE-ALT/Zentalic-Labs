import { useRef, useEffect } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export default function MagneticButton({ children, href, onClick, className }: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    const wrap = wrapRef.current
    if (!btn || !wrap) return

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 120
      if (dist < maxDist) {
        const strength = (1 - dist / maxDist) * 20
        ;(btn as HTMLElement).style.transform = `translate(${dx * strength / maxDist}px, ${dy * strength / maxDist}px)`
      }
    }

    const onLeave = () => {
      ;(btn as HTMLElement).style.transform = 'translate(0, 0)'
    }

    window.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const style: React.CSSProperties = { transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }

  if (href) {
    return (
      <div className="magnetic-btn-wrap" ref={wrapRef}>
        <a
          href={href}
          ref={btnRef as React.RefObject<HTMLAnchorElement>}
          className={`magnetic-btn ${className || ''}`}
          style={style}
        >
          {children}
        </a>
      </div>
    )
  }

  return (
    <div className="magnetic-btn-wrap" ref={wrapRef}>
      <button
        ref={btnRef as React.RefObject<HTMLButtonElement>}
        className={`magnetic-btn ${className || ''}`}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}
