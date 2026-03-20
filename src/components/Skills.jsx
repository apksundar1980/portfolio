import './Skills.css'

const skills = [
  'React', 'JavaScript', 'Node.js', 'PHP', 'WordPress',
  'HTML/CSS', 'Git', 'REST APIs', 'MySQL', 'Responsive Design'
]

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill} className="skill-card">
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}
