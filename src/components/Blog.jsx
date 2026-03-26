import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { blogPosts } from '../data/blogPosts'
import './Blog.css'

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

export default function Blog() {
  const [activePost, setActivePost] = useState(null)
  const closeBtnRef = useRef(null)
  const titleId = useId()

  const closeModal = useCallback(() => setActivePost(null), [])

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

  const paragraphs =
    activePost?.body?.trim().split(/\n\s*\n/).filter(Boolean) ?? []

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
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card"
              onClick={() => setActivePost(post)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActivePost(post)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open article: ${post.title}`}
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
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card__ext-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Blog link →
                </a>
              </div>
            </article>
          ))}
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
            <div className="blog-modal__body">
              {paragraphs.map((para, i) => (
                <p key={`${activePost.id}-${i}`}>{para.trim()}</p>
              ))}
            </div>
            <a
              href={activePost.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-modal__out-link"
            >
              Open original post →
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
