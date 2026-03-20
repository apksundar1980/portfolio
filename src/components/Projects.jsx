import './Projects.css'

const projects = [
  {
    title: 'Project One',
    desc: 'A modern web application built with React and Node.js.',
    tech: 'React, Node.js, MongoDB',
    link: '#',
  },
  {
    title: 'Project Two',
    desc: 'E-commerce platform with secure checkout and admin dashboard.',
    tech: 'PHP, WordPress, MySQL',
    link: '#',
  },
  {
    title: 'Project Three',
    desc: 'Portfolio and blog site with CMS integration.',
    tech: 'React, Vite, GitHub Pages',
    link: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <span className="project-tech">{project.tech}</span>
            <a href={project.link} className="project-link">View Project →</a>
          </div>
        ))}
      </div>
    </section>
  )
}
