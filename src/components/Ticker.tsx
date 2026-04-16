// No imports needed

const ITEMS = [
  'Generative AI', 'Industrial Automation', 'Open Source',
  'Model Development', 'Workflow Engineering', 'AI Safety',
  'Scalable Systems', 'LLM Research', 'Data Pipelines',
  'Product Design', 'GTM Strategy', 'Full-Stack AI',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="ticker-section">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            {i < doubled.length - 1 && <span className="ticker-dot" />}
          </span>
        ))}
      </div>
    </div>
  )
}
