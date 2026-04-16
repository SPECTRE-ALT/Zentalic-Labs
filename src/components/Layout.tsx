import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-layout">
      {/* Dynamic Ambient Glow System */}
      <div className="ambient-glow-system">
        <div className="glow-container">
          <div className="glow-orb-main"></div>
        </div>
      </div>

      {/* Grain/Noise Overlay for premium feel */}
      <div className="noise-overlay"></div>

      {/* Main Content */}
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  )
}
