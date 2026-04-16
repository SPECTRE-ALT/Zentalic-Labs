import Layout from '../components/Layout'
import { Nav } from '../components/Nav'
import Waitlist from '../components/Waitlist'

export default function ZynxDetail() {
  return (
    <Layout>
      <Nav />
      <div className="zynx-detail-page">
        {/* HERO SECTION */}
        <section className="section zynx-hero-section">
          <div className="container zynx-hero-container">
            <h1 className="zynx-hero-title">ZYNX AI</h1>
            <p className="zynx-hero-tagline">A professional-grade marketing synthesis engine.</p>
            <div className="zynx-hero-subtitle">
              <span className="status-dot"></span>
              Currently in development
            </div>
            <div className="zynx-hero-actions">
              <a href="#waitlist" className="btn btn-primary">Join the Waitlist</a>
            </div>
          </div>
        </section>

        {/* MOCKUP SECTION */}
        <section className="section zynx-mockup-section">
          <div className="container zynx-mockup-container">
            <div className="phone-mockup-wrapper">
              <div className="mockup-label">Concept Preview</div>
              <div className="phone-device">
                <div className="phone-screen">
                  <div className="chat-interface">
                    <div className="chat-message bot-message">
                      <div className="avatar bot-avatar">Z</div>
                      <div className="bubble">What can I help you with?</div>
                    </div>
                    <div className="chat-message user-message">
                      <div className="bubble">Make me a punchy 15-second advertisement</div>
                    </div>
                    <div className="chat-message bot-message loading-message">
                      <div className="avatar bot-avatar">Z</div>
                      <div className="bubble loading-bubble">
                        Synthesizing assets... <span className="green-sparkle">✨</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section zynx-how-it-works">
          <div className="container">
            <h2 className="section-title text-center">How It Works</h2>
            <div className="zynx-features">
              <div className="feature-card">
                <span className="feature-num">01</span>
                <h4 className="feature-title">Ingest & Analyze</h4>
                <p className="feature-desc">
                  ZYNX processes raw footage and matches it with real-time trends to identify high-impact moments.
                </p>
              </div>
              <div className="feature-card">
                <span className="feature-num">02</span>
                <h4 className="feature-title">Generate & Enhance</h4>
                <p className="feature-desc">
                  AI generates cinematic B-roll, enhances visuals, and prepares production-ready assets.
                </p>
              </div>
              <div className="feature-card">
                <span className="feature-num">03</span>
                <h4 className="feature-title">Cut & Export</h4>
                <p className="feature-desc">
                  Automatically creates a short, beat-synced promo with smooth transitions, ready for publishing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section className="section zynx-value-prop">
          <div className="container">
            <h2 className="section-title text-center">Why ZYNX</h2>
            <div className="value-grid">
              <div className="value-item">
                <h4 className="value-title">Saves Time on Editing</h4>
                <p className="value-desc">Drastically reduce the hours spent cutting, matching beats, and perfecting transitions.</p>
              </div>
              <div className="value-item">
                <h4 className="value-title">No Professional Editors Needed</h4>
                <p className="value-desc">Produce high-end visuals and marketing concepts with zero timeline experience.</p>
              </div>
              <div className="value-item">
                <h4 className="value-title">Viral-Ready Content</h4>
                <p className="value-desc">Engineered to match modern social fast-paced formats right out of the box.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <Waitlist />
      </div>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Zentalic Labs. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  )
}
