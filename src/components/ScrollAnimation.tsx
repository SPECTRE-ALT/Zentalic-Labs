import { useEffect, useState } from 'react';

export default function ScrollAnimation() {
  const [smoothScroll, setSmoothScroll] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let currentPos = window.scrollY;

    const renderLoop = () => {
      // Linear interpolation (lerp) for a highly polished, liquid motion feel
      currentPos += (window.scrollY - currentPos) * 0.08;
      
      // Update state if difference is noticeable
      if (Math.abs(window.scrollY - currentPos) > 0.1) {
        setSmoothScroll(currentPos);
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Parallax & generative math
  const rot1 = smoothScroll * 0.03;      // Inner shard rotation
  const rot2 = smoothScroll * -0.015;    // Outer ring counter-rotation
  const rot3 = smoothScroll * 0.05;      // Core hexagon rapid rotation
  const translateY = smoothScroll * 0.2; // Move the whole drone downward slightly on scroll

  // expansion fluctuates in a sinusoidal wave, giving the drone a "breathing" mechanical feel
  const breathe = Math.sin(smoothScroll * 0.002); 
  const expansion = 25 + (breathe * 20); // Fluctuates between 5px and 45px

  return (
    <div 
      className="abstract-drone-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          width: 'min(90vw, 800px)',
          height: 'min(90vw, 800px)',
          opacity: 0.12, // Ultra-low opacity so it never distracts
          filter: 'blur(1px)', // Slight depth-of-field effect
          transform: `translateY(${translateY}px)`,
          willChange: 'transform'
        }}
      >
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          
          {/* Outer Dashed Orbit Ring */}
          <g style={{ transform: `rotate(${rot2}deg)`, transformOrigin: 'center' }}>
            <circle cx="250" cy="250" r="220" stroke="var(--text-disabled, #888)" strokeWidth="1" strokeDasharray="3 15" opacity="0.3" />
            <circle cx="250" cy="250" r="200" stroke="var(--accent-green)" strokeWidth="1" strokeDasharray="15 40" opacity="0.2" />
          </g>

          {/* Mechanical Drone Shards connecting the inner & outer layers */}
          <g style={{ transform: `rotate(${rot1}deg)`, transformOrigin: 'center' }}>
            <circle cx="250" cy="250" r="130" stroke="var(--border-color)" strokeWidth="1" opacity="0.4"/>
            <circle cx="250" cy="250" r="140" stroke="var(--accent-green)" strokeWidth="0.5" opacity="0.2"/>
            
            {/* Split Top Wing */}
            <path 
              d="M 230 50 L 270 50 L 260 110 L 240 110 Z" 
              fill="var(--accent-green-glow)" 
              stroke="var(--accent-green)" 
              strokeWidth="1" 
              style={{ transform: `translateY(${-expansion}px)` }} 
            />
            {/* Split Bottom Wing */}
            <path 
              d="M 230 450 L 270 450 L 260 390 L 240 390 Z" 
              fill="var(--accent-green-glow)" 
              stroke="var(--accent-green)" 
              strokeWidth="1" 
              style={{ transform: `translateY(${expansion}px)` }} 
            />
            {/* Split Left Wing */}
            <path 
              d="M 50 230 L 50 270 L 110 260 L 110 240 Z" 
              fill="var(--accent-green-glow)" 
              stroke="var(--accent-green)" 
              strokeWidth="1" 
              style={{ transform: `translateX(${-expansion}px)` }} 
            />
            {/* Split Right Wing */}
            <path 
              d="M 450 230 L 450 270 L 390 260 L 390 240 Z" 
              fill="var(--accent-green-glow)" 
              stroke="var(--accent-green)" 
              strokeWidth="1" 
              style={{ transform: `translateX(${expansion}px)` }} 
            />
          </g>

          {/* Inner Hexagonal Processing Core */}
          <g style={{ transform: `rotate(${rot3}deg)`, transformOrigin: 'center' }}>
            <polygon points="250,160 328,205 328,295 250,340 172,295 172,205" stroke="var(--accent-green)" strokeWidth="1" fill="rgba(13, 163, 95, 0.05)" opacity="0.6"/>
            <polygon points="250,175 315,212 315,287 250,325 185,287 185,212" stroke="var(--text-main)" strokeWidth="1" fill="transparent" opacity="0.3"/>
          </g>

          {/* Core Lens/Eye */}
          <circle cx="250" cy="250" r="35" fill="var(--accent-green)" opacity="0.3" filter="blur(15px)" />
          <circle cx="250" cy="250" r="12" fill="var(--accent-green)" opacity="0.6" />
          <circle cx="250" cy="250" r="4" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    
      {/* Vignette mask so the drone organically fades into the background color at the edges */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, transparent 30%, var(--bg-color) 75%)',
          pointerEvents: 'none'
        }}
      ></div>
    </div>
  )
}
