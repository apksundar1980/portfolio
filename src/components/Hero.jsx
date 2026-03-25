import './Hero.css'
import profilePhoto from '../assets/sundar.jpg'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'

const NAV_TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'resume', label: 'Resume' },
]

function BlogPanel() {
  return (
    <section className="tab-section" aria-labelledby="tab-blog-heading">
      <h2 id="tab-blog-heading" className="section-title">Blog</h2>
      <div className="tab-card">
        <p>Posts on development and design will live here.</p>
        <a
          href="https://medium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="tab-inline-link"
        >
          Medium →
        </a>
      </div>
    </section>
  )
}

function ResumePanel({ onSelectContact }) {
  return (
    <section className="tab-section" aria-labelledby="tab-resume-heading">
      <h2 id="tab-resume-heading" className="section-title">Resume</h2>
      <div className="tab-card">
        <p>Add a PDF link or summary here when ready.</p>
        <button type="button" className="tab-inline-btn" onClick={onSelectContact}>
          Open Contact →
        </button>
      </div>
    </section>
  )
}

export default function Hero({ activeTab, onTabChange }) {
  return (
    <section id="home" className="hero-split" aria-label="Portfolio home">
      <div className="hero-left">
        <nav className="hero-nav" role="tablist" aria-label="Main sections">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`hero-nav-tab${activeTab === tab.id ? ' is-active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div
          className={`hero-body${activeTab === 'home' ? ' hero-body--home' : ' hero-body--tabs'}`}
        >
          {activeTab === 'home' && (
            <div className="hero-text">
              <h1 className="hero-name">I&apos;m Sundar</h1>
              <h2 className="hero-title">Senior Laravel &amp; React Developer</h2>
              <p className="hero-desc">
                Building powerful web applications that are fast, secure, and built to scale.
              </p>
              <p className="hero-desc hero-desc--secondary">
                13+ years in the industry, with strong FinTech experience integrating DocuSign, DBS,
                and UOB APIs—delivering systems that businesses trust.
              </p>
              <div className="hero-social">
                <a
                  className="hero-social-link"
                  href="https://github.com/apksundar1980"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  className="hero-social-link"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  className="hero-social-link"
                  href="https://www.linkedin.com/in/apksundar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  className="hero-social-link"
                  href="https://medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div
              className="hero-tab-panel"
              role="tabpanel"
              id="panel-projects"
              aria-labelledby="tab-projects"
            >
              <Projects />
            </div>
          )}
          {activeTab === 'skills' && (
            <div className="hero-tab-panel" role="tabpanel" id="panel-skills" aria-labelledby="tab-skills">
              <Skills />
            </div>
          )}
          {activeTab === 'blog' && (
            <div className="hero-tab-panel" role="tabpanel" id="panel-blog" aria-labelledby="tab-blog">
              <BlogPanel />
            </div>
          )}
          {activeTab === 'about' && (
            <div className="hero-tab-panel" role="tabpanel" id="panel-about" aria-labelledby="tab-about">
              <About />
            </div>
          )}
          {activeTab === 'contact' && (
            <div
              className="hero-tab-panel"
              role="tabpanel"
              id="panel-contact"
              aria-labelledby="tab-contact"
            >
              <Contact />
            </div>
          )}
          {activeTab === 'resume' && (
            <div className="hero-tab-panel" role="tabpanel" id="panel-resume" aria-labelledby="tab-resume">
              <ResumePanel onSelectContact={() => onTabChange('contact')} />
            </div>
          )}
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-profile-stack">
          <button
            type="button"
            className="hero-brand hero-brand-btn"
            onClick={() => onTabChange('home')}
            aria-label="Go to home"
          >
            <span className="hero-logo">Sundar</span>
          </button>
          <div className="hero-photo">
            <img
              className="hero-profile-img"
              src={profilePhoto}
              alt="Sundar"
              width={720}
              height={720}
            />
            <p className="hero-profile-role">Senior Web Developer (Laravel, React)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
