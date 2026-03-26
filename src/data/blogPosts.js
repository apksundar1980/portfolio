/**
 * Blog posts: replace image URLs with your own assets when ready.
 * `body` is plain text; blank lines become new paragraphs in the modal.
 * `externalUrl` powers the “Blog link” on each card (e.g. Medium).
 *
 * The second half duplicates the first three posts (new ids, “(copy)” titles)
 * so you can exercise the blog frame scroll. Remove `...scrollDemoCopies` when done.
 */
const baseBlogPosts = [
  {
    id: 'crafting-apis-laravel',
    title: 'Crafting resilient APIs with Laravel',
    image: 'https://picsum.photos/seed/laravel-blog/640/360',
    externalUrl: 'https://medium.com',
    publishedAt: '2025-11-08T14:30:00',
    body: `APIs are the contract between your product and the world. With Laravel, we get expressive routing, validation, and queues out of the box—but the real work is in designing boundaries that stay stable as requirements evolve.

I lean on explicit DTOs, thin controllers, and service classes that encode business rules once. Versioning and deprecation policies matter as much as the first release: document breaking changes and give clients a clear migration path.

Testing is non-negotiable: feature tests for HTTP contracts, unit tests for edge cases, and monitoring for latency and error budgets in production. When those pieces align, the API stops being a bottleneck and becomes something teams trust to build on.`,
  },
  {
    id: 'react-server-state',
    title: 'React patterns for dependable server state',
    image: 'https://picsum.photos/seed/react-blog/640/360',
    externalUrl: 'https://medium.com',
    publishedAt: '2025-09-21T09:15:00',
    body: `Server state is the hardest kind of UI state: caching, staleness, retries, and optimistic updates all fight for attention. Modern React encourages colocating data fetching with components, but without conventions the codebase becomes a maze of useEffect calls.

I reach for a single source of truth per remote resource: normalized cache, stable query keys, and mutations that invalidate or update predictably. Loading and error UIs should be boring and consistent—users should never wonder whether data is fresh.

Performance follows from discipline: avoid waterfalls, prefetch thoughtfully, and measure render cost. The goal is interfaces that feel instant even when the network is not.`,
  },
  {
    id: 'fintech-integrations',
    title: 'Lessons from FinTech integrations (DocuSign, banking APIs)',
    image: 'https://picsum.photos/seed/fintech-blog/640/360',
    externalUrl: 'https://medium.com',
    publishedAt: '2025-06-02T16:45:00',
    body: `Financial integrations demand more than “it works on my machine.” Idempotency keys, robust webhook verification, and ledger-grade audit trails separate prototypes from systems auditors accept.

We treated every outbound call as fallible: exponential backoff, dead-letter queues, and human-readable reconciliation dashboards. Partner APIs change; abstracting behind your own domain layer buys time when schemas shift.

Security and compliance are features, not afterthoughts: least-privilege credentials, secret rotation, and clear data retention. When teams respect those constraints early, delivery speed actually increases because rework disappears.`,
  },
]

const scrollDemoCopies = baseBlogPosts.map((post, index) => ({
  ...post,
  id: `${post.id}-scroll-demo-${index}`,
  title: `${post.title} (copy)`,
  publishedAt: new Date(
    new Date(post.publishedAt).getTime() - (index + 1) * 86400000
  ).toISOString(),
}))

export const blogPosts = [...baseBlogPosts, ...scrollDemoCopies]
