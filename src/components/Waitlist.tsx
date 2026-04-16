import { useState } from 'react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const btn = (e.target as HTMLFormElement).querySelector('button') as HTMLButtonElement
    btn.disabled = true
    btn.textContent = 'Joining...'
    try {
      const res = await fetch('https://formsubmit.co/ajax/zentaliclabs@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ Waitlist_Email: email, _subject: "New Waitlist Entry" })
      })
      if (res.ok) {
        setSubmitted(true)
        setEmail('')
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Network error. Please try again later.')
    } finally {
      if(!submitted) {
        btn.disabled = false
        btn.textContent = 'Join Waitlist'
      }
    }
  }

  return (
    <section className="section waitlist-section" id="waitlist">
      <div className="container waitlist-container">
        <h2 className="section-title">Get Early Access to ZYNX</h2>
        <p className="waitlist-desc">
          Join the exclusive waitlist to be among the first to experience our next-generation marketing synthesis engine.
        </p>
        
        {submitted ? (
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
            <button type="submit" className="btn btn-primary waitlist-btn">
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
