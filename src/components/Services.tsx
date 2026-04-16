const SERVICES = [
  {
    icon: '🤖',
    title: 'Generative AI Development',
    desc: 'Building custom LLMs, diffusion models, and multimodal AI systems that solve real enterprise problems.',
  },
  {
    icon: '🏭',
    title: 'Industrial Automation',
    desc: 'End-to-end workflow automation for manufacturing, logistics, and complex operational pipelines.',
  },
  {
    icon: '🎬',
    title: 'AI Creative Engines',
    desc: 'Automated video production, marketing synthesis, and brand content at superhuman speed and scale.',
  },
  {
    icon: '🔓',
    title: 'Open Source Tools',
    desc: 'High-quality developer tools, frameworks, and libraries contributed back to the AI community.',
  },
  {
    icon: '🛡️',
    title: 'AI Safety Research',
    desc: 'Responsible AI development with built-in evaluation frameworks, alignment checks, and safety guardrails.',
  },
  {
    icon: '📡',
    title: 'Data Pipeline Engineering',
    desc: 'Real-time data infrastructure that turns raw enterprise streams into clean, analytics-ready intelligence.',
  },
]

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <span className="section-label">What We Do</span>
        <h2 className="services-heading">
          Capabilities Built for<br />
          <span className="text-lime">Industrial AI</span>
        </h2>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-item" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
