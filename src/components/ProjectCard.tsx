// No imports needed

interface ProjectCardProps {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  gradient: string
  emoji: string
  visible: boolean
  delay: number
  onClick: (e: React.MouseEvent) => void
}

export default function ProjectCard({
  id,
  title,
  category,
  description,
  tags,
  gradient,
  emoji,
  visible,
  delay,
  onClick,
}: ProjectCardProps) {
  return (
    <div
      id={id}
      className={`project-card${visible ? ' visible' : ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      onClick={onClick}
    >
      <div className="project-card-image">
        <div
          className="project-img-placeholder"
          style={{ background: gradient }}
        >
          <span style={{ fontSize: 56 }}>{emoji}</span>
        </div>
        <div className="project-card-overlay">
          <div className="overlay-cat">{category}</div>
          <div className="overlay-title">{title}</div>
          <button className="overlay-btn">Learn More →</button>
        </div>
      </div>
      <div className="project-card-body">
        <div className="project-card-cat">{category}</div>
        <div className="project-card-title">{title}</div>
        <div className="project-card-desc">{description}</div>
        <div className="project-card-tags">
          {tags.map(t => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
