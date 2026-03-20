import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-card">
        <p>
          I'm always open to new opportunities and collaborations. 
          Feel free to reach out!
        </p>
        <div className="contact-links">
          <a href="mailto:your@email.com" className="contact-btn">Email Me</a>
          <a href="https://github.com/sundar" target="_blank" rel="noopener noreferrer" className="contact-btn">GitHub</a>
          <a href="https://linkedin.com/in/sundar" target="_blank" rel="noopener noreferrer" className="contact-btn">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}
