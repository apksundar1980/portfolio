import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { blogPosts } from '../data/blogPosts'
import './Blog.css'

const ACCORDION_CLICK_MS = 280

let mermaidInitPromise = null

function initMermaidLib(m) {
  m.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    themeVariables: {
      primaryColor: '#fff6e8',
      primaryTextColor: '#1a1a1a',
      primaryBorderColor: '#d4a25c',
      lineColor: '#8b5a2b',
      secondaryColor: '#faf6ef',
      tertiaryColor: '#f0ebe4',
      edgeLabelBackground: '#fffdf8',
    },
    flowchart: {
      curve: 'basis',
      padding: 10,
      useMaxWidth: true,
    },
  })
}

function loadMermaid() {
  if (!mermaidInitPromise) {
    mermaidInitPromise = import('mermaid').then((mod) => {
      const m = mod.default
      initMermaidLib(m)
      return m
    })
  }
  return mermaidInitPromise
}

let mermaidIdSeq = 0

function MermaidBlock({ chart }) {
  const containerRef = useRef(null)
  const runGenerationRef = useRef(0)

  useLayoutEffect(() => {
    const el = containerRef.current
    const text = String(chart).replace(/\n$/, '').trim()
    if (!el || !text) return

    const myGen = ++runGenerationRef.current
    let cancelled = false

    el.innerHTML = ''
    const graphId = `blog-mmd-${mermaidIdSeq++}-g${myGen}`

    loadMermaid()
      .then((m) => m.render(graphId, text))
      .then(({ svg }) => {
        if (
          cancelled ||
          myGen !== runGenerationRef.current ||
          containerRef.current !== el
        ) {
          return
        }
        el.innerHTML = svg
      })
      .catch(() => {
        if (
          cancelled ||
          myGen !== runGenerationRef.current ||
          containerRef.current !== el
        ) {
          return
        }
        el.innerHTML =
          '<p class="blog-mermaid__error">Could not render this diagram.</p>'
      })

    return () => {
      cancelled = true
    }
  }, [chart])

  if (!String(chart).trim()) return null

  return (
    <div
      className="blog-mermaid"
      ref={containerRef}
      role="img"
      aria-label="Flowchart"
    />
  )
}

function MarkdownPre({ children }) {
  const only = Children.toArray(children)[0]
  if (
    isValidElement(only) &&
    only.type === 'code' &&
    typeof only.props.className === 'string' &&
    only.props.className.includes('language-mermaid')
  ) {
    const raw = only.props.children
    const chart = Array.isArray(raw)
      ? raw.map((c) => (typeof c === 'string' ? c : '')).join('')
      : String(raw ?? '')
    return <MermaidBlock chart={chart} />
  }
  return <pre>{children}</pre>
}

const markdownComponents = {
  pre: MarkdownPre,
}

function bodyParagraphs(body) {
  return body?.trim().split(/\n\s*\n/).filter(Boolean) ?? []
}

function isMarkdownPost(post) {
  return post.bodyFormat === 'markdown'
}

function formatPublished(iso) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function PostBody({ post, className }) {
  if (isMarkdownPost(post)) {
    return (
      <div className={`blog-markdown ${className ?? ''}`.trim()}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {post.body}
        </ReactMarkdown>
      </div>
    )
  }
  const paras = bodyParagraphs(post.body)
  return (
    <div className={className}>
      {paras.map((para, i) => (
        <p key={`${post.id}-p-${i}`}>{para.trim()}</p>
      ))}
    </div>
  )
}

