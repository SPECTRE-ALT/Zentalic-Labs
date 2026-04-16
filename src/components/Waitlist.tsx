import { useState } from 'react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    
    try {
      const res = await fetch('https://formsubmit.co/ajax/zentaliclabs@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          _subject: "New Waitlist Entry for ZYNX AI",
          _captcha: "false"
        })
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        alert('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      alert('Network error. Please try again later.')
    }
  }

  return (
    <section className="section waitlist-section" id="waitlist">
      <div className="container waitlist-container">
        <h2 className="section-title">Get Early Access to ZYNX</h2>
        <p className="waitlist-desc">
          Join the exclusive waitlist to be among the first to experience our next-generation marketing synthesis engine.
        </p>
        
        {status === 'success' ? (
          <div className="waitlist-success">
            You have been added to the ZYNX AI waitlist
          </div>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="waitlist-input"
              required 
            />
            <button type="submit" disabled={status === 'loading'} className="btn btn-primary waitlist-btn">
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
