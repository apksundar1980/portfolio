import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-card">
        <div className="about-card-scroll">
          <p>
            I&apos;m a full-stack developer with 13+ years of experience building scalable web and
            mobile applications.
          </p>
          <p>
            I specialize in <span className="about-highlight">Laravel</span> (API development),{' '}
            <span className="about-highlight">React</span> (frontend), and{' '}
            <span className="about-highlight">Flutter</span> (cross-platform mobile apps). I help
            businesses turn ideas into reliable, production-ready systems — from architecture to
            deployment.
          </p>
          <p className="about-list-title">What I can help you with:</p>
          <ul className="about-list">
            <li>Build secure and scalable Laravel APIs</li>
            <li>Develop modern React dashboards and web apps</li>
            <li>Create high-performance Flutter mobile apps</li>
            <li>Integrate third-party services (payments, APIs, etc.)</li>
            <li>Maintain and improve existing applications</li>
          </ul>
          <p>
            I focus on clean architecture, performance, and long-term maintainability — so your
            product doesn&apos;t just work today, but scales tomorrow.
          </p>
          <p>
            If you&apos;re looking for someone who can take ownership and deliver without constant
            supervision, let&apos;s discuss your project.
          </p>
        </div>
      </div>
    </section>
  )
}
