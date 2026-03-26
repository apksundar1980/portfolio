/**
 * Portfolio projects — same shape as blog posts for a matching UI.
 * `body`: plain text, blank lines → paragraphs in the detail modal.
 * Optional `implementation`: { label, value }[] — rendered as a table on the detail modal.
 */
export const projects = [
  {
    id: 'xero-api-smart-invoice',
    title: 'Xero API Integration & Smart Invoice Access Platform',
    image: new URL('../assets/projects/xero-integration.png', import.meta.url).href,
    projectUrl: '#',
    updatedAt: '2025-03-15T12:00:00',
    tech: 'Xero API, PDF generation, Laravel Scheduler (Cron), secure webhooks',
    implementation: [
      { label: 'Backend framework', value: 'Laravel 12' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Access control', value: 'Role-based access (RBAC)' },
      { label: 'Front end', value: 'Laravel Blade templates' },
    ],
    body: `Engineered a Laravel-based web application integrated with Xero's cloud accounting platform via secure APIs, enabling seamless access to client invoices and financial vouchers without requiring direct interaction with the Xero interface.

The system intelligently retrieves real-time financial data and transforms it into well-structured, print-ready PDF invoices, delivering a smooth and efficient user experience within a centralized platform.

Designed with automated Cron-driven synchronization to continuously fetch and update invoice data, the application ensures users are instantly notified upon the arrival of new billing records.

Built with a strong role-based access control architecture, the platform guarantees secure, controlled, and scalable access to sensitive financial information across user roles.`,
  },
  {
    id: 'docusign-loan-integration',
    title: 'DocuSign Integration to Loan System',
    image: new URL('../assets/projects/docusign-integration.png', import.meta.url).href,
    projectUrl: '#',
    updatedAt: '2024-11-03T11:00:00',
    tech: 'DocuSign eSignature API (open-source SDK), PHP, embedded signing panel, Singpass eSign via DocuSign',
    implementation: [
      { label: 'Backend / language', value: 'PHP' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Access control', value: 'Role-based access (RBAC)' },
      { label: 'Front end', value: 'Application UI with embedded DocuSign signing' },
    ],
    body: `Developed and implemented a secure DocuSign integration within a loan application system using PHP. Leveraged DocuSign APIs (open-source SDK) to enable embedded signing, allowing borrowers to digitally sign documents directly within the application interface.

The solution captures and records electronic signatures through the DocuSign panel, with all signed documents securely stored and retrieved from DocuSign servers. The system ensures document integrity—once a signature is completed, it cannot be altered. Any modification to the document requires the borrower to re-sign all relevant pages, maintaining compliance and audit standards.

Additionally, integrated Singpass eSign via DocuSign to support secure digital identity verification and legally compliant electronic signatures.`,
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
