import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hello, I am</p>
        <h1 className="hero-name">P. SUNDARAMAHALINGAM</h1>
        <h2 className="hero-title">Full Stack Developer</h2>
        <p className="hero-desc">
          I build modern, responsive web applications with clean code and great user experiences.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
      <div className="hero-decoration">
        <span className="hero-bg-text">HI</span>
      </div>
    </section>
  )
}
