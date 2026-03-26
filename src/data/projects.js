/**
 * Portfolio projects — same shape as blog posts for a matching UI.
 * `body`: plain text, blank lines → paragraphs in the detail modal.
 */
export const projects = [
  {
    id: 'modern-web-app',
    title: 'Modern web application',
    image: 'https://picsum.photos/seed/project-one/640/360',
    projectUrl: 'https://github.com',
    updatedAt: '2025-02-14T16:20:00',
    tech: 'React, Node.js, MongoDB',
    body: `A full-stack product focused on fast iteration and clear API boundaries. The client uses modern React patterns; the API emphasizes validation and predictable error responses.`,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce platform',
    image: 'https://picsum.photos/seed/project-two/640/360',
    projectUrl: 'https://github.com',
    updatedAt: '2024-11-03T11:00:00',
    tech: 'PHP, WordPress, MySQL',
    body: `Secure checkout flows, admin tooling for catalog and orders, and integrations with payment providers. Emphasis on reliability during traffic spikes and straightforward operations.`,
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio & blog site',
    image: 'https://picsum.photos/seed/project-three/640/360',
    projectUrl: 'https://github.com',
    updatedAt: '2025-03-20T09:45:00',
    tech: 'React, Vite, GitHub Pages',
    body: `This portfolio: tabbed navigation, project and blog listings with in-page frames, and a consistent editorial layout. Built as static assets suitable for GitHub Pages.`,
  },
]
