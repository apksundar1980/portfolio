import './Contact.css'
import { GITHUB_URL, LINKEDIN_URL } from '../constants/social'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-card">
        <p className="contact-lede">
          I am open to strategic opportunities and value-driven collaborations. I would be glad to
          connect.
        </p>
        <div className="contact-links">
          <a href="mailto:your@email.com" className="contact-btn">Email Me</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="contact-btn">GitHub</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact-btn">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}