export default function Blog() {
  const [activePost, setActivePost] = useState(null)
  const [expandedPostId, setExpandedPostId] = useState(null)
  const closeBtnRef = useRef(null)
  const accordionClickTimerRef = useRef(null)
  const titleId = useId()

  const closeModal = useCallback(() => setActivePost(null), [])

  useEffect(() => {
    return () => {
      if (accordionClickTimerRef.current != null) {
        window.clearTimeout(accordionClickTimerRef.current)
        accordionClickTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!activePost) return
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
  }, [activePost, closeModal])

  const scheduleAccordionToggle = useCallback((post) => {
    if (accordionClickTimerRef.current != null) {
      window.clearTimeout(accordionClickTimerRef.current)
    }
    accordionClickTimerRef.current = window.setTimeout(() => {
      accordionClickTimerRef.current = null
      setExpandedPostId((prev) => (prev === post.id ? null : post.id))
    }, ACCORDION_CLICK_MS)
  }, [])

  const openPostModal = useCallback((post) => {
    if (accordionClickTimerRef.current != null) {
      window.clearTimeout(accordionClickTimerRef.current)
      accordionClickTimerRef.current = null
    }
    setExpandedPostId(null)
    setActivePost(post)
  }, [])

  const isInteractiveCardTarget = (target) => target.closest('a, button')

  const modalLinkExternal =
    activePost?.externalUrl != null &&
    /^https?:\/\//i.test(activePost.externalUrl)

  return (
    <section
      id="blog"
      className="blog tab-section blog--framed"
      aria-labelledby="tab-blog-heading"
    >
      <h2 id="tab-blog-heading" className="section-title blog__heading">
        Blog
      </h2>
      <div
        className="blog-frame"
        role="region"
        aria-label="Blog posts. Scroll to see all posts."
        tabIndex={0}
      >
        <div className="blog-grid">
          {blogPosts.map((post) => {
            const linkExternal =
              post.externalUrl != null &&
              /^https?:\/\//i.test(post.externalUrl)
            const expanded = expandedPostId === post.id
            const detailParas = bodyParagraphs(post.body)
            const md = isMarkdownPost(post)

            return (
              <article
                key={post.id}
                className={`blog-card${expanded ? ' blog-card--expanded' : ''}`}
              >
                <div
                  className="blog-card__row"
                  role="button"
                  tabIndex={0}
                  aria-expanded={expanded}
                  aria-controls={`blog-details-${post.id}`}
                  aria-label={`${post.title}. Click to ${expanded ? 'collapse' : 'expand'} details. Double-click to open full view.`}
                  onClick={(e) => {
                    if (isInteractiveCardTarget(e.target)) return
                    scheduleAccordionToggle(post)
                  }}
                  onDoubleClick={(e) => {
                    if (isInteractiveCardTarget(e.target)) return
                    e.preventDefault()
                    openPostModal(post)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedPostId((prev) =>
                        prev === post.id ? null : post.id,
                      )
                    }
                  }}
                >
                  <div className="blog-card__image-wrap">
                    <img
                      src={post.image}
                      alt=""
                      className="blog-card__image"
                      loading="lazy"
                      width={640}
                      height={360}
                    />
                  </div>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">{post.title}</h3>
                    <time className="blog-card__date" dateTime={post.publishedAt}>
                      {formatPublished(post.publishedAt)}
                    </time>
                    <p className="blog-card__hint">
                      Click for details · Double-click for full view
                    </p>
                    {post.externalUrl != null && (
                      <a
                        href={post.externalUrl}
                        target={linkExternal ? '_blank' : undefined}
                        rel={linkExternal ? 'noopener noreferrer' : undefined}
                        className="blog-card__ext-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {post.linkLabel ?? 'Blog link →'}
                      </a>
                    )}
                    <span className="blog-card__chevron" aria-hidden />
                  </div>
                </div>

                <div
                  className="blog-card__accordion"
                  id={`blog-details-${post.id}`}
                  hidden={!expanded}
                >
                  <div className="blog-card__details-inner">
                    <div
                      className={
                        md ? 'blog-card__body blog-card__body--markdown' : 'blog-card__body'
                      }
                    >
                      {md ? (
                        <PostBody post={post} />
                      ) : (
                        detailParas.map((para, i) => (
                          <p key={`${post.id}-acc-${i}`}>{para.trim()}</p>
                        ))
                      )}
                    </div>
                    <button
                      type="button"
                      className="blog-card__fullview"
                      onClick={() => openPostModal(post)}
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

      {activePost && (
        <div
          className="blog-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="blog-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blog-modal__header">
              <h3 id={titleId} className="blog-modal__title">
                {activePost.title}
              </h3>
              <button
                ref={closeBtnRef}
                type="button"
                className="blog-modal__close"
                onClick={closeModal}
                aria-label="Close article"
              >
                ×
              </button>
            </div>
            <time className="blog-modal__date" dateTime={activePost.publishedAt}>
              {formatPublished(activePost.publishedAt)}
            </time>
            <div className="blog-modal__image-wrap">
              <img
                src={activePost.image}
                alt=""
                className="blog-modal__image"
                width={800}
                height={450}
              />
            </div>
            <div
              className={
                isMarkdownPost(activePost)
                  ? 'blog-modal__body blog-modal__body--markdown'
                  : 'blog-modal__body'
              }
            >
              {isMarkdownPost(activePost) ? (
                <PostBody post={activePost} />
              ) : (
                bodyParagraphs(activePost.body).map((para, i) => (
                  <p key={`${activePost.id}-${i}`}>{para.trim()}</p>
                ))
              )}
            </div>
            {activePost.externalUrl != null && (
              <a
                href={activePost.externalUrl}
                target={modalLinkExternal ? '_blank' : undefined}
                rel={modalLinkExternal ? 'noopener noreferrer' : undefined}
                className="blog-modal__out-link"
              >
                {activePost.modalLinkLabel ?? 'Open original post →'}
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
