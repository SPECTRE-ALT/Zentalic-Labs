import { Link } from 'react-router-dom'

export default function ZynxSection() {
  return (
    <section className="section zynx-section" id="zynx">
      <div className="container zynx-container">
        <div className="zynx-header">
          <h2 className="section-title zynx-title">ZYNX AI</h2>
          <p className="zynx-description">
            A professional-grade marketing synthesis engine. Drop in your raw assets and ZYNX autonomously produces a viral-ready, beat-synced promo — no editor required.
          </p>
          <div className="zynx-actions mt-4">
            <Link to="/zynx" className="btn btn-primary">
              Explore ZYNX
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
