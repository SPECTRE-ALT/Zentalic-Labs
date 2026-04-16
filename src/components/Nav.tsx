import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'About', href: '#about', isRoute: false },
  { label: 'ZYNX AI', href: '/zynx', isRoute: true },
  { label: 'Capabilities', href: '#capabilities', isRoute: false },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, l: typeof NAV_LINKS[0]) => {
    e.preventDefault();
    if (l.isRoute) {
      if (l.href === '/' && location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(l.href);
      }
    } else {
      if (location.pathname !== '/') {
        navigate('/' + l.href);
      } else {
        const el = document.querySelector(l.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  return (
    <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo-mark" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="/zentalic_labs.png" alt="Zentalic Labs" className="brand-logo" style={{ filter: isLight ? 'brightness(0)' : 'none' }} />
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map(l => {
            const isActive = location.pathname === l.href || (location.pathname === '/' && l.href === '/');
            return (
              <li key={l.label}>
                <a 
                  href={l.href} 
                  onClick={(e) => handleNavClick(e, l)}
                  className={isActive ? 'active-link' : ''}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleTheme} 
            style={{
              background: 'transparent', 
              border: '1px solid var(--border-color)', 
              borderRadius: '50%', 
              width: '36px', 
              height: '36px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              color: 'var(--text-main)',
            }}
            aria-label="Toggle Theme"
          >
            {isLight ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
          <a href="#waitlist" className="nav-btn-primary btn btn-primary">
            Get Early Access
          </a>
        </div>
      </div>
    </nav>
  )
}
