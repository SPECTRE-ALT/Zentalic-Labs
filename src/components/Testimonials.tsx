const TESTIMONIALS = [
  {
    quote: '"Zentalic Labs redefined what our marketing team could produce. ZYNX AI generates in minutes what used to take our agency days. The quality is staggering."',
    name: 'Priya Mehta',
    title: 'CMO · D2C Startup',
    initials: 'PM',
    color: 'linear-gradient(135deg, #C8FF00, #90B800)',
  },
  {
    quote: '"Their industrial automation engine cut our manual workflow time by 73%. The Zentalic team genuinely understands operational complexity at scale."',
    name: 'Rajesh Kumar',
    title: 'VP Operations · Logistics Co.',
    initials: 'RK',
    color: 'linear-gradient(135deg, #0A7CFF, #0050CC)',
  },
  {
    quote: '"The open-source tools from Zentalic are exactly what the developer community needed. Clean APIs, great docs, and they actually respond to issues."',
    name: 'Sarah Chen',
    title: 'Senior ML Engineer',
    initials: 'SC',
    color: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>
          What People Say
        </span>
        <h2 className="testimonials-heading">Built on Results</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <div className="testimonial-card" key={t.name}>
              <p className="test-quote">{t.quote}</p>
              <div className="test-author">
                <div className="test-avatar" style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-title">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
