/**
 * Blog posts.
 * - Default: `body` is plain text (paragraphs split on blank lines).
 * - `bodyFormat: 'markdown'`: `body` is Markdown (e.g. imported from docs/*.md with `?raw`).
 */
import pngToFlutterUiSource from '../../docs/png-to-flutter-ui.md?raw'

export const blogPosts = [
  {
    id: 'png-to-flutter-ui-guide',
    title: 'My first blog: from PNG mockups to Flutter UI',
    image: new URL(
      '../assets/blog/figma-flutter-package-pipeline.png',
      import.meta.url,
    ).href,
    publishedAt: '2026-03-27T12:00:00',
    bodyFormat: 'markdown',
    /** Full guide; leading # title removed in UI to avoid duplicating the card/modal title */
    body: pngToFlutterUiSource.replace(/^#\s[^\n]+(\n+|$)/, '').trimStart(),
  },
]
