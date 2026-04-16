import { useNavigate } from 'react-router-dom'

const ZYNX_PROJECT = {
  id: 'proj-zynx',
  title: 'ZYNX AI',
  tagline: 'Marketing Synthesis Engine',
  description: 'Turn raw assets into viral 15-second promos, autonomously. Our AI handles the entire creative lifecycle — from raw footage to trending social content.',
  link: '/zynx',
}

export default function Projects() {
  const navigate = useNavigate()

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="projects-header">
          <span className="section-label">Our Work</span>
          <h2 className="projects-heading">
            What We're<br />Building
          </h2>
        </div>

        {/* Single Project — Full Bleed Card */}
        <div className="zynx-showcase-card" onClick={() => navigate(ZYNX_PROJECT.link)}>
          <div className="zynx-showcase-left">
            <div className="zynx-showcase-label">Active Product</div>
            <h3 className="zynx-showcase-title">{ZYNX_PROJECT.title}</h3>
            <p className="zynx-showcase-tagline">{ZYNX_PROJECT.tagline}</p>
            <p className="zynx-showcase-desc">{ZYNX_PROJECT.description}</p>
            <button className="zynx-showcase-btn" onClick={() => navigate('/zynx')}>
              Explore Product
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </div>

          <div className="zynx-showcase-right">
            {/* Centered Phone Mockup */}
            <div className="showcase-phone-wrap">
              <div className="showcase-phone-frame">
                <div className="showcase-phone-notch"></div>
                <div className="showcase-phone-screen chat-ui-screen">
                  {/* Chat Header */}
                  <div className="chat-ui-header">
                    <span className="chat-ui-logo">ZYNX ASSISTANT</span>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="chat-ui-body">
                    <div className="chat-msg bot-msg">
                      <span>How can I help you synthesize today's campaign?</span>
                    </div>
                    <div className="chat-msg user-msg">
                      <span>Generate a 15s promo from the Summer Drop assets. Make it punchy.</span>
                    </div>
                    <div className="chat-msg bot-msg">
                      <div className="chat-typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="chat-ui-footer">
                    <div className="chat-ui-input">Message ZYNX...</div>
                  </div>
                </div>
              </div>
              <div className="showcase-phone-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
