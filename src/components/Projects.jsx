import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { projects as projectsList } from '../data/projects'
import './Projects.css'

const ACCORDION_CLICK_MS = 280

function bodyParagraphs(body) {
  return body?.trim().split(/\n\s*\n/).filter(Boolean) ?? []
}

function formatUpdated(iso) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const [expandedProjectId, setExpandedProjectId] = useState(null)
  const closeBtnRef = useRef(null)
  const accordionClickTimerRef = useRef(null)
  const titleId = useId()

  const closeModal = useCallback(() => setActiveProject(null), [])

  useEffect(() => {
    return () => {
      if (accordionClickTimerRef.current != null) {
        window.clearTimeout(accordionClickTimerRef.current)
        accordionClickTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!activeProject) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [activeProject, closeModal])

  const paragraphs = bodyParagraphs(activeProject?.body)

  const scheduleAccordionToggle = useCallback((project) => {
    if (accordionClickTimerRef.current != null) {
      window.clearTimeout(accordionClickTimerRef.current)
    }
    accordionClickTimerRef.current = window.setTimeout(() => {
      accordionClickTimerRef.current = null
      setExpandedProjectId((prev) =>
        prev === project.id ? null : project.id,
      )
    }, ACCORDION_CLICK_MS)
  }, [])

  const openProjectModal = useCallback((project) => {
    if (accordionClickTimerRef.current != null) {
      window.clearTimeout(accordionClickTimerRef.current)
      accordionClickTimerRef.current = null
    }
    setExpandedProjectId(null)
    setActiveProject(project)
  }, [])

  const isInteractiveCardTarget = (target) =>
    target.closest('a, button')

  const modalLinkExternal =
    activeProject != null &&
    /^https?:\/\//i.test(activeProject.projectUrl)

  return (
    <section
      id="projects"
      className="projects tab-section projects--framed"
      aria-labelledby="tab-projects-heading"
    >
      <h2 id="tab-projects-heading" className="section-title projects__heading">
        Projects
      </h2>
      <div
        className="projects-frame"
        role="region"
        aria-label="Projects. Scroll to see all projects."
        tabIndex={0}
      >
        <div className="projects-grid">
          {projectsList.map((project) => {
            const linkExternal = /^https?:\/\//i.test(project.projectUrl)
            const expanded = expandedProjectId === project.id
            const detailParas = bodyParagraphs(project.body)

            return (
              <article
                key={project.id}
                className={`project-card${expanded ? ' project-card--expanded' : ''}`}
              >
                <div
                  className="project-card__row"
                  role="button"
                  tabIndex={0}
                  aria-expanded={expanded}
                  aria-controls={`project-details-${project.id}`}
                  aria-label={`${project.title}. Click to ${expanded ? 'collapse' : 'expand'} details. Double-click to open full view.`}
                  onClick={(e) => {
                    if (isInteractiveCardTarget(e.target)) return
                    scheduleAccordionToggle(project)
                  }}
                  onDoubleClick={(e) => {
                    if (isInteractiveCardTarget(e.target)) return
                    e.preventDefault()
                    openProjectModal(project)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedProjectId((prev) =>
                        prev === project.id ? null : project.id,
                      )
                    }
                  }}
                >
                  <div className="project-card__image-wrap">
                    <img
                      src={project.image}
                      alt=""
                      className="project-card__image"
                      loading="lazy"
                      width={640}
                      height={360}
                    />
                  </div>
                  <div className="project-card__content">
                    <h3 className="project-card__title">{project.title}</h3>
                    <time className="project-card__date" dateTime={project.updatedAt}>
                      {formatUpdated(project.updatedAt)}
                    </time>
                    <p className="project-card__hint">
                      Click for details · Double-click for full view
                    </p>
                    <a
                      href={project.projectUrl}
                      target={linkExternal ? '_blank' : undefined}
                      rel={linkExternal ? 'noopener noreferrer' : undefined}
                      className="project-card__ext-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Project link →
                    </a>
                    <span
                      className="project-card__chevron"
                      aria-hidden
                    />
                  </div>
                </div>

                <div
                  className="project-card__accordion"
                  id={`project-details-${project.id}`}
                  hidden={!expanded}
                >
                  <div className="project-card__details-inner">
                    <div className="project-card__body">
                      {detailParas.map((para, i) => (
                        <p key={`${project.id}-acc-${i}`}>{para.trim()}</p>
                      ))}
                    </div>
                    {Array.isArray(project.implementation) &&
                      project.implementation.length > 0 && (
                        <div className="project-card__implementation">
                          <h4 className="project-card__implementation-title">
                            Implemented with
                          </h4>
                          <table className="project-card__table">
                            <tbody>
                              {project.implementation.map((row) => (
                                <tr key={row.label}>
                                  <th scope="row">{row.label}</th>
                                  <td>{row.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    <p className="project-card__tech">{project.tech}</p>
                    <button
                      type="button"
                      className="project-card__fullview"
                      onClick={() => openProjectModal(project)}
                    >
                      Open full view →
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {activeProject && (
        <div
          className="project-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="project-modal__header">
              <h3 id={titleId} className="project-modal__title">
                {activeProject.title}
              </h3>
              <button
                ref={closeBtnRef}
                type="button"
                className="project-modal__close"
                onClick={closeModal}
                aria-label="Close project"
              >
                ×
              </button>
            </div>
            <time
              className="project-modal__date"
              dateTime={activeProject.updatedAt}
            >
              {formatUpdated(activeProject.updatedAt)}
            </time>
            <div className="project-modal__image-wrap">
              <img
                src={activeProject.image}
                alt=""
                className="project-modal__image"
                width={800}
                height={450}
              />
            </div>
            <div className="project-modal__body">
              {paragraphs.map((para, i) => (
                <p key={`${activeProject.id}-${i}`}>{para.trim()}</p>
              ))}
            </div>
            {Array.isArray(activeProject.implementation) &&
              activeProject.implementation.length > 0 && (
                <div className="project-modal__implementation">
                  <h4 className="project-modal__implementation-title">
                    Implemented with
                  </h4>
                  <table className="project-modal__table">
                    <tbody>
                      {activeProject.implementation.map((row) => (
                        <tr key={row.label}>
                          <th scope="row">{row.label}</th>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            <p className="project-modal__tech">{activeProject.tech}</p>
            <a
              href={activeProject.projectUrl}
              target={modalLinkExternal ? '_blank' : undefined}
              rel={modalLinkExternal ? 'noopener noreferrer' : undefined}
              className="project-modal__out-link"
            >
              Open project →
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
