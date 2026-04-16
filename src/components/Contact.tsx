import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.message || !formData.name) return
    setStatus('loading')

    try {
      const res = await fetch('https://formsubmit.co/ajax/zentaliclabs@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Contact Submission from Zentalic Labs Website",
          _captcha: "false"
        })
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        alert('Failed to send message. Please try again.')
      }
    } catch {
      setStatus('error')
      alert('Network error. Please try again.')
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-container">
        <div className="contact-info">
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-desc">
            Interested in what we are building? Let's talk.
          </p>
          <div className="contact-details">
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              <strong>Email:</strong> <a href="mailto:zentaliclabs@gmail.com" style={{ color: 'var(--accent-green)', transition: 'color 0.2s ease' }}>zentaliclabs@gmail.com</a>
            </p>

            <div className="leadership-contacts" style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                Leadership Contacts
              </h3>

              <div className="leadership-item">
                <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-main)', margin: '0 0 0.2rem 0' }}>
                  CEO & CTO <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>(A. Adarsh)</span>
                </p>
                <a href="mailto:intheknightriders@gmail.com" style={{ display: 'inline-block', fontSize: '0.9rem', color: 'var(--text-muted)', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-green)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  intheknightriders@gmail.com
                </a>
              </div>

              <div className="leadership-item">
                <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-main)', margin: '0 0 0.2rem 0' }}>
                  COO & CFO <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>(Karthik T.S)</span>
                </p>
                <a href="mailto:karthik3b@gmail.com" style={{ display: 'inline-block', fontSize: '0.9rem', color: 'var(--text-muted)', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-green)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  karthik3b@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {status === 'success' ? (
            <div className="contact-success">Message has been sent successfully</div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help?"
                  required
                ></textarea>
              </div>
              <button type="submit" disabled={status === 'loading'} className="btn btn-primary">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
