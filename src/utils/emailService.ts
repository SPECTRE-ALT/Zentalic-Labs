import emailjs from '@emailjs/browser'

// EmailJS Configuration
// To set up: Go to https://www.emailjs.com/
// 1. Create account
// 2. Add email service (Gmail) → get SERVICE_ID
// 3. Create email template → get TEMPLATE_ID  
// 4. Get your PUBLIC_KEY from Account → API Keys
const SERVICE_ID = 'service_zentalic'
const CONTACT_TEMPLATE_ID = 'template_contact'
const WAITLIST_TEMPLATE_ID = 'template_waitlist'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key

// Initialize EmailJS
emailjs.init(PUBLIC_KEY)

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface WaitlistFormData {
  email: string
  name?: string
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: 'zentaliclabs@gmail.com',
    }
    
    await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, templateParams)
    return true
  } catch (error) {
    console.error('Failed to send contact email:', error)
    // Fallback: open email client
    const subject = encodeURIComponent(`Contact from ${data.name}`)
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)
    window.open(`mailto:zentaliclabs@gmail.com?subject=${subject}&body=${body}`)
    return true
  }
}

export async function sendWaitlistEmail(data: WaitlistFormData): Promise<boolean> {
  try {
    const templateParams = {
      user_email: data.email,
      user_name: data.name || 'Not provided',
      to_email: 'zentaliclabs@gmail.com',
    }

    await emailjs.send(SERVICE_ID, WAITLIST_TEMPLATE_ID, templateParams)
    return true
  } catch (error) {
    console.error('Failed to send waitlist email:', error)
    // Fallback: open email client
    const subject = encodeURIComponent('ZYNX AI Waitlist Signup')
    const body = encodeURIComponent(`New waitlist signup:\nEmail: ${data.email}\nName: ${data.name || 'Not provided'}`)
    window.open(`mailto:zentaliclabs@gmail.com?subject=${subject}&body=${body}`)
    return true
  }
}
