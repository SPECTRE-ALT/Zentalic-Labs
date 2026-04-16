export default function Team() {
  const teamMembers = [
    { name: 'Aadarsh', role: 'CTO & CEO' },
    { name: 'Karthik T.S', role: 'COO & CFO' },
    { name: 'Thejus', role: 'CMO' }
  ];

  return (
    <section className="section team-section" id="team">
      <div className="container">
        <h2 className="section-title">Leadership</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="team-avatar">{member.name.charAt(0)}</div>
              <h4 className="team-name">{member.name}</h4>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
