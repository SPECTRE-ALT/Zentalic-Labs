import { Nav } from '../components/Nav'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import About from '../components/About'
import ZynxSection from '../components/ZynxSection'
import Capabilities from '../components/Capabilities'
import Team from '../components/Team'
import Waitlist from '../components/Waitlist'
import Contact from '../components/Contact'
import ScrollAnimation from '../components/ScrollAnimation'

export default function Home() {
  return (
    <Layout>
      <ScrollAnimation />
      <main>
        <Nav />
        <Hero />
        <About />
        <ZynxSection />
        <Capabilities />
        <Team />
        <Waitlist />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Zentalic Labs. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  )
}
